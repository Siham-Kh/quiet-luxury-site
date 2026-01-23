# Quiet Luxury - Article Review Site

A React.js site for posting and reviewing quiet luxury items. Articles are stored in `localStorage` and styled with Tailwind CSS.

## Adding a New Article

**Much simpler now!** To add a new article, simply edit the `src/data/articles.js` file. This keeps all article content separate from component logic, making it much easier to manage.

### Why This Approach is Better

✅ **Separation of Concerns**: Article content is separate from React components  
✅ **Easy to Add Articles**: Just add an object to the array - no component logic to touch  
✅ **Easy to Edit**: All content in one place, easy to find and modify  
✅ **Cleaner Code**: `App.jsx` is now much simpler and focused on routing  
✅ **Better Organization**: All articles in one dedicated data file

### Step 1: Open the Articles Data File

Open `src/data/articles.js` - this is where all articles are stored.

### Step 2: Create Article Object

Add a new article object to the `articlesData` array. Here's the structure:

```javascript
{
  id: 'unique-article-id', // Use a fixed, unique ID (e.g., 'article-2', 'handbags-guide')
  title: "Your Article Title",
  category: "Category Name", // e.g., "Beauty", "Fashion", "Accessories"
  slug: "article-slug", // URL-friendly identifier (optional)
  content: `Your article content here...`,
  imageUrl: "https://example.com/hero-image.jpg", // Main article image
  createdAt: new Date().toISOString(), // Current date/time
}
```

### Step 2: Article Content Format

The `content` field supports markdown-like syntax:

#### Section Headers
Use `## ` for main section titles:
```
## Section Title Here
```

#### Images
Use markdown image syntax:
```
![Image alt text](https://example.com/image.jpg)
```

#### Bold Text
Use double asterisks:
```
**Bold text here**
```

#### Subheadings
Use `### ` for subheadings:
```
### Subheading Text
```

#### Affiliate Buttons
Use the special syntax for shop buttons:
```
[SHOP_PRODUCT_NAME](https://affiliate-link.com)
```
The button will automatically render with "Shop PRODUCT NAME" text.

### Step 3: Article Layout

The article detail page automatically handles:
- **Hero Image**: The `imageUrl` appears at the top with the title overlay
- **Section Layout**: Each section with an image uses a side-by-side layout:
  - Image on the left (4/12 width)
  - Content on the right (8/12 width)
- **Shop Buttons**: Appear under the text content of each section

### Step 3: Add to Array

Simply add your new article object to the `articlesData` array in `src/data/articles.js`:

```javascript
export const articlesData = [
  // ... existing articles ...
  {
    id: 'new-article-id',
    title: "Your New Article",
    // ... rest of article data
  },
];
```

The articles will automatically sync to localStorage when the app loads. No need to manually save or update anything!

### Example: Complete Article

```javascript
export const articlesData = [
  // ... existing articles ...
  {
    id: 'handbags-guide',
    title: "The 5 Best Luxury Handbags for Every Occasion",
    category: "Fashion",
    slug: "5-best-luxury-handbags",
    content: `Introduction text here...

## 1. For the Office: Hermès Birkin

![Hermès Birkin](https://example.com/image.jpg)

Description text here with **bold text** for emphasis.

**Price:** $10,000+

[SHOP_HERMES_BIRKIN](https://amzn.to/affiliate-link)

## 2. For Daily Use: Chanel Classic Flap

![Chanel Classic Flap](https://example.com/image2.jpg)

Another description...

[SHOP_CHANEL_FLAP](https://amzn.to/affiliate-link2)
`,
    imageUrl: "https://example.com/hero-image.jpg",
    createdAt: new Date().toISOString(),
  },
];
```

## Routes

- `/` - Home page showing all articles in a grid
- `/article/:id` - Individual article detail page

Articles are automatically linked from the home page cards.

## Styling

The site uses Tailwind CSS with custom luxury-themed colors:
- `luxury-cream`: Background color
- `luxury-beige`: Borders and subtle backgrounds
- `luxury-charcoal`: Text and buttons
- `luxury-taupe`: Secondary text

## Development

```bash
npm install
npm run dev
```

The site runs on `http://localhost:5173` by default.

## Notes

- Articles are stored in browser `localStorage` under the key `quiet-luxury-articles`
- The site is read-only - no create/edit/delete functionality in the UI
- All articles must be added programmatically in `App.jsx`
- Images should be hosted externally (e.g., Unsplash, your own CDN)
