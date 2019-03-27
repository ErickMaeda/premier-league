/**
 * @description
 * Find the background color for the @param position of the Ranking Table
 * 
 * @param {Int} position -> Position on Ranking table 
 * 
 * @returns {String} color
 * 
 */
export const getColorByPosition = (position: Int): String => {
    let color = '#ffffffFF'; // Default
    if ((position >= 1) && (position <= 4)) {
        color = '#eeeeeeFF'; // UEFA Champions League qualified
    } else if (position === 5) {
        color = '#f5f5f5FF'; // UEFA Europa League qualified
    } else if (position >= 18) {
        color = '#ffebeeFF'; // Downgrade risk
    }
    return color;
}