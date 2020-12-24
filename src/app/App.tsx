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



export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    //1.type of state, 2. what you need
const status = useSelector<AppRootStateType,RequestStatusType>(state => state.app.status)
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
            {status=== 'loading' && <LinearProgress color="secondary"/> }
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default App;
