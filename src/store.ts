declare const window: Window & {
    devToolsExtension: any,
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
};

import { createStore, compose, applyMiddleware, combineReducers, Store } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

interface IOptions {
    name: string,
}

const reduxDevtools = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers = (options: IOptions) => (reduxDevtools
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(options)
    : compose);

const history = createHistory();

const store = (): Store<any> => createStore(
    composeEnhancers({ name: 'App' })(
        applyMiddleware(
            createLogger(),
            routerMiddleware(history),
        ),
    ),
);

export default store();

export {
    history,
};
