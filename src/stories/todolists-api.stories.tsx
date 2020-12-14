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
    const [title, setTitle] = useState<any>(null)
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
    const [todolistId, setTodolistId] = useState<any>(null)
    const deleteTodoL=() => {
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
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const updateTodoL=() => {
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
    useEffect(() => {
        let todolistId = '40935799-b048-4782-8cc4-9b9f1bdf13e5'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '85d17727-cde2-4de3-9d4d-643a1fe47370'
        let title = 'you did it'
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '85d17727-cde2-4de3-9d4d-643a1fe47370'
        let taskId = 'b75345c0-58f6-4100-a0a5-ebb0b93d56aa'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '85d17727-cde2-4de3-9d4d-643a1fe47370'
        let taskId = 'you did it'
        todolistAPI.updateTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
