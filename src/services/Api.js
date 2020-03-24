import axios from 'axios';

const API = "https://us-central1-premier-league-sky-test.cloudfunctions.net";

export default class Api {

    constructor() {
        this.id = -1;
        this.type = '';
    };

    setId = (id) => {
        this.id = id;
        return this;
    };

    setType = (type) => {
        this.type = type;
        return this;
    };

    getId = () => this.id;

    getType = () => this.type;

    toString = () => {
        if (this.getType().trim() === '') {
            throw new Error('Type is required to complete the request!');
        }

        let url = API + '/' + this.getType();

        if (this.getId() !== -1) {
            url += '/' + this.getId();
        }

        return url;
    };

    request = (url = null) => new Promise((resolve, reject) => {
        const requestUrl = url || this.toString();
        axios.get(requestUrl)
            .then((response) => response.data)
            .then((response) => resolve(response.data))
            .catch(reject);
    });
}