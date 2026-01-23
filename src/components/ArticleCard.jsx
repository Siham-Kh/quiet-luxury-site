import { Link } from 'react-router-dom';

const ArticleCard = ({ article, onReadMore }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <article className="bg-white rounded-sm shadow-sm border border-luxury-beige overflow-hidden hover:shadow-md transition-shadow duration-200">
      {article.imageUrl && (
        <div className="w-full h-48 overflow-hidden bg-luxury-beige">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-luxury-taupe bg-luxury-beige rounded-full">
            {article.category}
          </span>
          <time className="text-xs text-luxury-taupe">
            {formatDate(article.createdAt)}
          </time>
        </div>
        
        <h2 className="text-xl font-serif text-luxury-charcoal mb-3 line-clamp-2">
          {article.title}
        </h2>
        
        <p className="text-sm text-luxury-charcoal text-opacity-80 mb-4 line-clamp-3">
          {getExcerpt(article.content)}
        </p>
        
        <Link
          to={`/article/${article.id}`}
          className="text-sm font-medium text-luxury-charcoal hover:text-opacity-70 transition-colors duration-200"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;

