import { SET_CATEGORIES_AND_PRODUCTS } from '@src/redux/actions/user';
import { RESET_CATEGORIES_AND_PRODUCTS } from '@src/redux/actions/user';

const initialState = {
  organization:{},
  categories_and_products: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES_AND_PRODUCTS:
      return { ...state, categories_and_products: action.payload };
    case RESET_CATEGORIES_AND_PRODUCTS:
      return { ...state, categories_and_products: action.payload };
    default:
      return state;
  }
}

export default userReducer;