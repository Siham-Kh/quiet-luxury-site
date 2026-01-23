import ArticleCard from './ArticleCard';

const ArticleList = ({ articles, onReadMore }) => {
  if (articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-luxury-taupe mb-4">
            No articles yet. Create your first article to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-serif text-luxury-charcoal">
          Latest Reviews
        </h2>
        <p className="text-sm text-luxury-taupe mt-2">
          {articles.length} {articles.length === 1 ? 'article' : 'articles'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onReadMore={onReadMore}
          />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;

