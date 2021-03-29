import React, { useState, createContext, useEffect, useReducer } from "react";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const UserContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return action.payload;
    case "LOGIN_FAILED":
      document.cookie = "connect.sid = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      return undefined;

    case "LOGOUT":
      axios.delete(`${REACT_APP_API_ENDPOINT}/user`, { withCredentials: true });
      document.cookie = "connect.sid = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      return undefined;
    default:
      return state;
  }
}

export const UserProvider = (props) => {
  const [user, dispatch] = useReducer(reducer, undefined);
  useEffect(() => {
    if (document.cookie.split("; ").find((row) => row.startsWith("connect.sid="))) {
      axios
        .get(`${REACT_APP_API_ENDPOINT}/user`, { withCredentials: true })
        .then((res) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: "LOGIN_FAILED" });
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("code")) {
      axios
        .get(`${REACT_APP_API_ENDPOINT}/auth/${urlParams.get("code")}`, { withCredentials: true })
        .then((res) => {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        })
        .catch((err) => {
          dispatch({ type: "LOGIN_FAILED" });
        });
    }
    console.log(user);
  }, []);

  return <UserContext.Provider value={[user, dispatch]}>{props.children}</UserContext.Provider>;
};
