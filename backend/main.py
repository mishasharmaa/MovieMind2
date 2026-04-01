from fastapi import FastAPI
import requests
import os
from dotenv import load_dotenv
from recommender import compute_similarity
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import quote

load_dotenv()

API_KEY = os.getenv("API_KEY")

app = FastAPI()

# ✅ FIXED: Proper CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (simpler for dev)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://api.themoviedb.org/3"


# ================= FETCH TRENDING =================
def get_popular():
    if not API_KEY:
        return []

    url = f"{BASE_URL}/trending/all/week?api_key={API_KEY}"
    try:
        return requests.get(url).json().get("results", [])
    except:
        return []


# ================= SEARCH =================
@app.get("/search")
def search(query: str):
    if not query:
        return []

    query = quote(query)

    url = f"{BASE_URL}/search/multi?api_key={API_KEY}&query={query}"
    try:
        return requests.get(url).json().get("results", [])
    except:
        return []


# ================= RECOMMEND =================
@app.get("/recommend")
def recommend(query: str):
    if not query:
        return []

    movies = search(query)

    # filter valid
    valid_movies = [m for m in movies if m.get("overview")]

    if len(valid_movies) < 2:
        return valid_movies

    try:
        similarity = compute_similarity(valid_movies)

        scores = list(enumerate(similarity[0]))
        scores = sorted(scores, key=lambda x: x[1], reverse=True)[1:10]

        return [valid_movies[i[0]] for i in scores]

    except Exception as e:
        print("Recommendation error:", e)
        return valid_movies[:10]


# ================= TRENDING =================
@app.get("/trending")
def trending():
    return get_popular()


# ================= MOVIE DETAILS =================
@app.get("/movie/{movie_id}")
def get_movie(movie_id: int):
    url = f"{BASE_URL}/movie/{movie_id}?api_key={API_KEY}&append_to_response=credits"
    try:
        return requests.get(url).json()
    except:
        return {}