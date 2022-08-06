import * as actions from './types';
import axios from '../../axios/axios-auth';
import axiosData from '../../axios/axios-foods';

const API_KEY = 'AIzaSyCDP1SUs3U_JlHNMdrePP52qoTJgU2mRmY';

export const authRestore = (token, userId) => ({ type: actions.AUTH_RESTORE, token, userId});
export const authSignin = (token, userId) => ({ type: actions.AUTH_SIGNIN, token, userId});
export const authFailed = (error) => ({ type: actions.AUTH_FAILED, error});
export const authStart = () => ({type: actions.AUTH_START});

export const authLogout = () => {
    localStorage.removeItem('expDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    return { type: actions.AUTH_LOGOUT }
};

// Sign in / sign up
export const auth = (email, password, signupData = null) => {
    return dispatch => {
        console.log('here at auth');
        const authData = {email, password, returnSecureToken: true};
        let url = `accounts:signInWithPassword?key=${API_KEY}`;
        if (signupData) url = `accounts:signUp?key=${API_KEY}`;

        console.log(email, password, url);
        
        axios.post(url, authData)
            .then( response => {
                const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                const userId = response.data.localId, token = response.data.idToken;
                localStorage.setItem('expDate', expDate);
                localStorage.setItem('userId', userId);
                localStorage.setItem('token', token);
                dispatch(authSignin(token, userId));
                dispatch(checkAuthTimeout(response.data.expiresIn));

                signupData && axiosData.put(`users/${userId}.json`, signupData)
                    .then( response => {
                        alert('user info added to db');
                    })
                    .catch( error => {
                        console.log(error);
                    });
            })
            .catch( error => {
                dispatch(authFailed(error.response.data.error));
            })
    ;}
};

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(authLogout());
        }, expTime * 1000);
    };
};

//initAuth
export const initAuth = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expDate = new Date(localStorage.getItem('expDate'));
            if (expDate <= new Date()) dispatch(authLogout());
            else {
                const userId = localStorage.getItem('userId');
                dispatch(authSignin(token, userId));
                dispatch(checkAuthTimeout( 
                    (expDate.getTime() - new Date().getTime()) / 1000 
                ));
            };
        };
    };
};

