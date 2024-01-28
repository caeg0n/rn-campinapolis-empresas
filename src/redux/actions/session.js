export const SET_USER_UUID = 'SET_USER_UUID';
export const SET_EXPO_TOKEN = 'SET_EXPO_TOKEN';
export const SET_ORGANIZATION = 'SET_ORGANIZATION';
export const RESET_UUID = 'RESET_UUID';

export const setUUID = (uuid) => (dispatch) => {
  dispatch({
    type: SET_USER_UUID,
    payload: uuid,
  });
};

export const setExpoToken = (token) => (dispatch) => {
  dispatch({
    type: SET_EXPO_TOKEN,
    payload: token,
  });
};

export const setOrganization = (organization) => (dispatch) => {
  dispatch({
    type: SET_ORGANIZATION,
    payload: organization,
  });
};

export const resetUUID = () => (dispatch) => {
  dispatch({
    type: RESET_UUID,
    payload: '',
  });
};