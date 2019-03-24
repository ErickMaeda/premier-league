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
    let color = '#fff'; // Default
    if ((position >= 1) && (position <= 4)) {
        color = '#eeeeee'; // UEFA Champions League qualified
    } else if (position === 5) {
        color = '#f5f5f5'; // UEFA Europa League qualified
    } else if (position >= 18) {
        color = '#ffebee'; // Downgrade risk
    }
    return color;
}