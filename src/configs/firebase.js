import * as firebase from "firebase";

import {
    config    
} from "../keys/keys";

// Initialize the firebase application
firebase.initializeApp(config);

/**
 * @description
 * Firebase database providers
 * 
 * Firestore -> Store the team data
 * Realtime -> Store the seasons matches data
 */
const DATABASE_PROVIDER_REALTIMEDATABASE = 'realtime';
const DATABASE_PROVIDER_FIRESTORE = 'firestore';

// Can use firebase with Realtime Database / Firestore Database
export const getDatabase = (provider) => {
    switch (provider) {
        case DATABASE_PROVIDER_FIRESTORE:
            return firebase.firestore();
        case DATABASE_PROVIDER_REALTIMEDATABASE:
            return firebase.database();
        default:
            throw new Error('No provider found!');
    }
}

/**
 * @description
 * Get the seasons reference on Realtime Database
 */
export const getSeasons = () => getDatabase(DATABASE_PROVIDER_REALTIMEDATABASE).ref("seasons");

/**
 * @description
 * Get the season matchs of premier league fetching reference on Realtime Database by @param season 
 */
export const getSeason = (season) => getSeasons().child(season);

/**
 * @description
 * Fetch the teams with the season
 * 
 * @param {String} season - Premier league season 
 * @returns firestore collection of teams
 */
export const getTeams = (season: String) => getDatabase(DATABASE_PROVIDER_FIRESTORE).collection("teams");