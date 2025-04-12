import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:23456/api',
    timeout: 5000
});

export default {
    getGroups() {
        return api.get('/groups');
    },
    getMetrics() {
        return api.get('/metrics');
    }
};