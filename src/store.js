import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import createReducer from './reducer';
import rootSaga from './sagas';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();

    const enhancers = [
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension && process.env.NODE_ENV === 'development'
            ? window.devToolsExtension()
            : f => f,
    ];

    const rootReducer = createReducer();
    const store = createStore(
        rootReducer,
        initialState,
        compose(...enhancers)
    );

    sagaMiddleware.run(rootSaga);

    return store;
}
