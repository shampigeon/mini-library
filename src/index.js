import React from 'react';
import ReactDOM from 'react-dom';
import "./sass/custom.scss";
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react'
import './assets/bootstrap/css/bootstrap-theme.min.css'
import './assets/bootstrap/css/bootstrap.min.css'


const store = configureStore();

ReactDOM.render(
    <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
            <HashRouter>
                <Routes />
            </HashRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();




