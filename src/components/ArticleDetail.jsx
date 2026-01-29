
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <button
        onClick={onBack}
        className="mb-6 sm:mb-8 group flex items-center gap-2 text-sm font-medium text-luxury-taupe hover:text-luxury-charcoal transition-all duration-300 touch-target"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span>
        <span>Back to articles</span>
      </button>

      <article className="bg-white rounded-2xl shadow-xl border border-luxury-beige overflow-hidden backdrop-blur-sm">
        {article.imageUrl && (
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px] overflow-hidden bg-gradient-to-br from-luxury-beige to-luxury-cream relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold tracking-wider text-luxury-charcoal bg-gradient-to-r from-luxury-beige to-luxury-cream rounded-full uppercase">
              {article.category}
            </span>
            <time className="text-xs sm:text-sm font-medium text-luxury-taupe">
              {formatDate(article.createdAt)}
            </time>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-luxury-charcoal mb-10 sm:mb-12 md:mb-16 leading-[1.1] tracking-[-0.02em] font-normal">
            {article.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            <div className="text-luxury-charcoal leading-[1.75] text-[17px] sm:text-[18px] font-light">
              {(() => {
                const lines = article.content.split('\n');
                const processedLines = [];
                let currentSectionContent = [];
                let currentSectionImage = null;
                let currentSectionButtons = [];
                let inSection = false;
                let isClosingSection = false;
                let closingSectionImage = null;
                let closingSectionContent = [];
                let closingSectionTitle = null;
                let isFirstSection = true;
                
                for (let i = 0; i < lines.length; i++) {
                  const line = lines[i];
                  
                  // Check for section header
                  if (line.startsWith('## ')) {
                    const sectionTitle = line.substring(3);
                    isClosingSection = sectionTitle.includes('Art of Choosing') || sectionTitle.includes('Conclusion') || sectionTitle.includes('Final Thoughts');
                    
                    // If we have a previous section with content, render it
                    if (inSection && currentSectionContent.length > 0) {
                      if (currentSectionImage) {
                        // Section with image - use image+content layout
                        processedLines.push(
                          <div key={`section-${i}`} className="my-12 sm:my-16 lg:my-20 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
                            <div className="lg:col-span-6 order-2 lg:order-1">
                              <div className="lg:sticky lg:top-8">
                                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
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
                            <div className="lg:col-span-6 order-1 lg:order-2">
                              <div className="space-y-4 sm:space-y-6">
                                {currentSectionContent}
                                {currentSectionButtons.length > 0 && (
                                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                                    {currentSectionButtons}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        // Section without image - render as full-width content
                        processedLines.push(
                          <div key={`section-no-image-${i}`} className="my-12">
                        <div className="space-y-6">
                          {currentSectionContent}
                          {currentSectionButtons.length > 0 && (
                            <div className="mt-8 pt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                              {currentSectionButtons}
                            </div>
                          )}
                        </div>
                          </div>
                        );
                      }
                    }
                    
                    // If we have a previous closing section with content, render it
                    if (isClosingSection && closingSectionContent.length > 0 && closingSectionTitle) {
                      processedLines.push(
                        <div key={`closing-section-${i}`} className="my-12 sm:my-16 lg:my-20 pt-8 sm:pt-10 lg:pt-12 border-t-2 border-luxury-charcoal border-opacity-20">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-luxury-charcoal mb-6 sm:mb-8 mt-6 sm:mt-8 leading-[1.2] tracking-[-0.01em] font-normal">
                            {closingSectionTitle}
                          </h2>
                          <div className="space-y-4 sm:space-y-6">
                            {closingSectionContent}
                            {closingSectionImage && (
                              <div key="closing-image" className="my-8 sm:my-10 lg:my-12">
                                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                                  <img 
                                    src={closingSectionImage.src} 
                                    alt={closingSectionImage.alt} 
                                    className="w-full aspect-[16/9] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                      closingSectionContent = [];
                      closingSectionImage = null;
                      closingSectionTitle = null;
                    }
                    
                    // Start new section
                    isClosingSection = sectionTitle.includes('Art of Choosing') || sectionTitle.includes('Conclusion') || sectionTitle.includes('Final Thoughts');
                    
                    if (isClosingSection) {
                      // Closing section - store title and content separately
                      closingSectionTitle = sectionTitle;
                      closingSectionContent = [];
                      closingSectionImage = null;
                    } else {
                      processedLines.push(
                        <h2 key={i} className={`text-2xl sm:text-3xl lg:text-4xl font-serif text-luxury-charcoal mb-0 pt-12 border-t-2 border-luxury-beige leading-[1.2] tracking-[-0.01em] font-normal ${isFirstSection ? 'mt-8 sm:mt-10 md:mt-12' : 'mt-20'}`}>
                          {sectionTitle}
                        </h2>
                      );
                      isFirstSection = false;
                    }
                    
                    currentSectionContent = [];
                    currentSectionImage = null;
                    currentSectionButtons = [];
                    inSection = true;
                    continue;
                  }
                  
                  // Check for image
                  const imageMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                  if (imageMatch) {
                    const [, alt, src] = imageMatch;
                    if (isClosingSection) {
                      // Store image to render after text content
                      closingSectionImage = { alt, src };
                    } else if (inSection) {
                      currentSectionImage = { alt, src };
                    }
                    continue;
                  }
                  
                  // Check for affiliate link buttons
                  const affiliateMatch = line.match(/\[SHOP_([^\]]+)\]\(([^)]+)\)/);
                  if (affiliateMatch) {
                    const [, productName, url] = affiliateMatch;
                    const displayName = productName.replace(/_/g, ' ');
                    currentSectionButtons.push(
                      <a
                        key={`button-${i}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-luxury-charcoal via-gray-800 to-luxury-charcoal text-white rounded-full hover:shadow-2xl transition-all duration-300 font-medium tracking-wider shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm sm:text-base"
                      >
                        <span>Shop {displayName}</span>
                        <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-base sm:text-lg">→</span>
                      </a>
                    );
                    continue;
                  }
                  
                  // Process text content
                  if (line.startsWith('### ')) {
                    if (isClosingSection) {
                      closingSectionContent.push(
                        <h3 key={i} className="text-lg sm:text-xl font-medium text-luxury-charcoal mt-8 mb-3 leading-[1.4]">
                          {line.substring(4)}
                        </h3>
                      );
                    } else {
                      currentSectionContent.push(
                        <h3 key={i} className="text-lg sm:text-xl font-medium text-luxury-charcoal mt-8 mb-3 leading-[1.4]">
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
                      // Add to closing section content (will render after with image)
                      closingSectionContent.push(
                        <p 
                          key={i} 
                          className="text-gray-700 leading-[1.75] text-[17px] sm:text-[18px] mb-6 font-light"
                          dangerouslySetInnerHTML={{ __html: processedLine }}
                        />
                      );
                    } else {
                      // Regular section - add to currentSectionContent
                      currentSectionContent.push(
                        <p 
                          key={i} 
                          className="text-gray-700 leading-[1.75] text-[17px] sm:text-[18px] font-light"
                          dangerouslySetInnerHTML={{ __html: processedLine }}
                        />
                      );
                    }
                  }
                }
                
                // Render last section if it exists (only if it's not a closing section)
                if (inSection && !isClosingSection && currentSectionContent.length > 0) {
                  if (currentSectionImage) {
                    // Section with image - use image+content layout
                    processedLines.push(
                      <div key="section-final" className="my-12 sm:my-16 lg:my-20 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
                        <div className="lg:col-span-6 order-2 lg:order-1">
                          <div className="lg:sticky lg:top-8">
                            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
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
                        <div className="lg:col-span-6 order-1 lg:order-2">
                          <div className="space-y-4 sm:space-y-6">
                            {currentSectionContent}
                            {currentSectionButtons.length > 0 && (
                              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                                {currentSectionButtons}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    // Section without image - render as full-width content
                    processedLines.push(
                      <div key="section-final-no-image" className="my-12">
                        <div className="space-y-4 sm:space-y-6">
                          {currentSectionContent}
                          {currentSectionButtons.length > 0 && (
                            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                              {currentSectionButtons}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                } else if (inSection && isClosingSection && (closingSectionContent.length > 0 || closingSectionImage)) {
                  // Render final closing section with image after text
                  processedLines.push(
                    <div key="closing-section-final" className="my-12 sm:my-16 lg:my-20 pt-8 sm:pt-10 lg:pt-12 border-t-2 border-luxury-charcoal border-opacity-20">
                      {closingSectionTitle && (
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-luxury-charcoal mb-6 sm:mb-8 mt-6 sm:mt-8 leading-[1.2] tracking-[-0.01em] font-normal">
                          {closingSectionTitle}
                        </h2>
                      )}
                      <div className="space-y-4 sm:space-y-6">
                        {closingSectionContent}
                        {closingSectionImage && (
                          <div key="closing-image-final" className="my-8 sm:my-10 lg:my-12">
                            <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                              <img 
                                src={closingSectionImage.src} 
                                alt={closingSectionImage.alt} 
                                className="w-full aspect-[16/9] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
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

