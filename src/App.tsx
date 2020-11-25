import React, {useState} from 'react';
import './App.css';
import {ToDoList} from './components/ToDoList';
import {v1} from 'uuid'
import AddItemForm from './components/AddItemForm';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';

//reducer  чистая функция, которая получает state и action и возвращет измененный стэйт

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


function App() {
    let toDoListID1 = v1()
    let toDoListID2 = v1()

    let [toDoLists, setToDoLists] = useState<Array<ToDoListsType>>([
        {id: toDoListID1, title: 'What to learn', filter: 'all'},
        {id: toDoListID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<taskStateType>({
        [toDoListID1]:
            [{id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
        ],
        [toDoListID2]:
            [{id: v1(), title: 'grape', isDone: true},
            {id: v1(), title: 'bread', isDone: false},

        ],

    })

    function removeToDoList(toDoListID: string) {
        setToDoLists(toDoLists.filter(tl => tl.id !== toDoListID))
        delete tasks[toDoListID]
        setTasks({...tasks})
    }

    function addTask(title: string, toDoListID: string) {
        let toDoListTasks = tasks[toDoListID]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[toDoListID] = [newTask, ...toDoListTasks]
        setTasks({...tasks})
    }

    function removeTask(taskID: string, toDoListID: string) {
        let toDoListTasks = tasks[toDoListID]
        tasks[toDoListID] = toDoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function addToDoList(title: string) {
        const newToDoListId = v1()
        const newToDoList: ToDoListsType = {
            id: newToDoListId,
            title: title,
            filter: 'all'
        }
        setToDoLists([...toDoLists, newToDoList])
        setTasks({
            ...tasks, [newToDoListId]: []
        })
    }

    function changeFilter(value: FilterValuesType, toDoListID: string) {
        let toDoList = toDoLists.find(tl => tl.id === toDoListID)
        if (toDoList) {
            toDoList.filter = value
            setToDoLists([...toDoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, toDoListID: string) {
        let toDoListTasks = tasks[toDoListID]
        let task = toDoListTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})

        }
    }

    function changeTaskTitle(taskId: string, title: string, toDoListID: string) {
        const toDoListsTasks = tasks[toDoListID]
        const task = toDoListsTasks.find(task => task.id === taskId)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeToDoListTitle(toDoListID: string, title: string) {
        const toDoList = toDoLists.find(tl => tl.id === toDoListID)
        if (toDoList) {
            toDoList.title = title
            setToDoLists([...toDoLists])
        }
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
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForToDoList = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForToDoList = allTodolistTasks.filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = allTodolistTasks.filter(t => t.isDone === true)
                            }
                            return (

                                <Grid item> {/* //ячейки*/}
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

export default App;

