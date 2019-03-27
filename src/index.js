import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './screens';
import * as serviceWorker from './serviceWorker';

// Import Redux
import { Provider } from 'react-redux';
import StoreProvider from './configs/store';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './configs/configureStore';

// Configure the reducer
StoreProvider.init(configureStore);
const store = StoreProvider.getStore();

const Main = (
	<Provider store={store.store}>
		<PersistGate loading={null} persistor={store.persistor}>
			<Routes />
		</PersistGate>
	</Provider>
);

ReactDOM.render(Main, document.getElementById('root'));

serviceWorker.unregister();
