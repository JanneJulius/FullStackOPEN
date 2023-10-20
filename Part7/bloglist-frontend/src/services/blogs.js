import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  return axios.post(baseUrl, newObject, config).then((res) => res.data);
};

export const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  return axios.delete(`${baseUrl}/${id}`, config).then((res) => res.data);
};

export const update = (blog) => {
  return axios.put(`${baseUrl}/${blog.id}`, blog).then((res) => res.data);
};

export const comment = (newComment, blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const newObject = { ...blog };

  return axios
    .post(`${baseUrl}/${blog.id}/comments`, newObject, config)
    .then((res) => res.data);
};
