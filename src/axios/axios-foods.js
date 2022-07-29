import axios from 'axios';

const instance = axios.create({
    baseURL: "https://macro-tracker-5e99c.firebaseio.com/",
});

export default instance;