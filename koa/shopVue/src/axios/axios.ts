import axios from "axios";

const requestAxios = axios.create({
    baseURL: 'http://127.0.0.1:3000/api/',
    timeout: 5000,
})

export default requestAxios;