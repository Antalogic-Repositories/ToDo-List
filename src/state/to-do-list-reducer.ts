import {v1} from 'uuid';
import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';


type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType
    | SetTodolistsActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    item: TodolistType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

//reducer принимает state & action возвращает newState
//action содержит необходимые превращения и нужные для него данные
//creator для вызова action
const initialState: Array<TodolistDomainType> = []

export type  FilterValuesType = 'all' | 'active' | 'completed'
//mixed type
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        }
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            return [{
                ...action.item,
                filter: 'all'
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            const nextState = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl
            })
            return nextState;
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl
            })
        default:
            return state
    }
}

//cоздание обьетка экшион//ACTION CREATOR
// REDUCER - функция которая содержит в себе все что может пройзойти со state
export const RemoveToDoListAC = (todoListID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListID}
}
export const AddToDoListAC = (item: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', item}
}
export const ChangeTitleTodolistAC = (todoListID: string, title: string): ChangeTitleTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListID, title: title}
}
export const ChangeFilterTodolistAC = (filter: FilterValuesType, todoListID: string,): ChangeFilterTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todoListID}
}
export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getToDoLists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteToDoList(todolistId)
            .then((res) => {
                dispatch(RemoveToDoListAC(todolistId))
            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createToDoList(title)
            .then((res) => {
                dispatch(AddToDoListAC(res.data.data.item))
            })
    }
}
export const ChangeTitleTodolistTC = ( todolistId: string, title: string,) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                dispatch(ChangeTitleTodolistAC(todolistId,title))
            })
    }
}

