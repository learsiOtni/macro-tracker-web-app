import * as actions from './types';
import axios from '../../axios/axios-foods';

export const setFav = (favList) => ({type: actions.SET_FAV, favList});
export const fetchFavFailed = (error) => ({type: actions.FETCH_FAV_FAILED, error});

export const initFav = (userId, token) => {
    return dispatch => {
        axios.get(`users/${userId}/favs.json?auth=${token}`)
            .then( response => {

                let tempObject = {};

                Object.entries(response.data).forEach( ([foodId, props]) => {
                    tempObject = {...tempObject, [foodId]: props.isFav}
                });
                dispatch(setFav(tempObject));
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
                let newValue = false;

                if (response.data) newValue = !response.data.isFav;
                if (!response.data) newValue = true;

                axios.put(`users/${userId}/favs/${favId}.json?auth=${token}`, {'isFav': newValue})
                    .then(response => {
                        console.log(response);
                        if (newValue) dispatch(addFav(favId));
                        else dispatch(removeFav(favId));
                    })
            })
            .catch(error => {
                console.log(error);
            });

        
    };
};
