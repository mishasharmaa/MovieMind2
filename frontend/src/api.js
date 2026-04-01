import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

export const searchMovies = async (query) => {
  if (!query) return { data: [] };
  return API.get(`/search?query=${query}`);
};

export const getTrending = () => API.get("/trending");

export const getRecommendations = async (query) => {
  if (!query) return { data: [] };
  return API.get(`/recommend?query=${query}`);
};