import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './screens';
import * as serviceWorker from './serviceWorker';

// Import Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import StoreProvider from './configs/store';

// Configure the reducer
const configureStore = () => createStore(reducers, {}, applyMiddleware(reduxThunk));
StoreProvider.init(configureStore);
const store = StoreProvider.getStore();

const Main = (
  <Provider store={store}>
    <Routes/>
  </Provider>
);

ReactDOM.render(Main, document.getElementById('root'));

serviceWorker.unregister();
