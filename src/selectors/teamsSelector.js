import StoreProvider from '../configs/storeProvider';

const getReducer = () => {
    const store = StoreProvider.getStore().store;
    const reducer = store.getState().teams;
    return reducer;
};

export const getTeams = () => {
    const reducer = getReducer();
    return reducer.data || [];
};

export const getTeam = (teamId) => {
    const teams = getTeams();
    return teams[teamId];
}