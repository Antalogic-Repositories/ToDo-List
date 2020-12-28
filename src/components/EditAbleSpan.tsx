import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@material-ui/core';

export type  EditAbleSpanPropsType = {
    value: string
    changeValue: (value: string) => void
    disabled?: boolean
}

export const EditAbleSpan = React.memo((props: EditAbleSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.value)

    const activatedEditMode = () => {
        setEditMode(true)
        setTitle(props.value);
    }
    const deActivatedEditMode = () => {
        setEditMode(false)
        props.changeValue(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode && !props.disabled
        ?
        <TextField
            variant={'outlined'}
            value={title}
            onBlur={deActivatedEditMode}
            autoFocus={true}
            onChange={onChangeHandler}
        />
        : <span onDoubleClick={activatedEditMode}>{props.value} </span>
})

export default EditAbleSpan