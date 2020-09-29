import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@material-ui/core';
import {AddBox, TextFields} from '@material-ui/icons';


type  AddItemFormPropsType = {
    addItem: (title: string) => void
}


function AddItemForm(props: AddItemFormPropsType) {

    const addItem = props.addItem

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setTitle(e.currentTarget.value)
    }

    const onAddTaskClick = () => {
        if (title.trim()) {
            props.addItem(title.trim());
            setTitle('');
        } else {
            setError('Title is required')
        }

    }

    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            onAddTaskClick()
        }
    }
    return (
        <div>
            <TextField
                variant={'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyUp={onKeyUpHandler}
                label={"title"}
                helperText={error}
                error={!!error}//строку в лог значение, в итоге дает тру
            />
            {/*<button onClick={onAddTaskClick}>+</button>*/}
           {/* <Button onClick={onAddTaskClick} variant={"contained"} color={"primary"}>+</Button>*/}
            <IconButton onClick={onAddTaskClick}  color={"primary"}><AddBox/></IconButton>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
};


export default AddItemForm;