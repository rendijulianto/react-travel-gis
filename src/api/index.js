//import axios
import axios from 'axios';

//import js cookie
import Cookie from 'js-cookie';


const Api = axios.create({
    baseURL: process.env.REACT_APP_BASEURL, headers: {
        "Accept": "application/json", "Content-Type": "application/json",
    }
});

//Handle unauthorized
Api.interceptors.response.use(function (response) {
    return response;
}, ((error) => {
    if (401 === error.response.status) {
        //remove token
        Cookie.remove('token');
        //redirect "admin/login"
        window.location = '/admin/login';
    } else {
        //Reject Promise Error
        return Promise.reject(error);
    }
}));

export default Api;