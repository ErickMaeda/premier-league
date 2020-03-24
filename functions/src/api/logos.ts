import { errorResponse } from '../utils';
import { firestore } from 'firebase-admin';
const express = require('express');
const cors = require('cors');
const api = express();

api.use(cors({ origin: true }));
api.get(
    '/:id',
    async (request: any, response: any) => {
        try {
            const { id } = request.params;
            const teams = await firestore().collection("teams").get();
            const teamsData = teams.docs.filter((value: firestore.QueryDocumentSnapshot) => {
                return parseInt(value.data().id) === parseInt(id)
            });
            let teamLogo = "https://img1.gratispng.com/20180601/kql/kisspng-premier-league-england-national-football-team-live-5b10ebe57c3ff1.8294081915278356215089.jpg";
            if (teamsData.length > 0) {
                teamLogo = response.redirect(teamsData[0].data().logo);
            }
            return response.redirect(teamLogo);
        } catch (error) {
            return response.send(errorResponse(error.message));
        }
    }
);

export default api;