import { errorResponse, successResponse } from '../utils';
import { firestore } from 'firebase-admin';
const express = require('express');
const cors = require('cors');
const api = express();

api.use(cors({ origin: true }));
api.get(
    '/',
    async (request: any, response: any) => {
        try {
            const teamsFirestore = await firestore().collection("teams").get();
            const teamsData = teamsFirestore.docs.map((team: firestore.QueryDocumentSnapshot) => team.data());
            const teams = teamsData
                .sort((a: any, b: any) => a['id'] - b['id'])
                .map((team: any) => team.name);
            return response.send(successResponse(teams));
        } catch (error) {
            return response.send(errorResponse(error.message));
        }
    }
);

api.get(
    '/:id',
    async (request: any, response: any) => {
        try {
            const { id } = request.params;
            console.log('Team ID -> ', id);
            const teams = await firestore().collection("teams").get();
            const teamsData = teams.docs.filter((value: firestore.QueryDocumentSnapshot) => parseInt(value.data().id) === parseInt(id));
            console.log('Team data', teamsData);
            let team = undefined;
            if (teamsData.length > 0) {
                team = teamsData[0];
            }

            return response.send(successResponse(team?.data()));
        } catch (error) {
            return response.send(errorResponse(error.message));
        }
    }
);

export default api;