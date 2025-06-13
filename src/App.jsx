import React, { useState } from "react";
import MovieCard from "./Components/MovieCard";
import MovieDetails from "./Components/MovieDetails";


const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState("");


  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e9dd24e2bf78552b70d8f919a706b0bf&query=${query}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        setMovieList(data.results);
        setError(""); 
      } else {
        setMovieList([]);
        setError("No movies found.");
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setError("Error fetching movie data.");
    }
  };
  return (
    <div>
      <div className="bg-black">
        <MovieCard />
        <MovieDetails />
      </div>
    </div>
  );
};

export default App;
