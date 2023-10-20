import axios from "axios";
const baseUrl = "/api/users";

export const getAll = () => {
  return axios.get(baseUrl).then((res) => {
    return res.data;
  });
};
