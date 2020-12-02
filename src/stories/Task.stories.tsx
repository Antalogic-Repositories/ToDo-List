import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import Task, {TaskPropsType} from '../components/Task';

export default {
    title: 'Todolists/Task',
    component: Task,
} as Meta;

const removeCallback = action('Remove button inside task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')

const Template: Story<TaskPropsType> = (args) => <div>
    <Task task={{id: '1', isDone: true, title: 'css'}}
          toDoListID={'todolist1'}
          removeTask={removeCallback}
          changeStatus={changeStatusCallback}
          changeTaskTitle={changeTaskTitleCallback}/>

    <Task task={{id: '2', isDone: false, title: 'js'}}
          toDoListID={'todolist2'}
          removeTask={removeCallback}
          changeStatus={changeStatusCallback}
          changeTaskTitle={changeTaskTitleCallback}/>
</div>;

export const TaskExample = Template.bind({});
TaskExample.args = {};

