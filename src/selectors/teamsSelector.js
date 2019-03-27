import StoreProvider from '../configs/storeProvider';

export const getTeams = () => {
    const store = StoreProvider.getStore().store;
    const teams = store.getState().teams;
    return teams.data || [];
};

export const getTeam = (teamId) => {
    const teams = getTeams();
    return teams[teamId];
}