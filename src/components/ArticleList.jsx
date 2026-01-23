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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-luxury-charcoal mb-6 tracking-tight">
          Quiet Luxury
        </h1>
        <p className="text-xl md:text-2xl text-luxury-taupe max-w-3xl mx-auto leading-relaxed mb-4">
          Curated reviews of timeless elegance
        </p>
        <p className="text-base md:text-lg text-luxury-taupe max-w-2xl mx-auto opacity-80 leading-relaxed">
          Discover the finest in quiet luxury—where sophistication meets understated refinement. 
          Each review is thoughtfully crafted to guide you toward pieces that speak volumes without saying a word.
        </p>
      </div>

      {/* Articles Section */}
      <div className="mb-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-luxury-charcoal mb-3">
            Latest Reviews
          </h2>
          <div className="w-24 h-px bg-luxury-beige mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onReadMore={onReadMore}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;

