import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditAbleSpan from './EditAbleSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './App';

type  TaskPropsType = {
    task: TaskType,
    toDoListID: string
    removeTask: (taskID: string, toDoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, toDoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, toDoListID: string) => void,
}

const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => {
        props.removeTask(props.task.id, props.toDoListID)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeStatus(props.task.id, newIsDoneValue, props.toDoListID)
    }
    const onTitleChangeHandler = (value: string) => {
        props.changeTaskTitle(props.task.id, value, props.toDoListID)
    }
    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox checked={props.task.isDone}
                  onChange={onChangeHandler}
        />
        <EditAbleSpan value={props.task.title}
                      changeValue={onTitleChangeHandler}
        />
        <IconButton onClick={onClickHandler}><Delete/></IconButton>
    </div>
})
export default Task