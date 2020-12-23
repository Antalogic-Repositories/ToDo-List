import React from 'react';
import './App.css';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {TaskType} from '../api/todolist-api';
import {TodolistsList} from '../features/Todolists/Todolist/Todolist';



export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {

    return (
        <div className="App">
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
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default App;
