import React from 'react';

import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import EditAbleSpan, {EditAbleSpanPropsType} from '../components/EditAbleSpan';

export default {
    title: 'Todolists/EditableSpan',
    component: EditAbleSpan,
    argTypes:{
        onChange:{
            description:'Changed value editable span'
        },
        value: {
            defaultValue:'defaultValue',
            description:'Start value to editable span',
            name: "span"
        }
    }
} as Meta;


const Template: Story<EditAbleSpanPropsType> = (args) => <EditAbleSpan {...args}/>


export const EditAbleSpanExample = Template.bind({});

EditAbleSpanExample.args = {
    changeValue: action('Value changed')
};

