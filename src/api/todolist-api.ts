import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '97580e0f-7747-4533-9c03-60f1b0e4f8a8'
    }
})
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

//if you have {}
type ResponseType<T={}>= {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
type TaskType={
    description: string
    title:string
    completed: boolean
    status: number
    priority:number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string

}
type ResponseTasksType ={
    items: Array<TaskType>
    error: (string)
    totalCount: number
}


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
        return  instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
        //return promise
    },
    getTasks(todolistId:string) {
        return instance.get<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string,title:string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId:string,taskId:string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string, taskId:string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`,{})
    }
}
