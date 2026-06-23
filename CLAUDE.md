# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Forest of Ideas** is a static website hosted on GitHub Pages that showcases ideas for improving games, applications, and digital systems. It's a pure HTML/CSS/JavaScript project with no build system, dependencies, or testing framework.

**Live site:** https://dawidpolakowski.github.io/forest-of-ideas/

## Architecture

### Key Files & Their Roles

- **index.html** – Main portal homepage. Clean semantic HTML with search input and tags container. JavaScript logic moved to `app.js` for maintainability.

- **app.js** – Portal logic in a clean `IdeasPortal` class. Handles tag rendering, search/filtering, and idea card generation. No external dependencies. Instantiates on DOM ready.

- **data.js** – Registry of all ideas. Simple array of objects with structure:
  ```javascript
  {
    title: string,
    file: string (path to idea page),
    category: string,
    tags: array of strings
  }
  ```
  Every new idea must be registered here to appear on the homepage.

- **styles.css** – Global stylesheet with futuristic dark theme (dark navy background, cyan/magenta neon accents). Uses Orbitron font for headings. All pages share this stylesheet.

- **ideas/** folder – Individual idea pages (static HTML files). Each is a standalone page documenting one idea with Problem, Solution, and Impact sections.

### Design System

Inspired by **No Man's Sky** UI—minimalist, geometric, with muted sci-fi aesthetics.

- **Color Palette:**
  - Primary accent: `#4a9d6f` (muted teal/green) – headings, active states
  - Secondary accent: `#3d8659` (darker green) – hover states
  - Warm accent: `#d4a574` (warm gray/gold) – category labels
  - Primary background: `#0a0e27` (dark navy)
  - Secondary background: `#141d3e` (slate)
  - Text primary: `#c9d1d9` (light gray)
  - Text secondary: `#8b949e` (muted gray)
  - Borders: `#30363d` (subtle dark borders)

- **Typography:**
  - Font: Inter (clean, geometric sans-serif) – replaces Orbitron
  - Headings: 600 weight, uppercase, generous letter-spacing
  - Body: 400 weight, readable line-height (1.6-1.8)
  - Letter-spacing: 0.3-1px on all text for sci-fi feel

- **Components:**
  - `.idea-card` – Cards with subtle borders, muted background, smooth transitions, hover lift effect
  - `.tag-btn` – Minimal border styling, uppercase text, active state uses solid background
  - `.section` – Content blocks with bottom borders for visual separation
  - Tags: Small outlined pills with teal borders and backgrounds
  - Interactive elements use smooth `0.2s-0.3s` transitions

## Adding a New Idea

### Step 1: Create the Idea HTML File
Create a new file in `ideas/` folder (e.g., `ideas/your-idea-title.html`). Use this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Idea Title</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>

    <div class="container">
        <a href="../index.html" class="back">← Back</a>

        <h1>Your Idea Title</h1>

        <p class="description">
            Brief, compelling description of the idea.
        </p>

        <div class="section">
            <h2>Problem</h2>
            <p>Describe the problem this idea solves.</p>
        </div>

        <div class="section">
            <h2>Proposed Solution</h2>
            <ul>
                <li>Key feature or benefit</li>
                <li>Another benefit</li>
            </ul>
        </div>

        <div class="section">
            <h2>Impact</h2>
            <p>Describe the positive impact of implementing this idea.</p>
        </div>

    </div>

</body>
</html>
```

### Step 2: Register in data.js
Add an entry to the `ideas` array in `data.js`:

```javascript
{
    title: "Your Idea Title",
    file: "ideas/your-idea-title.html",
    category: "Games" | "Applications" | "Digital Systems",
    tags: ["tag1", "tag2", "tag3"]
}
```

Use lowercase, descriptive tags that can be shared across ideas for filtering.

### Step 3: Verify
- Check that the idea appears on the homepage
- Click the card to verify the page loads and links work
- Test the back link navigates to homepage
- Verify tag filtering works if using new tags

## Development Patterns

### Search & Filtering (index.html)
The homepage dynamically filters ideas based on:
- Text search (matches title and tags)
- Tag selection (toggle state, single tag at a time)

When modifying search logic, ensure both filters work independently and combined.

### Styling New Content
All new content should follow the design system. Key considerations:
- Use CSS custom properties or consistent hex values from the palette
- Add glow effects (`box-shadow: 0 0 10px rgba(0,255,255,0.3)`) for interactive elements
- Maintain backdrop blur on cards for depth
- Test on dark backgrounds to ensure readability

### Page Layout
Idea pages use a centered `.container` layout with:
- Back link at top
- h1 title with description
- Multiple `.section` divs for content blocks
- Semantic HTML (ul/li for lists, p for paragraphs)

## Testing Your Changes

Since this is a static site, test by opening files locally:
1. Open `index.html` in a browser to verify homepage rendering
2. Click idea cards to verify they load correctly
3. Test search and tag filtering
4. Verify responsive layout (try different viewport widths)
5. Check that all links (back buttons, idea cards) navigate correctly

No build step or test suite required.

## GitHub Pages Deployment

The site auto-deploys from the `main` branch to GitHub Pages. Commits to `main` are live within a few seconds. Be sure all content is ready before pushing.

## File Organization Rules

- Idea HTML files must be in `ideas/` folder
- All ideas must be registered in `data.js` to appear on homepage
- Keep relative paths consistent: idea pages use `../` to reference root-level files
- Use descriptive, lowercase filenames with hyphens (e.g., `mtg-arena-improvements.html`)
