import React, {useState} from 'react';
import '../app/App.css';
import {ToDoList} from '../components/ToDoList';
import {v1} from 'uuid'
import AddItemForm from '../components/AddItemForm';
import {Menu} from '@material-ui/icons';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {TaskStatuses, TaskType, TodoTaskPriorities} from '../api/todolist-api';
import {FilterValuesType, TodolistDomainType} from '../features/Todolists/to-do-list-reducer';

//reducer  чистая функция, которая получает state и action и возвращет измененный стэйт


export type TaskStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let toDoListID1 = v1()
    let toDoListID2 = v1()

    let [toDoLists, setToDoLists] = useState<Array<TodolistDomainType>>([
        {id: toDoListID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: toDoListID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [toDoListID1]:
            [{
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: toDoListID1, addedDate: '',
                deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low
            },
                {
                    id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: toDoListID1, addedDate: '',
                    deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low
                },
            ],
        [toDoListID2]:
            [{
                id: v1(), title: 'grape', status: TaskStatuses.Completed, todoListId: toDoListID2, addedDate: '',
                deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low
            },
                {
                    id: v1(), title: 'bread', status: TaskStatuses.Completed, todoListId: toDoListID2, addedDate: '',
                    deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low
                },
            ],

    })

    function removeToDoList(toDoListID: string) {
        setToDoLists(toDoLists.filter(tl => tl.id !== toDoListID))
        delete tasks[toDoListID]
        setTasks({...tasks})
    }

    function addTask(title: string, toDoListID: string) {
        let toDoListTasks = tasks[toDoListID]
        let newTask: TaskType = {
            id: v1(), title: title, status: TaskStatuses.New, todoListId: toDoListID, addedDate: '',
            deadline: '', description: '', startDate: '', order: 0, priority: TodoTaskPriorities.Low
        }
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
        const newToDoList: TodolistDomainType = {
            id: newToDoListId,
            title: title,
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
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

    function changeStatus(taskId: string, status: TaskStatuses, toDoListID: string) {
        let toDoListTasks = tasks[toDoListID]
        let task = toDoListTasks.find(t => t.id === taskId)
        if (task) {
            task.status = status;
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
                                tasksForToDoList = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
                            }
                            if (tl.filter === 'completed') {
                                tasksForToDoList = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
                            }
                            return (

                                <Grid item> {/* //ячейки*/}
                                    <Paper style={{padding: '15px'}} elevation={3}>
                                        <ToDoList id={tl.id}
                                                  title={tl.title}
                                                  entityStatus={tl.entityStatus}
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


//http://localhost:9009/iframe.html?id=todolists-additemform--add-item-form-example&viewMode=story
//for snapshot
export default App;

