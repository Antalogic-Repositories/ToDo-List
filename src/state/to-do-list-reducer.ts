import {FilterValuesType, ToDoListsType} from '../App';
import {v1} from 'uuid';


type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTitleTodolistActionType | ChangeFilterTodolistActionType
export type RemoveTodolistActionType = {
    type:'REMOVE-TODOLIST'
    id:string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title:string
    id:string
}
type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id:string
    title:string
}
type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id:string
    filter:FilterValuesType
}

//reducer принимает state & action возвращает newState
//action содержит необходимые превращения и нужные для него данные
//creator для вызова action
let initialState:Array<ToDoListsType> = []

export const todolistsReducer = (state:Array<ToDoListsType>=initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id)
        case 'ADD-TODOLIST':
            const newToDoList: ToDoListsType = {
                id: action.id,
                title: action.title,
                filter: 'all'
            }
            return [...state, newToDoList]
        case 'CHANGE-TODOLIST-TITLE':
            const nextState = state.map(tl =>{
                if(tl.id=== action.id){
                    return{...tl, title:action.title}
                }
                return tl
            })
            return nextState;
        case 'CHANGE-TODOLIST-FILTER':
            debugger
            return  state.map(tl =>{
                if(tl.id=== action.id){
                    return{...tl, filter:action.filter}
                }
                return tl
            })
        default:
            return state
    }
}

//cоздание обьетка экшион//ACTION CREATOR
// REDUCER - функция которая содержит в себе все что может пройзойти со state
export const RemoveToDoListAC = (todoListID:string):RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListID}
}
export const AddToDoListAC = (title:string):AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, id:v1()}
}
export const ChangeTitleTodolistAC = (todoListID:string,title:string):ChangeTitleTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE',id:todoListID, title: title}
}
export const ChangeFilterTodolistAC = (filter:FilterValuesType,todoListID:string,):ChangeFilterTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter:filter,id:todoListID}
}