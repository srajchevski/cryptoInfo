import { ERROR } from "../constants";

const errorReducer = (state = false, action) => {
  switch (action.type) {
    case ERROR:
      return true;
    default:
      return false;
  }
};

export default errorReducer;
