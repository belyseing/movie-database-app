import axios from "axios";

const API_KEY = "e9dd24e2bf78552b70d8f919a706b0bf";
const BASE_URL = "https://api.themoviedb.org/3/movie/popular?";

export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?s=${query}&apikey=${API_KEY}`
    );
    return response.data.Search; // Returns array of movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}?i=${id}&apikey=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
