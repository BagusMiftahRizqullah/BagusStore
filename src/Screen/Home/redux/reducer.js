const initialState = {
  data: {},
};

const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HOME':
      return {
        ...state,
      };

    case 'GET_HOME_SUCCEES':
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default HomeReducer;
