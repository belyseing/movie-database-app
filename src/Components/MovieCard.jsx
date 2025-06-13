import { useState, useEffect } from "react";
import MovieDetails from "./MovieDetails";
import SearchBar from "./SearchBar";

function MovieCard() {
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (query) => {
    if (query.trim()) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e9dd24e2bf78552b70d8f919a706b0bf&query=${query}`
      )
        .then((resp) => resp.json())
        .then((json) => setMovieList(json.results))
        .catch((error) => console.error("Error fetching movie data:", error));
    }
  };

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=e9dd24e2bf78552b70d8f919a706b0bf"
    )
      .then((resp) => resp.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

 
  const openMovieDetails = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };


  const closeMovieDetails = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="bg-black p-4 rounded-lg shadow-md"
            onClick={() => openMovieDetails(movie)}
          >
            {/* Movie Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-4 rounded-lg"
            />
            {/* Movie Title */}
            <h3 className="text-lg font-semibold mb-2 text-white">
              {movie.title}
            </h3>
            {/* Release Date */}
            <p className="text-gray-300">
              Year: {new Date(movie.release_date).getFullYear()}
            </p>
          </div>
        ))}
      </div>
      {/* MovieDetails Modal */}
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={closeMovieDetails}
        />
      )}
    </>
  );
}

export default MovieCard;
