import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../state/store';



export const ReduxStoreProviderDecorator =(StoryFn:React.FC) => (
    <Provider store={store}>
        <StoryFn/>
    </Provider>
)
