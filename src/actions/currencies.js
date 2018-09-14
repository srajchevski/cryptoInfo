import { GET_CURRENCIES, ERROR } from "../constants";
import axios from "axios";

const API_URL = "https://api.coinmarketcap.com/v2/ticker/";

export const getCurrencies = (qry = {}) => dispatch => {
  //   dispatch({ type: LOADING, payload: true });

  let query = "";
  Object.keys(qry).forEach(key => {
    query += key + "=" + qry[key] + "&";
  });
  axios
    .get(`${API_URL}?structure=array&${query}`)
    .then(response => {
      if (response.status === 200) {
        return dispatch({ type: GET_CURRENCIES, payload: response.data.data });
      }

      return dispatch({ type: ERROR });
    })
    .catch(() => {
      return dispatch({ type: ERROR });
    });
};
