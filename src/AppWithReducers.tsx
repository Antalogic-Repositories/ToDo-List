import React, {useReducer} from 'react';
import './App.css';
import {ToDoList} from './ToDoList';
import {v1} from 'uuid'
import AddItemForm from './AddItemForm';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {
    AddToDoListAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveToDoListAC,
    todolistsReducer
} from './state/to-do-list-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks_reducer';


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


function AppWithReducers() {
    let toDoListID1 = v1()
    let toDoListID2 = v1()

    let [toDoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {id: toDoListID1, title: 'What to learn', filter: 'all'},
        {id: toDoListID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [toDoListID1]: [{id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: true},
            {id: v1(), title: 'Rest API', isDone: true}
        ],
        [toDoListID2]: [{id: v1(), title: 'grape', isDone: true},
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'butter', isDone: true},
            {id: v1(), title: 'sweet', isDone: true},
            {id: v1(), title: 'milk', isDone: true}
        ],

    })

    function addTask(title: string, toDoListID: string) {
        dispatchTasks(addTaskAC(title, toDoListID))
    }

    function removeTask(taskID: string, toDoListID: string) {
        dispatchTasks(removeTaskAC(taskID, toDoListID))
    }

    function changeTaskTitle(taskId: string, title: string, toDoListID: string) {
        dispatchTasks(changeTaskTitleAC(taskId, title, toDoListID))
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListID: string) {
        dispatchTasks(changeTaskStatusAC(taskId, isDone, toDoListID))
    }

    function removeToDoList(toDoListID: string) {
        dispatchTodoLists(RemoveToDoListAC(toDoListID))
        dispatchTasks(RemoveToDoListAC(toDoListID))
    }

    function addToDoList(title: string) {
        let action = AddToDoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    function changeFilter(value: FilterValuesType, toDoListID: string) {
        dispatchTodoLists(ChangeFilterTodolistAC(value, toDoListID))
    }



    function changeToDoListTitle(toDoListID: string, title: string) {
        dispatchTodoLists(ChangeTitleTodolistAC(toDoListID, title))
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
                <Grid container={true} spacing={5}>   {/* //строка*/}
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

export default AppWithReducers;

