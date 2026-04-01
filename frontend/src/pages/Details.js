import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const res = await axios.get(`http://127.0.0.1:8000/movie/${id}`);
    setMovie(res.data);
  };

  if (!movie) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div style={{ background: "#0e1117", color: "white", padding: "20px" }}>
      <h1>{movie.title || movie.name}</h1>

      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt=""
        />
      )}

      <p>⭐ Rating: {movie.vote_average}</p>
      <p>📅 Release: {movie.release_date}</p>
      <p>{movie.overview}</p>
    </div>
  );
}

export default Details;