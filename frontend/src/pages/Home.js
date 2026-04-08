import React, { useEffect, useState } from "react";
import { searchMovies, getTrending, getRecommendations } from "../Api";
import { useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const [trending, setTrending] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recommended, setRecommended] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadTrending();
  }, []);

  // ================= LOAD TRENDING =================
  const loadTrending = async () => {
    try {
      const res = await getTrending();
      setTrending(res.data || []);
    } catch {
      setTrending([]);
    }
  };

  // ================= SEARCH =================
  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await searchMovies(query);
      setSearchResults(res.data || []);
      setRecommended([]);
    } catch {
      setSearchResults([]);
    }
  };

  // ================= RECOMMEND =================
  const handleRecommend = async () => {
    if (!query.trim()) return;

    try {
      const res = await getRecommendations(query);
      setRecommended(res.data || []);
      setSearchResults([]);
    } catch {
      setRecommended([]);
    }
  };

  // ================= GENRE MAP =================
  const genreMap = {
    28: "🔥 Action",
    35: "😂 Comedy",
    27: "😱 Horror",
    10749: "❤️ Romance",
    878: "🚀 Sci-Fi",
    18: "🎭 Drama"
  };

  // ================= GROUP MOVIES =================
  const grouped = {};
  trending.forEach((movie) => {
    movie.genre_ids?.forEach((id) => {
      if (genreMap[id]) {
        if (!grouped[id]) grouped[id] = [];
        if (!grouped[id].some((m) => m.id === movie.id)) {
          grouped[id].push(movie);
        }
      }
    });
  });

  // ================= MOVIE ROW =================
  const MovieRow = ({ title, data }) => (
    <div style={{ marginBottom: "30px" }}>
      <h2>{title}</h2>

      <div
        style={{
          display: "flex",
          overflowX: "scroll",
          gap: "15px",
          padding: "10px 0"
        }}
      >
        {data
          .filter((m) => m.poster_path)
          .map((m) => (
            <div
              key={m.id}
              style={{ minWidth: "150px", cursor: "pointer" }}
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
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.1)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
              <p style={{ fontSize: "13px" }}>
                {m.title || m.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "#0e1117",
        color: "white",
        padding: "20px",
        minHeight: "100vh"
      }}
    >
      {/* ✅ HEADER WITH WATCHLIST BUTTON */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h1>🎬 MovieMind Pro</h1>

        <button
          onClick={() => navigate("/watchlist")}
          style={{
            padding: "8px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            background: "#1f2937",
            color: "white",
            border: "none",
            fontWeight: "bold"
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "#374151")
          }
          onMouseOut={(e) =>
            (e.target.style.background = "#1f2937")
          }
        >
          ⭐ Watchlist
        </button>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "none"
          }}
        />

        <button onClick={handleSearch} style={{ marginRight: "10px" }}>
          Search
        </button>

        <button onClick={handleRecommend}>
          Recommend
        </button>
      </div>

      {/* 🔍 SEARCH RESULTS */}
      {searchResults.length > 0 && (
        <MovieRow title="🔍 Search Results" data={searchResults} />
      )}

      {/* 🎯 RECOMMENDED */}
      {recommended.length > 0 && (
        <MovieRow title="🎯 Recommended for You" data={recommended} />
      )}

      {/* 🎬 GENRE ROWS */}
      {Object.keys(grouped).map((genreId) => (
        <MovieRow
          key={genreId}
          title={genreMap[genreId]}
          data={grouped[genreId]}
        />
      ))}
    </div>
  );
}

export default Home;