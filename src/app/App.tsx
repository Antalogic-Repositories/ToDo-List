import React from 'react';
import './App.css';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/Todolists/Todolist/Todolist';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Route, Switch} from 'react-router-dom';
import {Login} from '../features/Login/Login';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    //1.type of state, 2. what you need
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}


export default App;
