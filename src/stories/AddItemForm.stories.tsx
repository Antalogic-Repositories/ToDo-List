import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';

import AddItemForm, {AddItemFormPropsType} from "../components/AddItemForm";
import {action} from '@storybook/addon-actions';

export default {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'AddItemFormExample clicked'
        }
    },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem:action('AddItemFormExample clicked')
};

