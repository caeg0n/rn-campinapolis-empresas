import { SET_USER_UUID } from '@src/redux/actions/session';
import { RESET_UUID } from '@src/redux/actions/session';

const initialState = {
  uuid: '',
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_UUID:
      return { ...state, uuid: action.payload };
    case RESET_UUID:
      return { ...state, uuid: action.payload };
    default:
      return state;
  }
}

export default sessionReducer;
