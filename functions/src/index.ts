import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import teams from './api/teams';
import logos from './api/logos';
import weeks from './api/weeks';

admin.initializeApp();

exports.teams = functions.https.onRequest(teams);
exports.logos = functions.https.onRequest(logos);
exports.weeks = functions.https.onRequest(weeks);
