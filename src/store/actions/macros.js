import * as actions from './types';
import axios from '../../axios/axios-foods';
import { addAlertMessage } from './ui';

export const setMacros = (macros) => ({ type: actions.SET_MACROS, macros });
export const fetchMacrosFailed = (error) => ({ type: actions.FETCH_MACROS_FAILED, error });

export const updateMacros = (userId, token, macros) => {
    return dispatch => {
        axios.put(`/users/${userId}/macros.json?auth=${token}`, macros)
            .then( response => {
                dispatch(setMacros(macros));
                dispatch(addAlertMessage({
                    id: `MacrosUpdated`,
                    title: "Success",
                    message: `Successfully updated your Macros Goals!`,
                    severity: 'success',
                    expiryTime: 2000
                }));
            })
            .catch( error => {
                dispatch(addAlertMessage({
                    id: `MacrosUpdateFail`,
                    title: "Failed Update",
                    message: {error},
                    severity: 'error',
                    expiryTime: 2000
                }))
            });
    };
};

export const initMacros = (userId, token) => {
    return dispatch => {
        axios.get(`/users/${userId}/macros.json?auth=${token}`)
            .then(response => {
                if (response.data) dispatch(setMacros(response.data));
                else dispatch(setMacros({ calories: 0, protein: 0, carbs: 0, fat: 0 }));
            })
            .catch(error => {
                dispatch(fetchMacrosFailed(error));
            });
    };
};
