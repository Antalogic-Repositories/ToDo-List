import {todolistAPI, TodolistType} from '../../api/todolist-api';
import {Dispatch} from 'redux';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';


//reducer принимает state & action возвращает newState
//action содержит необходимые превращения и нужные для него данные
//creator для вызова action

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.item, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        default:
            return state
    }
}

//cоздание обьетка экшион//ACTION CREATOR
// REDUCER - функция которая содержит в себе все что может пройзойти со state
//actions
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => ({
    type: 'SET-TODOLISTS',
    todolists
})
export const removeToDoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addToDoListAC = (item: TodolistType): AddTodolistActionType => ({type: 'ADD-TODOLIST', item})
export const changeTitleTodolistAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeFilterTodolistAC = (filter: FilterValuesType, id: string,) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    id
} as const)
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
} as const)

//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getToDoLists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
    todolistAPI.deleteToDoList(todolistId)
        .then((res) => {
            dispatch(removeToDoListAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTodolistsTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createToDoList(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.item
                dispatch(addToDoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
}

export const changeTitleTodolistTC = (todolistId: string, title: string,) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTitleTodolistAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}

//types
type ActionsType =
    | SetTodolistsActionType
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTitleTodolistAC>
    | ReturnType<typeof changeFilterTodolistAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    item: TodolistType
}

export type  FilterValuesType = 'all' | 'active' | 'completed'
//mixed type
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}