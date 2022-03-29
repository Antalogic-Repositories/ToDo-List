import {
    addToDoListAC,
    AddTodolistActionType,
    removeToDoListAC,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType
} from './to-do-list-reducer';
import {TaskStatuses, TaskType, todolistAPI, TodoTaskPriorities, UpdateTaskModelType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//reducer принимает state & action возвращает newState
//action содержит необходимые превращения и нужные для него данные
//creator для вызова action
let initialState: TaskStateType = {
    count: [],
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todolistId: string }>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todoListId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id !== action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todoListId: string }>) {
            state[action.payload.todoListId] = state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{ taskId: string, todoListId: string, entityStatus: RequestStatusType }>) {
            state[action.payload.todoListId] = state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                ...t,
                entityStatus: action.payload.entityStatus
            } : t)
        },
    },
    // "builder callback API", recommended for TypeScript users
    extraReducers:
        (builder) => {
            builder.addCase(addToDoListAC, (state, action) => {
                state[action.payload.item.id] = []
            })
            builder.addCase(removeToDoListAC, (state, action) => {
                delete state[action.payload.id]
            })
            builder.addCase(setTodolistsAC, (state, action) => action.payload.todolists.forEach(tl => state[tl.id] = []))
        }

})
export const tasksReducer = slice.reducer
export const {setTasksAC, removeTaskAC, addTaskAC, updateTaskAC, changeTaskEntityStatusAC} = slice.actions


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC({tasks, todolistId})
            dispatch(action)
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) =>
    async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC({status: 'loading'}))
            dispatch(changeTaskEntityStatusAC({taskId: taskId, todoListId: todolistId, entityStatus: 'loading'}))
            await todolistAPI.deleteTask(taskId, todolistId,)
            dispatch(removeTaskAC({taskId: taskId, todoListId: todolistId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        } catch (error) {
            handleServerNetworkError(error as Error, dispatch)
        }
    }

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addTaskAC({task}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTaskEntityStatusAC({taskId, todoListId: todolistId, entityStatus: 'loading'}))
        todolistAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId, model: domainModel, todoListId: todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(changeTaskEntityStatusAC({taskId, todoListId: todolistId, entityStatus: 'idle'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }


//types
export type TaskStateType = {
    [key: string]: Array<TaskType>,
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}
export  type ActionsType =
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatusAC>


