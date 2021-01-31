import axios, {AxiosResponse} from 'axios'
import {RequestStatusType} from '../app/app-reducer';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '97580e0f-7747-4533-9c03-60f1b0e4f8a8'
    }
})

//api
export const todolistAPI = {
    getToDoLists(): Promise<AxiosResponse<Array<TodolistType>>> {
        return instance.get('todo-lists')
    },
    createToDoList(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteToDoList(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
        //return promise
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(taskId: string, todolistId: string,) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
    },
    logout() {
        return instance.delete<ResponseType<{ userId?: number }>>('auth/login');
    },
    me() {
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>('auth/me');
    }
}


//types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
//if you have {}
export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

//isDone:true - completed
export enum TodoTaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string,
    entityStatus: RequestStatusType
}
type ResponseTasksType = {
    items: Array<TaskType>
    error: (string)
    totalCount: number
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}