import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/pe-icon-7-stroke.css";
import './assets/realtheme/css/font-awesome.css';
import "./sass/custom.scss";
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react'
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




