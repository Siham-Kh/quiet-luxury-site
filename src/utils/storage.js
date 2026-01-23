const STORAGE_KEY = 'quiet-luxury-articles';

/**
 * Get all articles from localStorage
 * @returns {Array} Array of article objects
 */
export const getArticles = () => {
  try {
    const articles = localStorage.getItem(STORAGE_KEY);
    return articles ? JSON.parse(articles) : [];
  } catch (error) {
    console.error('Error loading articles from localStorage:', error);
    return [];
  }
};

/**
 * Save an article to localStorage
 * @param {Object} article - Article object with id, title, category, content, imageUrl, createdAt
 * @returns {boolean} Success status
 */
export const saveArticle = (article) => {
  try {
    const articles = getArticles();
    const existingIndex = articles.findIndex(a => a.id === article.id);
    
    if (existingIndex >= 0) {
      // Update existing article
      articles[existingIndex] = article;
    } else {
      // Add new article
      articles.push(article);
    }
    
    // Sort by createdAt (newest first)
    articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    return true;
  } catch (error) {
    console.error('Error saving article to localStorage:', error);
    return false;
  }
};

/**
 * Delete an article from localStorage
 * @param {string} articleId - ID of the article to delete
 * @returns {boolean} Success status
 */
export const deleteArticle = (articleId) => {
  try {
    const articles = getArticles();
    const filtered = articles.filter(a => a.id !== articleId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting article from localStorage:', error);
    return false;
  }
};

/**
 * Generate a unique ID for a new article
 * @returns {string} Unique ID based on timestamp
 */
export const generateArticleId = () => {
  return `article-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

