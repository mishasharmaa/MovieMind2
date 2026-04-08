import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;