import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setMovies(saved);
  }, []);

  const removeFromWatchlist = (id) => {
    const updated = movies.filter((m) => m.id !== id);
    setMovies(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        background: "#0e1117",
        color: "white",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      <h1>My Watchlist</h1>

      {movies.length === 0 && <p>No movies saved yet.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "20px",
          marginTop: "20px"
        }}
      >
        {movies.map((m) => (
          <div key={m.id} style={{ cursor: "pointer" }}>
            
            {/* POSTER */}
            <img
              src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
              alt={m.title}
              style={{
                width: "100%",
                borderRadius: "10px"
              }}
              onClick={() => navigate(`/movie/${m.id}`)}
            />

            {/* TITLE */}
            <p style={{ fontSize: "14px", marginTop: "5px" }}>
              {m.title}
            </p>

            {/* REMOVE BUTTON */}
            <button
              onClick={() => removeFromWatchlist(m.id)}
              style={{
                marginTop: "5px",
                padding: "5px",
                fontSize: "12px",
                borderRadius: "5px",
                cursor: "pointer",
                background: "#dc2626",
                color: "white",
                border: "none"
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;