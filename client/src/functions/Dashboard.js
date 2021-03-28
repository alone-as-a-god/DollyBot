import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

export const getServers = () => {
  axios
    .get(`${REACT_APP_API_ENDPOINT}/guilds`, { withCredentials: true })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
