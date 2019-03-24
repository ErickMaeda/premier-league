export const data = (state: Array) => state.matches || [];

export const gamesOfTheWeek = (state: Array, week: Int) => {
    const weeks = data(state);
    const weekGame = weeks[week];
    if (typeof weekGame === 'undefined') {
        return [];
    }
    return weekGame;
};