import { useEffect, useState } from "react";

function MovieDetails({ movie, isOpen, onClose }) {
  const [additionalDetails, setAdditionalDetails] = useState(null);

  useEffect(() => {
    if (movie?.id) {
      const controller = new AbortController();
      const fetchDetails = async () => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=e9dd24e2bf78552b70d8f919a706b0bf&append_to_response=credits`,
            { signal: controller.signal }
          );
          const data = await response.json();
          setAdditionalDetails(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("Failed to fetch movie details:", err);
          }
        }
      };

      fetchDetails();
      return () => controller.abort();
    }
  }, [movie]);

  if (!isOpen || !movie) return null;
  if (!additionalDetails)
    return <div className="text-white text-center p-6">Loading...</div>;

  const filteredCast =
    additionalDetails.credits?.cast?.filter(
      (actor) => actor.character !== "X-23"
    ) || [];

  const genres = additionalDetails.genres || [];
  const countries = additionalDetails.production_countries || [];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50 text-sm md:text-base">
      <div className="bg-gray-100 p-4 md:p-8 rounded-lg shadow-lg max-w-lg w-full flex flex-col max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>

        <h2 className="text-2xl font-semibold mb-5">{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-32 mb-4 rounded-lg self-center"
        />
        <p className="mb-4">{movie.overview}</p>

        <div className="space-y-2">
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          {genres.length > 0 && (
            <p>
              <strong>Genre:</strong>{" "}
              {genres.map((genre, index) => (
                <span key={genre.id}>
                  {genre.name}
                  {index < genres.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}

          {countries.length > 0 && (
            <p>
              <strong>Country:</strong>{" "}
              {countries.map((country, index) => (
                <span key={index}>
                  {country.name}
                  {index < countries.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}

          <p>
            <strong>IMDb:</strong> {additionalDetails.vote_average || "N/A"}
          </p>

          <p>
            <strong>Cast:</strong>{" "}
            {filteredCast.length > 0
              ? filteredCast.slice(0, 5).map((actor, index) => (
                  <span key={actor.id}>
                    {actor.name} as {actor.character}
                    {index < Math.min(4, filteredCast.length - 1) && ", "}
                  </span>
                ))
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
