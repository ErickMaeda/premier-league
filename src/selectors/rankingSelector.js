import StoreProvider from '../configs/storeProvider';
import {
    getTeam
} from './teamsSelector';

export const getRanking = () => {
    const store = StoreProvider.getStore().store;
    const ranking = store.getState().ranking;
    return ranking.data || [];
};

export const getRankingTeam = (teamId) => {
    const ranking = getRanking();
    const team = getTeam(teamId);    
    const rankingTeam = ranking.filter((rankingTeam) => rankingTeam.name === team.name);
    return rankingTeam ? rankingTeam[0] : {};
};

export const getRankingError = () => {
    const ranking = getRanking();
    return ranking.error || null;
};

export const getRankingProgress = () => {
    const ranking = getRanking();
    return ranking.progress || null;
};