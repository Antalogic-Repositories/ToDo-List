import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import AppWithRedux from '../app/App';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';


export default {
    title: 'Todolists/AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = () => <AppWithRedux/>


export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {};

