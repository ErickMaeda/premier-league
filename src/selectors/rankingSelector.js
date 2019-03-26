import StoreProvider from '../configs/store';

export const getRanking = () => {
    const store = StoreProvider.getStore();
    const ranking = store.getState().ranking;
    return ranking.data || [];
};

export const getRankingError = () => {
    const store = StoreProvider.getStore();
    const ranking = store.getState().ranking;
    return ranking.error || null;
};

export const getRankingProgress = () => {
    const store = StoreProvider.getStore();
    const ranking = store.getState().ranking;
    return ranking.progress || null;
};