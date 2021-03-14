import React, {useCallback, useEffect} from 'react';
import AddItemForm from './AddItemForm';
import EditAbleSpan from './EditAbleSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import Task from '../features/Todolists/Todolist/Task/Task';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import {FilterValuesType} from '../features/Todolists/to-do-list-reducer';
import {useDispatch} from 'react-redux';
import {fetchTasksSagaAA} from '../features/Todolists/task-sagas';

type PropsType = {
    id: string
    title: string
    entityStatus: null | string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, toDoListID: string) => void
    removeTask: (taskID: string, toDoListID: string) => void
    changeStatus: (taskId: string, status: TaskStatuses, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, toDoListID: string) => void,
    changeFilter: (value: FilterValuesType, toDoListID: string) => void,
    changeToDoListTitle: (toDoListID: string, title: string) => void
}

export const ToDoList = React.memo(function (props: PropsType) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksSagaAA(props.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const changeToDoListTitle = useCallback((title: string) => {
        props.changeToDoListTitle(props.id, title,)
    }, [props.changeToDoListTitle, props.id])
    const onAllClickHandler = useCallback(() => {
        props.changeFilter('all', props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter('active', props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter('completed', props.id)
    }, [props.changeFilter, props.id])


    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div>
            <h3>
                <EditAbleSpan value={props.title} changeValue={changeToDoListTitle} disabled={props.entityStatus === 'loading'}/>
                <IconButton
                    disabled={props.entityStatus === 'loading'}
                    onClick={() => {
                        props.removeToDoList(props.id)
                    }}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
            <div>
                {tasksForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                    toDoListID={props.id}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    changeTaskTitle={props.changeTaskTitle}/>)}
            </div>
            <div>
                <Button variant={'contained'}
                        style={{margin: '5px'}}
                        color={props.filter === 'all' ? 'primary' : 'default'}
                        onClick={onAllClickHandler}>All
                </Button>
                <Button variant={'contained'}
                        style={{margin: '5px'}}
                        className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={onActiveClickHandler}>Active
                </Button>
                <Button variant={'contained'}
                        style={{margin: '5px'}}
                        className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>)
})