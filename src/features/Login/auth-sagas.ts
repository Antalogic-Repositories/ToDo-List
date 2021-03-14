import {call, put, takeEvery} from 'redux-saga/effects';
import {authAPI, LoginParamsType} from '../../api/todolist-api';
import {setAppStatusAC} from '../../app/app-reducer';
import {setIsLoggedInAC} from './authReducer';

export const loginSagaAA = (data: LoginParamsType) => ({type: 'AUTH/LOGIN', data}) as const
export const logoutSagaAA = () => ({type: 'AUTH/LOGOUT'}) as const

export function* loginSaga(action: ReturnType<typeof loginSagaAA>) {
    yield put(setAppStatusAC('loading'))
    const res = yield call(authAPI.login, action.data)
    if (res.data.resultCode === 0) {
        yield put(setIsLoggedInAC(true))
        yield put(setAppStatusAC('succeeded'))
    } else {
        //handleServerAppError(res.data, dispatch)
    }
    //catch((error) => {
    //handleServerNetworkError(error, dispatch)
    //})
}

export function* logoutSaga(action: ReturnType<typeof logoutSagaAA>) {
    yield put(setAppStatusAC('loading'))
    const res = yield call(authAPI.logout)

    if (res.data.resultCode === 0) {
        yield put(setIsLoggedInAC(false))
        yield put(setAppStatusAC('succeeded'))
    } else {
        //handleServerAppError(res.data, dispatch)
        //}

        //catch((error) => {
        //handleServerNetworkError(error, dispatch)
        //})
    }
}

//takeEvery конкретно для связи action c sagaWorker-ом
export function* authWatcher() {
    yield takeEvery('AUTH/LOGIN', loginSaga)
    yield takeEvery('AUTH/LOGOUT', logoutSaga)
}