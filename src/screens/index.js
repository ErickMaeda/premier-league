import React from 'react';
import {
  HashRouter,
  Switch,
  Route
} from 'react-router-dom';

// Import Screens
import RankingScreen from './RankingScreen';
import TeamsScreen from './TeamsScreen';
import TeamScreen from './TeamScreen';
import WeeksScreen from './WeeksScreen';

// Header component
import Header from '../components/Header';

const Router = () => (
    <HashRouter>
        <div>
            <Header />
            <Switch>
                <Route path='/' exact={true} component={RankingScreen} />
                <Route path='/teams/:id' component={TeamScreen} />
                <Route path='/teams' component={TeamsScreen} />
            </Switch>
        </div>
    </HashRouter>
);

export default Router;