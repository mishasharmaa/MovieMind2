import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchlist")) || [];
    setMovies(saved);
  }, []);

  return (
    <div style={{ background: "#0e1117", color: "white", padding: "20px" }}>
      <h1>⭐ My Watchlist</h1>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((m) => (
          <div key={m.id} onClick={() => navigate(`/movie/${m.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
              alt={m.title}
            />
            <p>{m.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;