import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './to-do-list-reducer';
import {TaskStatuses, TaskType, todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';


export  type ActionType = ActionType1
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export type ActionType1 = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    task:TaskType
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-STATUS',
    taskID: string,
    status: TaskStatuses,
    todoListID: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TITLE',
    taskID: string,
    title: string,
    todoListID: string
}


//reducer принимает state & action возвращает newState
//action содержит необходимые превращения и нужные для него данные
//creator для вызова action
let initialState: TaskStateType = {
    count: []
}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-STATUS': {
            let todolistTasks = state[action.todoListID];
            // найдём нужную таску:
            let task = todolistTasks.find(t => t.id === action.taskID);
            //изменим таску, если она нашлась
            if (task) {
                task.status = action.status;
            }
            state[action.todoListID] = [...state[action.todoListID]]
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskID) return task
                    else return {...task, isDone: action.status}
                })
            };
        }

        case 'CHANGE-TITLE': {
            let toDoListTasks = state[action.todoListID];
            let task = toDoListTasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.title;
            }
            //копия стэйта
            //[action.todoListID] меняем ссылку на обьект

            state[action.todoListID] = [...state[action.todoListID]]
//глубокое копирование!!!!!изучить!!!!!
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => {
                    if (task.id !== action.taskID) return task
                    else return {...task, title: action.title}
                })
            };
        }
        case 'ADD-TODOLIST': {
            let id = v1()
            return {...state, [action.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todoListID: string): ActionType1 => {
    return {type: 'REMOVE-TASK', taskID: taskID, todoListID: todoListID}
}
export const addTaskAC = (task: TaskType):AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}


export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS', taskID, status, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE', taskID: taskID, title: title, todoListID: todoListID}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                const action = setTasksAC(tasks, todolistId)
                dispatch(action)
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) =>
    async (dispatch: Dispatch) => {
        await todolistAPI.deleteTask(taskId, todolistId,)
        dispatch(removeTaskAC(taskId, todolistId))
    }


export const addTaskTC =(todolistId:string,title:string)=> (dispatch:Dispatch) => {
    todolistAPI.createTask(todolistId,title)
        .then((res)=>{
            let task=res.data.data.item
            dispatch(addTaskAC(task));
        })
}
