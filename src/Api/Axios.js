import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://final-demeter-b-production.up.railway.app/',
    withCredentials: true
})

export default instance