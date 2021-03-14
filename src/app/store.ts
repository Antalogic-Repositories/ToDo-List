import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../features/Todolists/tasks_reducer';
import {todolistsReducer} from '../features/Todolists/to-do-list-reducer';
import thunk from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/authReducer';
import createSagaMiddleware from 'redux-saga'
import {appWatcher} from './app-sagas';
import {tasksWatcher} from '../features/Todolists/task-sagas';
import { all } from 'redux-saga/effects';
import {authWatcher} from '../features/Login/auth-sagas';

// создаем saga мидлвар
const sagaMiddleware = createSagaMiddleware()
// монтируем его в Store
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// затем запускаем сагу
sagaMiddleware.run(rootWatcher)

//следящая или связывающая функция, которая в параметрах принимает
// 1.action activator и 2.sagaWorker(сагу, которую надо активировать)
// в свои yield c функцией takeEvery
function* rootWatcher() {
    yield all([appWatcher(), authWatcher(), tasksWatcher()])
}

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;