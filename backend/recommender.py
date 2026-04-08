from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# vectorizer
vectorizer = TfidfVectorizer(stop_words="english", max_features=3000)

# ================= BUILD TEXT =================
def build_text(movie):
    overview = movie.get("overview", "")
    
    # genres come as IDs → convert to string
    genres = " ".join(map(str, movie.get("genre_ids", [])))
    
    title = movie.get("title", "")
    
    return f"{title} {overview} {genres}"


# ================= COMPUTE SIMILARITY =================
def compute_similarity(movies):
    texts = [build_text(m) for m in movies]

    vectors = vectorizer.fit_transform(texts)
    similarity = cosine_similarity(vectors)

    return similarity