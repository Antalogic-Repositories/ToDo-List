import {combineReducers} from 'redux';
import {tasksReducer} from '../features/Todolists/tasks_reducer';
import {todolistsReducer} from '../features/Todolists/to-do-list-reducer';
import thunk from "redux-thunk";
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/authReducer';
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
//export const store = createStore(rootReducer, applyMiddleware( thunkMiddleware));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// Infer the `RootState` and `AppDispatch` types from the store itself


// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;