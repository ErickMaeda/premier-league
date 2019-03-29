import StoreProvider from '../configs/storeProvider';
import {
    getTeam
} from './teamsSelector';

const getReducer = () => {
    const store = StoreProvider.getStore().store;
    const reducer = store.getState().ranking;
    return reducer;
};

export const getRanking = () => {
    const reducer = getReducer();
    return reducer.data || [];
};

export const getRankingTeam = (teamId) => {
    const ranking = getRanking();
    const team = getTeam(teamId);    
    const rankingTeam = ranking.filter((rankingTeam) => rankingTeam.name === team.name);
    return rankingTeam ? rankingTeam[0] : {};
};

export const getRankingError = () => {
    const reducer = getReducer();
    return reducer.error || null;
};

export const getRankingProgress = () => {
    const reducer = getReducer();
    return reducer.progress || null;
};