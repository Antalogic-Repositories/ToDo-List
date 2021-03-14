import {call, put, takeEvery} from 'redux-saga/effects';
import {setAppStatusAC} from '../../app/app-reducer';
import {todolistAPI} from '../../api/todolist-api';
import {setTasksAC} from './tasks_reducer';


export const fetchTasksSagaAA = (todolistId: string) => ({type: 'APP/FETCH-TASKS', todolistId}) as const

//call-request, put-AC
export function* fetchTasksSagaWorker(action: ReturnType<typeof fetchTasksSagaAA>) {
    yield put(setAppStatusAC('loading'))
    const res = yield call(todolistAPI.getTasks, action.todolistId)
    yield put(setTasksAC(res.data.items, action.todolistId))
    yield put(setAppStatusAC('succeeded'))
}


//takeEvery конкретно для связи action c sagaWorker-ом
export function* tasksWatcher() {
    yield takeEvery('APP/FETCH-TASKS', fetchTasksSagaWorker)
}
