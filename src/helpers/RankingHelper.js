/**
 * @description
 * Find the background color for the @param position of the Ranking Table
 * 
 * @param {Int} position -> Position on Ranking table 
 * 
 * @returns {String} color
 * 
 */
export const getBackgroundColorByPosition = (position: Int): String => {
    let color = '#ffffffFF'; // Default
    if ((position >= 1) && (position <= 4)) {
        color = '#E3F2FD'; // UEFA Champions League qualified
    } else if (position === 5) {
        color = '#E8F5E9'; // UEFA Europa League qualified
    } else if (position >= 18) {
        color = '#FFEBEE'; // Downgrade risk
    }
    return color;
}

export const getAllBackgroundColorsAndDescription = () => {
    return [
        {
            color: '#E3F2FD',
            description: 'Champions League'
        },
        {
            color: '#E8F5E9',
            description: 'UEFA Europa League'
        },
        {
            color: '#FFEBEE',
            description: 'Relegation'
        },
    ];
}

/**
 * @description
 * Find the text color for the @param position of the Ranking Table
 * 
 * @param {Int} position -> Position on Ranking table 
 * 
 * @returns {String} color
 * 
 */
export const getColorByPosition = (position: Int): String => {
    let color = '#000000'; // Default
    if ((position >= 1) && (position <= 4)) {
        color = '#E3F2FD'; // UEFA Champions League qualified
    } else if (position === 5) {
        color = '#E8F5E9'; // UEFA Europa League qualified
    } else if (position >= 18) {
        color = '#FFEBEE'; // Downgrade risk
    }
    return color;
}