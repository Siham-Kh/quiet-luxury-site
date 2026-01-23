/**
 * Articles Data
 * 
 * This file contains all article content. To add a new article:
 * 1. Create a new article object following the structure below
 * 2. Add it to the articles array
 * 3. The articles will be automatically loaded and saved to localStorage
 */

import { generateArticleId } from '../utils/storage';
import perfume1 from '../assets/perfume 1.png';
import perfume2 from '../assets/perfume 2.png';
import perfume3 from '../assets/perfume 3.png';
import perfume4 from '../assets/perfume 4.png';
import perfume5 from '../assets/perfume 5.png';

// Template for new articles:
// {
//   id: generateArticleId(),
//   title: "Article Title",
//   category: "Category",
//   slug: "article-slug",
//   content: `Article content with markdown...`,
//   imageUrl: "https://example.com/hero-image.jpg",
//   createdAt: new Date().toISOString(),
// }

// Build content with image URLs
const perfumeArticleContent = `In the world of quiet luxury, a signature scent speaks volumes without saying a word. The right fragrance can elevate your presence, create lasting impressions, and become an extension of your personal style. After extensive testing and consideration of sillage, longevity, and sophistication, I've curated the definitive guide to the five best luxury perfumes for every occasion in your life.

## 1. For the Office: Maison Francis Kurkdjian – Aqua Universalis

![Maison Francis Kurkdjian Aqua Universalis - The perfect office fragrance](${perfume1})

Maison Francis Kurkdjian's Aqua Universalis delivers understated elegance for professional settings. A unisex fragrance with 8-10 hour longevity, it features a clean white floral composition.

**Notes:** Top: Bergamot, Lemon | Heart: Jasmine, Lily of the Valley, Sweet Pea | Base: Musk, White Woods

**Why it works:** Opens with crisp bergamot and lemon, creating an invigorating yet non-intrusive aura. White florals provide a delicate foundation that won't overwhelm in close quarters. The musky dry-down ensures longevity through extended meetings.

**The quiet luxury factor:** Named "Universalis" for its universal appeal, this fragrance embodies MFK's philosophy of refined simplicity. Price point: $175-285 for 70ml.

**Best for:** Corporate environments, client meetings, professional networking events.

[SHOP_AQUA_UNIVERSALIS](https://amzn.to/4qZOpRq)

## 2. For Daily Use: Parfums de Marly – Valaya

![Parfums de Marly Valaya - The everyday luxury scent](${perfume2})

Parfums de Marly's Valaya offers everyday luxury with 6-8 hour wear. A feminine floral fragrance inspired by the elegance of French royalty.

**Notes:** Top: Bergamot, Pear | Heart: Jasmine, Lily of the Valley, Peony | Base: Soft Musk, White Woods

**Why it works:** The fruity-floral opening creates an inviting first impression. White flowers add femininity without being overly sweet. The musky base provides a clean, skin-like finish perfect for daily wear.

**The quiet luxury factor:** Part of Parfums de Marly's exclusive collection, Valaya embodies the brand's commitment to French perfumery tradition. Price point: $250-350 for 75ml. Named after a legendary French queen.

**Best for:** Daily wear, weekend outings, casual elegance, office-appropriate fragrance.

[SHOP_VALAYA](https://amzn.to/4sQOad9)

## 3. For Date Night: Parfums de Marly – Delina Exclusif

![Parfums de Marly Delina Exclusif - The unforgettable evening fragrance](${perfume3})

Parfums de Marly's Delina Exclusif delivers unforgettable sophistication for special occasions. An intense, long-lasting (10-12 hours) rose-oud fragrance with exceptional sillage.

**Notes:** Top: Rhubarb, Bergamot, Nutmeg | Heart: Turkish Rose, Lychee, Peony | Base: Vanilla, Vetiver, Incense, Oud

**Why it works:** The fruity-spicy opening creates intrigue. The rose-oud heart provides depth and sensuality with exceptional projection. The warm, opulent base ensures the fragrance lingers throughout the evening.

**The quiet luxury factor:** Delina Exclusif is the intensified version of the cult-favorite Delina, featuring added oud and incense for greater complexity. Price point: $320-450 for 75ml. Consistently ranked among top luxury fragrances.

**Best for:** Date nights, romantic dinners, special events, evening occasions.

[SHOP_DELINA_EXCLUSIF](https://amzn.to/4jTm8tA)

## 4. For Hot Weather: Creed – Millésime Impérial

![Creed Millésime Impérial - The perfect summer fragrance](${perfume4})

Creed's Millésime Impérial offers a refreshing Mediterranean coastal vibe perfect for hot weather. A unisex aquatic fragrance with 6-8 hour longevity, designed to perform in heat.

**Notes:** Top: Bergamot, Lemon, Grapefruit | Heart: Sea Salt, Melon, Iris | Base: Ambergris, Musk, Sandalwood

**Why it works:** The citrus opening provides immediate refreshment. The unique sea salt and melon heart creates a sophisticated marine quality—not generic aquatic. The ambergris base ensures it doesn't become cloying in high temperatures.

**The quiet luxury factor:** Part of Creed's exclusive Millésime collection, this fragrance uses traditional French perfumery techniques. Price point: $300-450 for 75ml. Named "Millésime" (vintage) for its timeless quality.

**Best for:** Summer days, beach vacations, hot weather events, tropical climates.

[SHOP_MILLESIME_IMPERIAL](https://amzn.to/4a612on)

## 5. For Going Out: Maison Francis Kurkdjian – Baccarat Rouge 540

![Maison Francis Kurkdjian Baccarat Rouge 540 - The mysterious night fragrance](${perfume5})

Maison Francis Kurkdjian's Baccarat Rouge 540 delivers captivating sophistication for evening occasions. An amber floral with exceptional 12+ hour longevity and powerful sillage.

**Notes:** Top: Saffron, Jasmine | Heart: Ambergris, Cedar | Base: Fir Resin, Ambergris, Amberwood

**Why it works:** The saffron-jasmine opening creates an intoxicating floral-spicy accord. Ambergris provides depth and sensuality with a unique "sweet air" quality. The woody-amber base ensures exceptional longevity and projection throughout the night.

**The quiet luxury factor:** Named after Baccarat's iconic crystal (540°C firing temperature), this fragrance represents a collaboration between MFK and the luxury crystal house. Price point: $325-485 for 70ml. One of the most recognizable luxury fragrances globally.

**Best for:** Evening events, nightlife, parties, special occasions, when you want maximum impact.

[SHOP_BACCARAT_ROUGE_540](https://amzn.to/4sWT4Wg)`;

export const articlesData = [
  {
    id: 'perfume-article', // Fixed ID so it updates instead of creating duplicates
    title: "The 5 Best Luxury Perfumes for Every Occasion: A Curated Guide",
    category: "Beauty",
    slug: "5-best-luxury-perfumes",
    content: perfumeArticleContent,
    imageUrl: perfume1, // Using perfume 1 as hero image
    createdAt: new Date('2024-01-15').toISOString(),
  },
  // Add new articles here following the same structure
  // {
  //   id: generateArticleId(),
  //   title: "Your New Article Title",
  //   category: "Fashion",
  //   slug: "new-article-slug",
  //   content: `Your article content...`,
  //   imageUrl: "https://example.com/image.jpg",
  //   createdAt: new Date().toISOString(),
  // },
];

