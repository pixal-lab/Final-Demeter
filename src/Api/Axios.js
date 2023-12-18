import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://final-demeter-b-production.up.railway.app/',
    withCredentials: true
})
// pixal estuvo aqui
export default instance