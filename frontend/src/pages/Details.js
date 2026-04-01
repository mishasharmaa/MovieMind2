import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/movie/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error("Error fetching movie:", err);
    }
  };

  if (!movie) return <p style={{ color: "white" }}>Loading...</p>;

  const cast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div style={{ background: "#0e1117", color: "white", padding: "20px" }}>
      <h1>{movie.title}</h1>

      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt=""
        style={{ borderRadius: "10px" }}
      />

      <p>⭐ Rating: {movie.vote_average}</p>
      <p>📅 Release: {movie.release_date}</p>

      <p style={{ maxWidth: "600px" }}>{movie.overview}</p>

      <h3>🎭 Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;