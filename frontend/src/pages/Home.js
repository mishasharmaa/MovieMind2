import React, { useEffect, useState } from "react";
import { searchMovies, getTrending, getRecommendations } from "../api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadTrending();
  }, []);

  // ================= LOAD TRENDING =================
  const loadTrending = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getTrending();
      setMovies(res.data || []);
    } catch {
      setMovies([]);
      setError("Failed to load trending movies.");
    }

    setLoading(false);
  };

  // ================= SEARCH =================
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await searchMovies(query);
      setMovies(res.data || []);
    } catch {
      setMovies([]);
      setError("Search failed. Try again.");
    }

    setLoading(false);
  };

  // ================= RECOMMEND =================
  const handleRecommend = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await getRecommendations(query);
      setMovies(res.data || []);
    } catch {
      setMovies([]);
      setError("Recommendation failed.");
    }

    setLoading(false);
  };

  // ================= ENTER KEY SUPPORT =================
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ background: "#0e1117", color: "white", padding: "20px", minHeight: "100vh" }}>
      <h1>🎬 MovieMind Pro</h1>

      {/* ================= INPUT ================= */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search movies or TV shows..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            marginRight: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            width: "250px"
          }}
        />

        <button
          onClick={handleSearch}
          disabled={loading}
          style={{ marginRight: "10px", padding: "10px" }}
        >
          Search
        </button>

        <button
          onClick={handleRecommend}
          disabled={loading}
          style={{ padding: "10px" }}
        >
          Recommend
        </button>
      </div>

      {/* ================= STATUS ================= */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* ================= MOVIE GRID ================= */}
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
              onClick={() => navigate(`/movie/${m.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${m.poster_path}`}
                alt=""
                style={{
                  borderRadius: "10px",
                  width: "100%",
                  transition: "0.3s"
                }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
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