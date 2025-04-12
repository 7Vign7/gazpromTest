import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:23456/api',
    timeout: 5000
});

export default {
    get(path) {
        return api.get(path);
    }
};