from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# simple in-memory cache
vectorizer = TfidfVectorizer(stop_words="english", max_features=2000)

def compute_similarity(movies):
    texts = [m["overview"] for m in movies]
    vectors = vectorizer.fit_transform(texts)
    similarity = cosine_similarity(vectors)
    return similarity