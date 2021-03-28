import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    if (document.cookie.split("; ").find((row) => row.startsWith("connect.sid="))) {
      const getUserData = async () => {
        try {
          const res = await axios.get(`${REACT_APP_API_ENDPOINT}/user`, { withCredentials: true });
          setUser({
            id: res.data.id,
            username: res.data.username,
            avatar: res.data.avatar,
          });
        } catch (err) {
          setUser(undefined);
          document.cookie = "connect.sid = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        }
      };
      getUserData();
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("code")) {
      const getUserData = async () => {
        try {
          const res = await axios.get(`${REACT_APP_API_ENDPOINT}/auth/${urlParams.get("code")}`, { withCredentials: true });
          setUser({
            id: res.data.id,
            username: res.data.username,
            avatar: res.data.avatar,
          });
        } catch (err) {
          setUser();
        }
      };
      getUserData();
      return;
    }
  }, []);

  return <UserContext.Provider value={[user, setUser]}>{props.children}</UserContext.Provider>;
};
