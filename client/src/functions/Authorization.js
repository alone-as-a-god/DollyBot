import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;
export const auth = (setUser) => {
  if (document.cookie.split("; ").find((row) => row.startsWith("connect.sid="))) {
    const getUserData = async () => {
      const res = await axios.get(`${REACT_APP_API_ENDPOINT}/auth/user`, { withCredentials: true });
      console.log(res.data);
      setUser({
        id: res.data.id,
        username: res.data.username,
        avatar: res.data.avatar,
      });
    };
    getUserData();
  }
  const urlParams = new URLSearchParams(window.location.search);
  if (!urlParams.has("code")) return;

  const getUserData = async () => {
    const res = await axios.get(`${REACT_APP_API_ENDPOINT}/auth/${urlParams.get("code")}`, { withCredentials: true });
    setUser({
      id: res.data.id,
      username: res.data.username,
      avatar: res.data.avatar,
    });
    console.log(res);
  };
  getUserData();
};

export const logout = (deleteUser) => {
  const deleteSession = async () => {
    const res = await axios.get(`${REACT_APP_API_ENDPOINT}/auth/delete`, { withCredentials: true });
  };
  deleteSession();
  // document.cookie = "connect.sid = ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  deleteUser();
};
