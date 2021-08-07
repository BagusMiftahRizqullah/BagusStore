const initialState = {
  UserCart: [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART':
      return {
        ...state,
        UserCart: action.payload,
      };

    case 'DELL_CART':
      return {
        ...state,
        UserCart: '',
      };

    default:
      return state;
  }
};

export default CartReducer;
