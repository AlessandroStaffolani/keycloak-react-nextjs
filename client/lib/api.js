import Axios from "axios";

let urls = {
  test: `http://localhost:3000/api/`,
  development: 'http://localhost:3000/api/',
  production: 'http://localhost:3000/api/'
}

const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export const addBearerToken = (token) => {
  api.defaults.headers.Authorization = `Bearer ${token}`
}
export const removeBearerToken = () => {
  delete api.defaults.headers.Authorization;
}

export default api;
