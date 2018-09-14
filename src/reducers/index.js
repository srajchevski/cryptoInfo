import { combineReducers } from "redux";
import currencies from "./currenciesReducer";
import error from "./errorReducer";

export default combineReducers({
  currencies,
  error
});
