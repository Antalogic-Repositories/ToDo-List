import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';


type  AddItemFormPropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItem form called')

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
        if (error !== null) {
            setError(null)
        }
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
                label={'title'}
                helperText={error}
                error={!!error}//строку в лог значение, в итоге дает тру
            />
            <IconButton onClick={onAddTaskClick} color={'primary'}><AddBox/></IconButton>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
});


export default AddItemForm;