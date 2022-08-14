import * as actions from '../actions/types';

const initialState = {
    alertMessages: []
}

const template = [
    {
        id: 'alert1',
        title: "Success",
        message: 'Successfully deleted the item!',
        severity: 'success',
        expiryTime: 2000
    }
    ,
    {
        id: 'alert2',
        title: "Success",
        message: 'Successfully deleted the item!',
        severity: 'success',
        expiryTime: 2000
    }

];

const addAlertMessage = (state, alertMessage) => {
    const newAlertMessage = [...state.alertMessages, alertMessage];
    return {...state, alertMessages: newAlertMessage};
}

const removeAlertMessage = (state, alertMessageId) => {
    
    const filteredMessages = state.alertMessages.filter(
        alertMessage =>  alertMessage.id !== alertMessageId 
    );

    return {...state, alertMessages: filteredMessages };
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actions.ADD_ALERT_MESSAGE: return addAlertMessage(state, action.alertMessage);
        case actions.REMOVE_ALERT_MESSAGE: return removeAlertMessage(state, action.alertMessageId);
        default: return state;
    }
}

export default reducer;