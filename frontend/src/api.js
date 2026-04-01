import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"  
});

export const searchMovies = (query) => API.get(`/search?query=${query}`);
export const getTrending = () => API.get("/trending");
export const getRecommendations = (query) => API.get(`/recommend?query=${query}`);