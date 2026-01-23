
const ArticleDetail = ({ article, onBack }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={onBack}
        className="mb-8 group flex items-center gap-2 text-sm font-medium text-luxury-taupe hover:text-luxury-charcoal transition-all duration-300"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
        <span>Back to articles</span>
      </button>

      <article className="bg-white rounded-2xl shadow-xl border border-luxury-beige overflow-hidden backdrop-blur-sm">
        {article.imageUrl && (
          <div className="w-full h-[500px] overflow-hidden bg-gradient-to-br from-luxury-beige to-luxury-cream relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
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

        <div className="p-10 lg:p-12">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-block px-4 py-2 text-xs font-semibold tracking-wider text-luxury-charcoal bg-gradient-to-r from-luxury-beige to-luxury-cream rounded-full uppercase">
              {article.category}
            </span>
            <time className="text-sm font-medium text-luxury-taupe">
              {formatDate(article.createdAt)}
            </time>
          </div>

          <h1 className="text-5xl lg:text-6xl font-serif text-luxury-charcoal mb-8 leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="text-luxury-charcoal leading-relaxed text-lg">
              {(() => {
                const lines = article.content.split('\n');
                const processedLines = [];
                let currentSectionContent = [];
                let currentSectionImage = null;
                let currentSectionButton = null;
                let inSection = false;
                let isClosingSection = false;
                
                for (let i = 0; i < lines.length; i++) {
                  const line = lines[i];
                  
                  // Check for section header
                  if (line.startsWith('## ')) {
                    const sectionTitle = line.substring(3);
                    isClosingSection = sectionTitle.includes('Art of Choosing') || sectionTitle.includes('Conclusion');
                    
                    // If we have a previous section with image and content, render it
                    if (inSection && currentSectionImage && currentSectionContent.length > 0) {
                      processedLines.push(
                        <div key={`section-${i}`} className="my-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
                          <div className="lg:col-span-4">
                            <div className="sticky top-8">
                              <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                <img 
                                  src={currentSectionImage.src} 
                                  alt={currentSectionImage.alt} 
                                  className="w-full aspect-[9/16] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="lg:col-span-8">
                            <div className="space-y-6">
                              {currentSectionContent}
                              {currentSectionButton && (
                                <div className="mt-8 pt-6">
                                  {currentSectionButton}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                    
                    // Start new section
                    isClosingSection = sectionTitle.includes('Art of Choosing') || sectionTitle.includes('Conclusion');
                    
                    if (isClosingSection) {
                      // Closing section - full width, no image layout, with prominent separator line
                      processedLines.push(
                        <div key={`closing-${i}`} className="my-20 pt-12 border-t-2 border-luxury-charcoal border-opacity-20">
                          <h2 className="text-4xl lg:text-5xl font-serif text-luxury-charcoal mb-8 mt-8">
                            {sectionTitle}
                          </h2>
                        </div>
                      );
                    } else {
                      processedLines.push(
                        <h2 key={i} className="text-3xl lg:text-4xl font-serif text-luxury-charcoal mt-20 mb-0 pt-12 border-t-2 border-luxury-beige first:mt-0 first:pt-0 first:border-t-0">
                          {sectionTitle}
                        </h2>
                      );
                    }
                    
                    currentSectionContent = [];
                    currentSectionImage = null;
                    currentSectionButton = null;
                    inSection = true;
                    continue;
                  }
                  
                  // Check for image
                  const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                  if (imageMatch && inSection) {
                    const [, alt, src] = imageMatch;
                    currentSectionImage = { alt, src };
                    continue;
                  }
                  
                  // Check for affiliate link buttons
                  const affiliateMatch = line.match(/\[SHOP_([^\]]+)\]\(([^)]+)\)/);
                  if (affiliateMatch) {
                    const [, productName, url] = affiliateMatch;
                    const displayName = productName.replace(/_/g, ' ');
                    currentSectionButton = (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-luxury-charcoal via-gray-800 to-luxury-charcoal text-white rounded-full hover:shadow-2xl transition-all duration-300 font-medium tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base"
                      >
                        <span>Shop {displayName}</span>
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-lg">→</span>
                      </a>
                    );
                    continue;
                  }
                  
                  // Process text content
                  if (line.startsWith('### ')) {
                    if (isClosingSection) {
                      processedLines.push(
                        <h3 key={i} className="text-xl font-semibold text-luxury-charcoal mt-8 mb-3">
                          {line.substring(4)}
                        </h3>
                      );
                    } else {
                      currentSectionContent.push(
                        <h3 key={i} className="text-xl font-semibold text-luxury-charcoal mt-8 mb-3">
                          {line.substring(4)}
                        </h3>
                      );
                    }
                  } else if (line.trim() === '') {
                    // Skip empty lines for cleaner spacing
                  } else if (line.trim() !== '') {
                    const processedLine = line
                      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-luxury-charcoal">$1</strong>');
                    
                    if (isClosingSection) {
                      // Render directly in processedLines for closing section (full width)
                      processedLines.push(
                        <p 
                          key={i} 
                          className="text-gray-700 leading-7 text-base mb-6"
                          dangerouslySetInnerHTML={{ __html: processedLine }}
                        />
                      );
                    } else {
                      // Regular section - add to currentSectionContent
                      currentSectionContent.push(
                        <p 
                          key={i} 
                          className="text-gray-700 leading-7 text-base"
                          dangerouslySetInnerHTML={{ __html: processedLine }}
                        />
                      );
                    }
                  }
                }
                
                // Render last section if it exists (only if it's not a closing section)
                if (inSection && !isClosingSection && currentSectionImage && currentSectionContent.length > 0) {
                  processedLines.push(
                    <div key="section-final" className="my-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-4">
                        <div className="sticky top-8">
                          <div className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <img 
                              src={currentSectionImage.src} 
                              alt={currentSectionImage.alt} 
                              className="w-full aspect-[9/16] object-cover transform group-hover:scale-105 transition-transform duration-700"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="lg:col-span-8">
                        <div className="space-y-6">
                          {currentSectionContent}
                          {currentSectionButton && (
                            <div className="mt-8 pt-6">
                              {currentSectionButton}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                } else if (inSection && isClosingSection && currentSectionContent.length > 0) {
                  // Handle closing section content that wasn't rendered yet
                  // This shouldn't happen since closing section content is rendered directly
                }
                
                return processedLines;
              })()}
            </div>
          </div>

        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;

