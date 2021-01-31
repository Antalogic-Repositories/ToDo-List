import React, {useCallback, useEffect} from 'react';
import {
    addTodolistsTC,
    changeFilterTodolistAC,
    changeTitleTodolistTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistsTC,
    TodolistDomainType
} from '../to-do-list-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {addTaskTC, removeTaskTC, updateTaskTC} from '../tasks_reducer';
import {TaskStatuses} from '../../../api/todolist-api';
import {Grid, Paper} from '@material-ui/core';
import AddItemForm from '../../../components/AddItemForm';
import {ToDoList} from '../../../components/ToDoList';
import {TaskStateType} from '../../../app/App';
import {Redirect} from 'react-router-dom';


export const TodolistsList: React.FC = () => {
    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    let toDoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    let dispatch = useDispatch()

    const addTask = useCallback((title: string, toDoListID: string) => {
        dispatch(addTaskTC(toDoListID, title))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, toDoListID: string) => {
        dispatch(removeTaskTC(taskID, toDoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, toDoListID: string) => {
        dispatch(updateTaskTC(taskId, {title}, toDoListID))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC(taskId, {status}, todolistId))
    }, [dispatch])

    const removeToDoList = useCallback((toDoListID: string) => {
        dispatch(removeTodolistsTC(toDoListID))
    }, [dispatch])

    const addToDoList = useCallback((title: string) => {
        dispatch(addTodolistsTC(title))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, toDoListID: string) => {
        dispatch(changeFilterTodolistAC(value, toDoListID))
    }, [dispatch])

    const changeToDoListTitle = useCallback((toDoListID: string, title: string) => {
        dispatch(changeTitleTodolistTC(toDoListID, title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }
    return <>
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
                                    entityStatus={tl.entityStatus}
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
            }
        </Grid>
    </>
}