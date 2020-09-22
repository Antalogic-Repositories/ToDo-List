import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import AddItemForm from './AddItemForm';
import EditAbleSpan from './EditAbleSpan';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, toDoListID: string) => void
    removeTask: (taskID: string, toDoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeTaskTitle:(taskId: string, title:string,toDoListID:string)=>void,
    changeFilter: (value: FilterValuesType, toDoListID: string) => void,
    changeToDoListTitle:(toDoListID:string, title:string)=>void
}

export function ToDoList(props: PropsType) {
    const tasks =  props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        };
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTaskTitle=(value:string)=>{
            props.changeTaskTitle(t.id, value, props.id )
        }
        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}

                />
                <EditAbleSpan value={t.title}
                              changeValue={changeTaskTitle}
                />
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const changeToDoListTitle=( title:string) => {
        props.changeToDoListTitle(props.id,title)
    }

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    return (
        <div>
            <h3>
                <EditAbleSpan value={props.title} changeValue={changeToDoListTitle}/>
                <button onClick={() => {
                    props.removeToDoList(props.id)
                }}>X
                </button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                { tasks }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>)
}