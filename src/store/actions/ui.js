import * as actions from './types';

export const addAlertMessage = (alertMessage) => ({ type: actions.ADD_ALERT_MESSAGE, alertMessage });
export const removeAlertMessage = (alertMessageId) => ({ type: actions.REMOVE_ALERT_MESSAGE, alertMessageId });