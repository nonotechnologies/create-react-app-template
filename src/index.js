import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';

import { store } from './helpers';
import { App } from './App/App';
import 'bootstrap/dist/css/bootstrap.min.css';

// setup fake backend
import { configureFakeBackend } from './helpers';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);