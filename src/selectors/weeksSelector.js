import StoreProvider from '../configs/store';

export const getWeeks = () => {
    const store = StoreProvider.getStore();
    const weeks = store.getState().weeks;
    return weeks.data || [];
};

export const getWeek = (week) => {
    const weeks = getWeeks();
    const weekGames = weeks[week];
    return weekGames || [];
};