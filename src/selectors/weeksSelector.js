import StoreProvider from '../configs/storeProvider';

const getReducer = () => {
    const store = StoreProvider.getStore().store;
    const reducer = store.getState().weeks;
    return reducer;
};

export const getWeeks = () => {
    const reducer = getReducer();
    return reducer.data || [];
};

export const getWeek = (week) => {
    const weeks = getWeeks();
    const weekGames = weeks[week];
    return weekGames || [];
};