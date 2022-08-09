import * as actions from '../actions/types';

const initialState = {
    token: null,
    userId: null,
    //isLoading: true,
    error: false,
    isAppReady: false,
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.AUTH_START: return {...state, error: false}
        case actions.AUTH_SIGNIN: return {...state, token: action.token, userId: action.userId, error: false, isAppReady: true};
        case actions.AUTH_FAILED: return {...state, error: action.error, isAppReady: true};
        case actions.AUTH_LOGOUT: return {...state, token: null, userId: null, isAppReady:true};
        default: return state;
    }
};

export default reducer;