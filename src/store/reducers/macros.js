import * as actions from '../actions/types';

const initialState = {
    macros: null,
    error: null,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.SET_MACROS: return { ...state, macros: action.macros };
        case actions.FETCH_MACROS_FAILED: return { ...state, error: action.error };
        default: return state;
    }
}

export default reducer;