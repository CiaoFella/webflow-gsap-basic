# Webflow GSAP Basic Template

A starter template for Webflow projects with GSAP integration. This template provides a structured approach to adding GSAP animations to your Webflow projects.

## Features

- Automatic bundling and minification of JavaScript files
- GSAP integration
- Individual output files with the same names as source files
- Babel transpilation for browser compatibility
- Centralized dependency management through vendor.js
- Page-specific animation files for better performance

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/webflow-gsap-basic.git
   cd webflow-gsap-basic
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

1. Create your JavaScript files in the `src` directory. Each file will be bundled separately.

2. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   This will watch for changes in your source files and automatically rebuild them.

3. The bundled and minified files will be available in the `dist` directory with the same names as their source files.

### Building for Production

To build minified files for production:

```bash
npm run build
# or
yarn build
```

## Usage with Webflow

1. After building your files, upload the JavaScript files from the `dist` directory to your Webflow project.

2. In Webflow, add a custom code embed or link to your uploaded JavaScript files.

3. Make sure to include GSAP in your Webflow project by adding the following script tag in the head section:

   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/gsap.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/ScrollTrigger.min.js"></script>
   ```

4. Include your bundled files in the correct order:

   ```html
   <!-- First include the vendor file on all pages -->
   <script src="path/to/your/vendor.js"></script>

   <!-- Include common animations on all pages -->
   <script src="path/to/your/pages/common.js"></script>

   <!-- Then include page-specific animations only on relevant pages -->
   <!-- For example, on the home page: -->
   <script src="path/to/your/pages/home.js"></script>
   ```

## Page-Specific Animations

This template uses a page-specific approach to animations, which offers several benefits:

1. **Better Performance**: Only load the animations needed for each page
2. **Cleaner Code**: Separate files for separate pages makes the code more maintainable
3. **Faster Loading**: Smaller file sizes mean faster page loads

The template includes the following page-specific files:

- `common.js` - Animations for elements that appear on all pages (navigation, footer, etc.)
- `home.js` - Animations specific to the home page
- `about.js` - Animations specific to the about page
- `portfolio.js` - Animations specific to the portfolio page
- `contact.js` - Animations specific to the contact page

You can add more page-specific files as needed for your project.

## Project Structure

```
webflow-gsap-basic/
├── src/                  # Source JavaScript files
│   ├── vendor.js         # Centralized dependencies
│   ├── pages/            # Page-specific animations
│   │   ├── common.js     # Common animations for all pages
│   │   ├── home.js       # Home page animations
│   │   ├── about.js      # About page animations
│   │   ├── portfolio.js  # Portfolio page animations
│   │   └── contact.js    # Contact page animations
│   ├── animations/       # Reusable animation components
│   ├── utils/            # Utility functions
│   └── index.js          # Main entry point
├── dist/                 # Bundled and minified output files
├── webpack.config.js     # Webpack configuration
├── .babelrc              # Babel configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Dependency Management

This template uses a centralized approach to dependency management through the `vendor.js` file. This file imports all external dependencies once and makes them available to other files in two ways:

1. **Module imports** - For files that are bundled together:

   ```javascript
   import { gsap, ScrollTrigger } from "../vendor";
   ```

2. **Global object** - For standalone files or Webflow custom code:
   ```javascript
   const { gsap, ScrollTrigger } = window.WebflowGsapVendor;
   ```

This approach ensures that dependencies are only loaded once, reducing file size and improving performance.

## Example

Here's a simple example of a page-specific animation file:

```javascript
// src/pages/home.js
import { gsap } from "../vendor";

// Self-executing function to avoid global scope pollution
(function () {
  // Initialize when DOM is ready
  function init() {
    console.log("Home page animations initialized");

    // Initialize animations
    animateHero();
    animateFeatures();
  }

  function animateHero() {
    const heroSection = document.querySelector(".home-hero");
    if (!heroSection) return;

    const heroTitle = heroSection.querySelector(".hero-title");
    const heroSubtitle = heroSection.querySelector(".hero-subtitle");

    // Create timeline
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    // Add animations
    tl.from(heroTitle, { y: 50, opacity: 0, duration: 1 }).from(
      heroSubtitle,
      { y: 30, opacity: 0 },
      "-=0.6"
    );
  }

  function animateFeatures() {
    // Feature section animations
  }

  // Check if document is already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
```

## License

MIT
