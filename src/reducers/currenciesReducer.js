import { GET_CURRENCIES } from "../constants";

const currenciesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CURRENCIES:
      return action.payload;
    default:
      return state;
  }
};

export default currenciesReducer;
