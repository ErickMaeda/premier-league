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

// Header component
import Header from './components/Header';

const Routes = (
  <HashRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={RankingScreen} />
      </Switch>
    </div>
  </HashRouter>
);

ReactDOM.render(Routes, document.getElementById('root'));

serviceWorker.unregister();
