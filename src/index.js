import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// Import Screens
import RankingScreen from './screens/RankingScreen';
import TeamsScreen from './screens/TeamsScreen';
import TeamScreen from './screens/TeamScreen';
import WeeksScreen from './screens/WeeksScreen';

// Import Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import StoreProvider from './configs/store';

// Header component
import Header from './components/Header';


// Configure the reducer
const configureStore = () => createStore(reducers, {}, applyMiddleware(reduxThunk));
StoreProvider.init(configureStore);
const store = StoreProvider.getStore();

const Routes = (
  <Provider store={store}>
    <HashRouter>
      <div>
        <Header />
        <Switch>
          <Route path='/' exact={true} component={RankingScreen} />
        </Switch>
      </div>
    </HashRouter>
  </Provider>
);

ReactDOM.render(Routes, document.getElementById('root'));

serviceWorker.unregister();
