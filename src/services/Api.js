import axios from 'axios';
import https from 'https'

const API = "http://acor.sl.pt:7777";

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
        if (this.getType().trim() == '') {
            throw new Error('Type is required to complete the request!');
        }

        let url = API + '/' + this.getType();

        if (this.getId() != -1) {
            url += '/' + this.getId();
        }

        return url;
    };

    request = (url = null) => new Promise((resolve, reject) => {

        /** 
         * Need to create this agent
         * By default axios accept only HTTPS
         * */
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const requestUrl = url || this.toString();
        axios.get(requestUrl, { httpsAgent: agent })
            .then((response) => resolve(response.data))
            .catch(reject);
    });
}