export const SET_USER_UUID = 'SET_USER_UUID';
export const RESET_UUID = 'RESET_UUID';

export const setUUID = (uuid) => (dispatch) => {
  dispatch({
    type: SET_USER_UUID,
    payload: uuid,
  });
};

export const resetUUID = () => (dispatch) => {
  dispatch({
    type: RESET_UUID,
    payload: '',
  });
};