import axios from 'axios';

const instance = axios.create({
    baseURL:'http://35.154.188.137/api/v1'
});

export default instance;
