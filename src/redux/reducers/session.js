import { SET_USER_UUID } from '@src/redux/actions/session';
import { SET_EXPO_TOKEN } from '@src/redux/actions/session';
import { SET_ORGANIZATION } from '@src/redux/actions/session';
import { SET_ORDERS } from '@src/redux/actions/session';
import { RESET_UUID } from '@src/redux/actions/session';

const initialState = {
  uuid: '',
  expo_token: '',
  organization: {},
  orders: {},
};

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_UUID:
      return { ...state, uuid: action.payload };
    case SET_EXPO_TOKEN:
      return { ...state, expo_token: action.payload };
    case SET_ORGANIZATION:
      return { ...state, organization: action.payload };
    case SET_ORDERS:
      return { ...state, orders: action.payload };
    case RESET_UUID:
      return { ...state, uuid: action.payload };
    default:
      return state;
  }
}

export default sessionReducer;
