import {call, put, takeEvery} from 'redux-saga/effects';
import {authAPI} from '../api/todolist-api';
import {setIsLoggedInAC} from '../features/Login/authReducer';
import {setAppInitializedAC} from './app-reducer';

export const initializeAppSagaAA = () => ({type: 'APP/SET-INITIALIZED'}) as const

//call-request, put-AC
export function* initializeAppSaga(action: ReturnType<typeof initializeAppSagaAA>) {
    const res = yield call(authAPI.me)
    if (res.data.resultCode === 0) {
        yield   put(setIsLoggedInAC(true));
    } else {

    }
    yield put(setAppInitializedAC(true));
}

//takeEvery конкретно для связи action c sagaWorker-ом
export function* appWatcher() {
    yield takeEvery('APP/SET-INITIALIZED', initializeAppSaga)
}
