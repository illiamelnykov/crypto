import 'babel-polyfill';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import configureStore from './store';

const initialState = {};
const store = configureStore(initialState);

const rootElement = document.getElementById('root');

const renderApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(renderApp(), rootElement);
