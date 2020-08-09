import api from "./api";

export const axiosFetcher = url => api.get(url).then(res => res.data)
