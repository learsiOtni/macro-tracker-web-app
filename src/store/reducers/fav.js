import * as actions from '../actions/types';

const initialState = {
    favs: {},
    error: null,
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actions.SET_FAV: return { ...state, favs: action.favList };
        case actions.FETCH_FAV_FAILED: return { ...state, error: action.error };
        case actions.ADD_FAV: return { ...state, favs: { ...state.favs, [action.fav]: true } };
        case actions.REMOVE_FAV: return { ...state, favs: { ...state.favs, [action.fav]: false } };
        default: return state;
    };
};

export default reducer;