from fastapi import FastAPI
import requests
import os
from dotenv import load_dotenv
from recommender import compute_similarity

load_dotenv()

API_KEY = os.getenv("API_KEY")

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 👈 frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://api.themoviedb.org/3"

# ================= FETCH MOVIES =================
def get_popular():
    url = f"{BASE_URL}/trending/all/week?api_key={API_KEY}"
    res = requests.get(url).json()
    return res.get("results", [])

# ================= SEARCH =================
@app.get("/search")
def search(query: str):
    url = f"{BASE_URL}/search/multi?api_key={API_KEY}&query={query}"
    res = requests.get(url).json()
    return res.get("results", [])

# ================= RECOMMEND =================
@app.get("/recommend")
def recommend(query: str):
    movies = search(query)

    # 🚨 Filter out bad data
    valid_movies = [m for m in movies if m.get("overview")]

    if len(valid_movies) < 2:
        return []

    try:
        similarity = compute_similarity(valid_movies)
    except Exception as e:
        print("ERROR:", e)
        return []

    scores = list(enumerate(similarity[0]))
    scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:10]

    results = []
    for i in scores:
        results.append(valid_movies[i[0]])

    return results

# ================= TRENDING =================
@app.get("/trending")
def trending():
    return get_popular()

# ================= MOVIE DETAILS =================
@app.get("/movie/{movie_id}")
def get_movie(movie_id: int):
    url = f"{BASE_URL}/movie/{movie_id}?api_key={API_KEY}&append_to_response=credits"
    return requests.get(url).json()