import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api';
//CRUD create-post read-ged update-put delete-delete
export default {
    title: 'API',
}

//WORK WITH TODOLIST
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getToDoLists().then((res) => {
            setState(res.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const createNewTodolist = () => {
        todolistAPI.createToDoList(title)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'title for new todolist'} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={createNewTodolist}>create todolist</button>
        </div>
    </div>
}


export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTodoL = () => {
        todolistAPI.deleteToDoList(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'write todolistId'} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <button onClick={deleteTodoL}>delete todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const updateTodoL = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'write todolistId'} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'write a new title'} onChange={e => setTitle(e.currentTarget.value)}/>
            <button onClick={updateTodoL}>update todolist</button>
        </div>
    </div>
}
//WORK WITH TASKS
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const getTasksById = () => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input onChange={e => setTodolistId(e.currentTarget.value)} value={todolistId}/>
            <button onClick={getTasksById}>get tasks</button>
        </div>
    </div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const createNewTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'write todolistId'} onChange={e => setTodolistId(e.currentTarget.value)}
                   value={todolistId}/>
            <input placeholder={'write a new title'} onChange={e => setTitle(e.currentTarget.value)} value={title}/>
            <button onClick={createNewTask}>create task</button>
        </div>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const deleteSomeTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'write todolistId'} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'write taskId'} onChange={e => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteSomeTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateSomeTask = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: startDate,
            deadline: deadline
        })
            .then((res) => {
                setState(res.data)
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={'write todolistId'} onChange={e => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={'write taskId'} onChange={e => setTaskId(e.currentTarget.value)}/>

            <input placeholder={'write title'} onChange={e => setTitle(e.currentTarget.value)}/>
            <input placeholder={'write description'} onChange={e => setDescription(e.currentTarget.value)}/>
            <input placeholder={'write status'} type={'number'} onChange={e => setStatus(+e.currentTarget.value)}/>
            <input placeholder={'write priority'} type={'number'} onChange={e => setPriority(+e.currentTarget.value)}/>
            <button onClick={updateSomeTask}>update task</button>
        </div>
    </div>
}
//PATCH-REQUEST  ЕСЛИ НУЖНО ОБНОВИТЬ КАКУЮ-ТО ЧАСТЬ ОБЬЕКТА
//resultCode: 0  --- all right