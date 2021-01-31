import {Dispatch} from 'redux';
import {setIsLoggedInAC} from '../features/Login/authReducer';
import {authAPI} from '../api/todolist-api';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


type InitialStateType = typeof initialState

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string |null,
    // true когда приложение проинициализировалось (проверили юзера, настройки получили и т.д.)
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':{
            return {...state,isInitialized: action.value}
        }
        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error}) as const
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {

        }
        dispatch(setAppInitializedAC(true));
    })
}
export type SetAppErrorActionType= ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType= ReturnType<typeof setAppStatusAC>

type ActionsType =
    |  SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setAppInitializedAC>