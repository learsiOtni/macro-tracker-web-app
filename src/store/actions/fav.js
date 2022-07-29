import * as actions from './types';
import axios from '../../axios/axios-foods';

export const setFav = (favList) => ({type: actions.SET_FAV, favList});
export const fetchFavFailed = (error) => ({type: actions.FETCH_FAV_FAILED, error});

export const initFav = (userId, token) => {
    return dispatch => {
        axios.get(`users/${userId}/favs.json?auth=${token}`)
            .then( response => {
                dispatch(setFav(response.data))
            })
            .catch( error => dispatch(fetchFavFailed(error)) );
    };
};

export const addFav = (fav) => ({type: actions.ADD_FAV, fav});
export const removeFav = (fav) => ({type: actions.REMOVE_FAV, fav});

export const addRemoveFav = (userId, token, favId) => {
    return dispatch => {

        axios.get(`users/${userId}/favs/${favId}.json?auth=${token}`)
            .then(response => {
                let value = !response.data;

                axios.put(`users/${userId}/favs/${favId}.json?auth=${token}`, value)
                    .then(response => {
                        console.log(response);
                        if (value) dispatch(addFav(favId));
                        else dispatch(removeFav(favId));
                    })
            })
            .catch(error => {
                console.log(error);
            });

        
    };
};
