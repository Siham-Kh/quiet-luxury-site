import { useState } from 'react';
import { saveArticle, generateArticleId } from '../utils/storage';

const ArticleForm = ({ onSave, onCancel, initialArticle = null }) => {
  const [formData, setFormData] = useState({
    title: initialArticle?.title || '',
    category: initialArticle?.category || '',
    content: initialArticle?.content || '',
    imageUrl: initialArticle?.imageUrl || '',
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Fashion',
    'Accessories',
    'Home',
    'Beauty',
    'Travel',
    'Lifestyle',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    const article = {
      id: initialArticle?.id || generateArticleId(),
      title: formData.title.trim(),
      category: formData.category,
      content: formData.content.trim(),
      imageUrl: formData.imageUrl.trim() || null,
      createdAt: initialArticle?.createdAt || new Date().toISOString(),
    };

    if (saveArticle(article)) {
      onSave(article);
    } else {
      alert('Failed to save article. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-sm shadow-sm border border-luxury-beige p-8">
        <h2 className="text-2xl font-serif text-luxury-charcoal mb-6">
          {initialArticle ? 'Edit Article' : 'Create New Article'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-luxury-charcoal mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.title ? 'border-red-300' : 'border-luxury-beige'
              } rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-charcoal focus:border-transparent`}
              placeholder="Enter article title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-luxury-charcoal mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.category ? 'border-red-300' : 'border-luxury-beige'
              } rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-charcoal focus:border-transparent bg-white`}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-luxury-charcoal mb-2">
              Image URL (optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-luxury-beige rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-charcoal focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-luxury-charcoal mb-2">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={12}
              className={`w-full px-4 py-2 border ${
                errors.content ? 'border-red-300' : 'border-luxury-beige'
              } rounded-sm focus:outline-none focus:ring-2 focus:ring-luxury-charcoal focus:border-transparent resize-y`}
              placeholder="Write your article content here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="px-8 py-2 bg-luxury-charcoal text-white rounded-sm hover:bg-opacity-90 transition-all duration-200 font-medium"
            >
              {initialArticle ? 'Update Article' : 'Publish Article'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-2 bg-white text-luxury-charcoal border border-luxury-beige rounded-sm hover:bg-luxury-beige transition-all duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleForm;

