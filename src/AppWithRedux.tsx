import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ToDoList} from './components/ToDoList';
import AddItemForm from './components/AddItemForm';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {
    AddToDoListAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC, fetchTodolistsTC,
    FilterValuesType,
    RemoveToDoListAC,
    TodolistDomainType
} from './state/to-do-list-reducer';
import {
    addTaskAC,
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTaskTC
} from './state/tasks_reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType} from './api/todolist-api';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    let toDoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    let dispatch = useDispatch()

    const addTask = useCallback((title: string, toDoListID: string) => {
        dispatch(addTaskTC(toDoListID,title ))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, toDoListID: string) => {
        dispatch(removeTaskTC(taskID, toDoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, toDoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, toDoListID))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, toDoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, status, toDoListID))
    }, [dispatch])

    const removeToDoList = useCallback((toDoListID: string) => {
        dispatch(RemoveToDoListAC(toDoListID))
    }, [dispatch])
    //action creator
//от параметров не зависим
    const addToDoList = useCallback((title: string) => {
        let action = AddToDoListAC(title)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, toDoListID: string) => {
        dispatch(ChangeFilterTodolistAC(value, toDoListID))
    }, [dispatch])

    const changeToDoListTitle = useCallback((toDoListID: string, title: string) => {
        dispatch(ChangeTitleTodolistAC(toDoListID, title))
    }, [dispatch])

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
                <Grid container={true} spacing={5}>   {/* //строка*/}
                    {
                        toDoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id]
                            return (

                                <Grid item={true} key={tl.id}> {/* //ячейки*/}
                                    <Paper style={{padding: '15px'}} elevation={3}>
                                        <ToDoList
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            tasks={allTodolistTasks}
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
