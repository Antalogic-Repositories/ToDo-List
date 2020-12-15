import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './to-do-list-reducer';
import {TaskStatuses, TaskType, TodoTaskPriorities} from '../api/todolist-api';


export  type ActionType = ActionType1
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export type ActionType1 = {
    type: 'REMOVE-TASK'
    taskID: string
    todoListID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todoListID: string
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
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK': {
            let newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListID,
                addedDate: '', deadline: '', description: '', startDate: '',
                order: 0, priority: TodoTaskPriorities.Low
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]]}
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
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title: title, todoListID: todoListID}
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-STATUS', taskID, status, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TITLE', taskID: taskID, title: title, todoListID: todoListID}
}

