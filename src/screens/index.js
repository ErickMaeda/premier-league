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
import AboutScreen from './AboutScreen';

export default () => (
    <HashRouter>
        <Switch>
            <Route path='/' exact={true} component={RankingScreen} />
            <Route path='/teams/:id' component={TeamScreen} />
            <Route path='/teams' component={TeamsScreen} />
            <Route path='/about' component={AboutScreen} />
        </Switch>
    </HashRouter>
);