export const SET_CATEGORIES_AND_PRODUCTS = 'SET_CATEGORIES_AND_PRODUCTS';
export const RESET_CATEGORIES_AND_PRODUCTS = 'RESET_CATEGORIES_AND_PRODUCTS';

export const setCategoriesAndProducts = (json) => (dispatch) => {
  dispatch({
    type: SET_CATEGORIES_AND_PRODUCTS,
    payload: json,
  });
};

export const resetCategoriesAndProducts = () => (dispatch) => {
  dispatch({
    type: RESET_CATEGORIES_AND_PRODUCTS,
    payload: [],
  });
};
