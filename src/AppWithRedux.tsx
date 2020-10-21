import React from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import AddItemForm from './AddItemForm';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {
    AddToDoListAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveToDoListAC
} from './state/to-do-list-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks_reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type  FilterValuesType = 'all' | 'active' | 'completed'
export type ToDoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type taskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    let toDoLists = useSelector<AppRootStateType, Array<ToDoListsType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, taskStateType>(state => state.tasks)
    let dispatch = useDispatch()

    function addTask(title: string, toDoListID: string) {
        dispatch(addTaskAC(title, toDoListID))
    }

    function removeTask(taskID: string, toDoListID: string) {
        dispatch(removeTaskAC(taskID, toDoListID))
    }

    function changeTaskTitle(taskId: string, title: string, toDoListID: string) {
        dispatch(changeTaskTitleAC(taskId, title, toDoListID))
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListID: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, toDoListID))
    }

    function removeToDoList(toDoListID: string) {
        dispatch(RemoveToDoListAC(toDoListID))
    }

    function addToDoList(title: string) {
        let action = AddToDoListAC(title)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, toDoListID: string) {
        dispatch(ChangeFilterTodolistAC(value, toDoListID))
    }

    function changeToDoListTitle(toDoListID: string, title: string) {
        dispatch(ChangeTitleTodolistAC(toDoListID, title))
    }

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
                <Grid style={{padding: '15px'}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container={true} spacing={5} >   {/* //строка*/}
                    {
                        toDoLists.map(tl => {
                            let tasksForToDoList = tasks[tl.id];
                            if (tl.filter === 'active') {
                                tasksForToDoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = tasks[tl.id].filter(t => t.isDone === true)
                            }
                            return (

                                <Grid item={true} key={tl.id}> {/* //ячейки*/}
                                    <Paper style={{padding: '15px'}} elevation={3}>
                                        <ToDoList
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForToDoList}
                                            filter={tl.filter}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeStatus={changeStatus}
                                            removeToDoList={removeToDoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeToDoListTitle={changeToDoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    } </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

