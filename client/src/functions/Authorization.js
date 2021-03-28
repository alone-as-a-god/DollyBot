import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const auth = (setUser) => {
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
};

export const logout = (deleteUser) => {
  axios.delete(`${REACT_APP_API_ENDPOINT}/user`, { withCredentials: true });
  deleteUser();
  document.cookie = "connect.sid = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
};
