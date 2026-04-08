import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchMovie();
    fetchProviders();
  }, [id]);

  // ================= FETCH MOVIE =================
  const fetchMovie = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/movie/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error("Error fetching movie:", err);
    }
  };

  // ================= FETCH WATCH PROVIDERS =================
  const fetchProviders = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/watch/${id}`);
      setProviders(res.data?.flatrate || []);
    } catch {
      setProviders([]);
    }
  };

  // ================= WATCHLIST =================
  const addToWatchlist = () => {
  if (!movie) return;

  const saved = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (!saved.find((m) => m.id === movie.id)) {
    saved.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(saved));
    alert("⭐ Added to watchlist!");
  }
};

  if (!movie) return <p style={{ color: "white" }}>Loading...</p>;

  const cast = movie.credits?.cast?.slice(0, 5) || [];

  return (
    <div
      style={{
        background: "#0e1117",
        color: "white",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      <h1>{movie.title}</h1>

      {/* ================= MAIN LAYOUT ================= */}
      <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
        
        {/* POSTER */}
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt=""
          style={{ borderRadius: "10px" }}
        />

        {/* DETAILS */}
        <div>
          <p>⭐ Rating: {movie.vote_average}</p>
          <p>📅 Release: {movie.release_date}</p>

          <p style={{ maxWidth: "500px" }}>{movie.overview}</p>

          {/* WATCHLIST BUTTON */}
          <button
            onClick={addToWatchlist}
            style={{
              marginTop: "10px",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            ⭐ Add to Watchlist
          </button>

          <button
            onClick={() => navigate("/watchlist")}
            style={{
              marginLeft: "10px",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            📂 View Watchlist
          </button>

          {/* ================= WATCH PROVIDERS ================= */}
          <h3 style={{ marginTop: "20px" }}>📺 Where to Watch</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            {providers.length > 0 ? (
              providers.map((p) => (
                <img
                  key={p.provider_id}
                  src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                  alt={p.provider_name}
                  title={p.provider_name}
                />
              ))
            ) : (
              <p>No streaming info available</p>
            )}
          </div>
        </div>
      </div>

      {/* ================= CAST ================= */}
      <h3 style={{ marginTop: "30px" }}>🎭 Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetails;