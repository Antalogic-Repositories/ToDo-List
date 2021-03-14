import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Menu} from '@material-ui/icons';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/Todolists/Todolist/Todolist';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {logoutTC} from '../features/Login/authReducer';
import {initializeAppSagaAA} from './app-sagas';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    //1.type of state, 2. what you need
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppSagaAA() )
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <Redirect to={'/todolist'}/>}/>
                    <Route exact path={'/it-incubator-todolist-ts'} render={() => <Redirect to={'/todolist'}/>}/>
                    <Route path={'/todolist'} render={() => <TodolistsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <div>404 NOT FOUND</div>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}


export default App;
