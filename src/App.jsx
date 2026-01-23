import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import { getArticles, saveArticle } from './utils/storage';
import { articlesData } from './data/articles';

function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const articles = getArticles();
    const foundArticle = articles.find(a => a.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
    }
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-luxury-taupe mb-4">Article not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-luxury-charcoal text-white rounded-full hover:bg-opacity-90 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <ArticleDetail article={article} onBack={() => navigate('/')} />;
}

function HomePage() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load articles from localStorage
    const loadedArticles = getArticles();
    
    // Sync articlesData with localStorage
    // This ensures articles in the data file are always up-to-date
    articlesData.forEach(articleData => {
      const existingIndex = loadedArticles.findIndex(a => a.id === articleData.id);
      
      if (existingIndex >= 0) {
        // Update existing article (preserve createdAt if it exists)
        const existingArticle = loadedArticles[existingIndex];
        loadedArticles[existingIndex] = {
          ...articleData,
          createdAt: existingArticle.createdAt || articleData.createdAt,
        };
      } else {
        // Add new article
        loadedArticles.push(articleData);
      }
    });
    
    // Save updated articles to localStorage
    localStorage.setItem('quiet-luxury-articles', JSON.stringify(loadedArticles));
    setArticles(loadedArticles);
  }, []);

  const handleReadMore = (article) => {
    navigate(`/article/${article.id}`);
  };

  return (
    <div className="min-h-screen bg-luxury-cream">
      <Header showNewButton={false} />
      <ArticleList 
        articles={articles} 
        onReadMore={handleReadMore}
      />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article/:id" element={<ArticleDetailPage />} />
    </Routes>
  );
}

export default App;
