import StoreProvider from '../configs/store';

export const getRanking = () => {
    const store = StoreProvider.getStore();
    const ranking = store.getState().ranking;
    return ranking.data || [];
};