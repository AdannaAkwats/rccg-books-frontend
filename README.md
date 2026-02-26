TODO
1. Add details screen across reading mode 
2. Fix the chapter - needs to be pretty font
3. Fix the content
4. Fix the fonts in the previous and next. Also maybe change the colour 
5. Fix the url
5. Add the back to library
6. Add font change or size change
7. Think about how to store content to render it on the screen

# RCCG Books Platform - Frontend

A beautiful, accessible book reading platform built with React, TypeScript, and React Aria components. Read devotionals, lessons, and training materials by date or chapter.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

The app will be available at `http://localhost:5173`

## 📚 Project Structure

```
src/
├── App.tsx                          # Main app routes
├── main.tsx                         # Entry point
├── index.css                        # Global styles
├── CONFIG.ts                        # Configuration
├── LOCALE.ts                        # Localization strings
├── OnboardedBooksMetadata.ts        # Book metadata & content
│
├── LandingPage/
│   ├── LandingPage.tsx             # Home page
│   ├── Header.tsx                  # Top navigation
│   └── Footer.tsx                  # Footer
│
├── BrowseBooks/
│   └── BrowseBooks.tsx             # Book browsing page
│
├── BookDetail/
│   ├── BookDetail.tsx              # Book selection & control
│   └── ReadingView.tsx             # Content reading view
│
├── ContactUs/
│   └── ContactUs.tsx               # Contact page
│
├── Common/
│   ├── DatePickerSection.tsx       # Date picker component
│   ├── ReactAriaComponents/        # Accessible UI components
│   │   ├── DatePicker.tsx
│   │   ├── DateField.tsx
│   │   ├── Calendar.tsx
│   │   ├── Button.tsx
│   │   └── ... (40+ components)
│   └── toastQueue.ts               # Toast notifications
│
└── Designs/
    └── Styles.css                  # Design tokens & global styles
```

## 🎨 Design System

The platform supports three design themes:
- **Gold** - Warm, elegant (Open Heavens)
- **Green** - Fresh, calming (Sunday School Manual)
- **Purple** - Professional, creative (Workers in Training)

### Color Palette

```css
--gold: #c8a24d
--green-btn: #4f7b4d
--purple-btn: #5a476b
--ink: #4a3f2b
--cream: #fffdf8
--border-warm: #e5dac5
```

See [src/Designs/Styles.css](src/Designs/Styles.css) for complete theme definitions.

## 📖 Features

### Book Reading Modes
- **By Date**: Select a specific date to read devotionals
- **By Chapter**: Browse and search chapters
- **Smart Navigation**: Move between chapters/dates with Previous/Next buttons

### Typography & Layout
- Elegant serif typography (Georgia, Playfair Display)
- Drop cap first letters in gold/theme color
- Text selection highlighting in theme colors
- Responsive design for all screen sizes

### Accessibility
- Built with [React Aria](https://react-spectrum.adobe.com/react-aria/) components
- Keyboard navigation support
- WCAG 2.1 compliant
- Screen reader friendly

## 🔄 Routing

```
/                              Home page
/library                       Browse all books
/book/:bookId                  Book selection screen
/book/:bookId/:contentId       Reading view (date or chapter)
/contact                       Contact page
```

**Content ID Format:**
- Dates: `2026-02-18` (ISO format)
- Chapters: Chapter name (e.g., `foo`, `bar`)

## 📝 Adding Books & Content

Edit [src/OnboardedBooksMetadata.ts](src/OnboardedBooksMetadata.ts):

```typescript
export const ONBOARDED_BOOKS: TBookMetadata[] = [
  {
    header: "Daily devotional",
    title: "Open Heavens 2025 / 2026",
    description: "Read by date • Scripture-centered reflections",
    buttonLabel: "Read Today's Devotional",
    design: "gold",
    id: "open-heavens-2025-2026",
    readingModes: ["date", "chapter"],
    chapters: ["Chapter 1", "Chapter 2", ...],
    content: {
      "2026-01-14": {
        title: "Commanded Blessing",
        content: "The Lord is my shepherd..."
      },
      "chapter-1": {
        title: "Chapter 1: Introduction",
        content: "Welcome to this training manual..."
      }
    }
  }
];
```

## 🛠️ Development

### Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Prod build with tsc, eslint, vite |
| `npm run lint` | Run ESLint |
| `npm run run` | Full build + server (tsc, lint, build, serve) |

### Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9+
- **Build Tool**: Vite
- **Linter**: ESLint 9.39.1
- **UI Components**: React Aria Components 1.15.1
- **Routing**: React Router DOM 6.x
- **Date Handling**: @internationalized/date
- **Icons**: Lucide React

### Configuration

- **TypeScript**: [tsconfig.json](tsconfig.json) with `verbatimModuleSyntax: true`
- **ESLint**: [eslint.config.js](eslint.config.js)
- **Vite**: [vite.config.ts](vite.config.ts)

## 🎯 Component Architecture

### BookDetail (Selector State)
The selection interface where users choose reading mode and specific content:
- Mode toggle buttons (Date/Chapter)
- Date picker or chapter search
- Read button (disabled until content selected)

### ReadingView (Reading State)
The content display view with:
- Back button to return to selector
- Styled content with drop caps
- Previous/Next navigation
- Theme-aware styling

## 📱 Responsive Design

- Mobile-first approach
- Optimized layouts for screens 320px - 1920px
- Touch-friendly button targets (48px minimum)
- Readable typography across all sizes

## 🔐 Best Practices

- Type-safe imports with `type` keyword for type-only imports
- Semantic HTML with ARIA attributes
- CSS custom properties for theming
- Component separation of concerns
- Test-friendly selectors (data-testid)

## 📄 License

RCCG Books Platform © 2026

## 🤝 Contributing

When contributing:
1. Follow the existing code style
2. Use semantic component names
3. Add proper TypeScript types
4. Use CSS classes following `lp__*` naming convention
5. Test responsive layouts
