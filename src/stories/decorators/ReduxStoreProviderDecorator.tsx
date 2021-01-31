import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../app/store';
import {BrowserRouter} from 'react-router-dom';



export const ReduxStoreProviderDecorator =(StoryFn:React.FC) => (
    <Provider store={store}>
        <BrowserRouter>
            <StoryFn/>
        </BrowserRouter>
    </Provider>
)
