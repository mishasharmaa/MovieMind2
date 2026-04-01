import React, { useEffect, useState } from "react";
import { searchMovies, getTrending, getRecommendations } from "../api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    const res = await getTrending();
    setMovies(res.data);
  };

  const handleSearch = async () => {
    const res = await searchMovies(query);
    setMovies(res.data);
  };

  const handleRecommend = async () => {
    const res = await getRecommendations(query);
    setMovies(res.data);
  };

  return (
    <div style={{ background: "#0e1117", color: "white", padding: "20px" }}>
      <h1>🎬 MovieMind Pro</h1>

      <input
        placeholder="Search movies or TV shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      <button onClick={handleSearch} style={{ marginRight: "10px" }}>
        Search
      </button>

      <button onClick={handleRecommend}>Recommend</button>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {movies
          .filter((m) => m.poster_path)
          .map((m) => (
            <div
              key={m.id}
              style={{
                margin: "10px",
                width: "150px",
                textAlign: "center",
                cursor: "pointer"
              }}
              onClick={() => navigate(`/movie/${m.id}`)} // ✅ CLICKABLE
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                alt=""
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  transition: "0.3s"
                }}
              />

              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                {m.title || m.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;