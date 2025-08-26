# DWS Blog - Modern React Blog Platform

A **mobile-first**, **pixel-perfect** blog application built with React, featuring advanced filtering, real-time search, and a responsive design system. Built without external UI libraries for complete design control.

## ✨ Features

### 🎨 **Design System**
- **Mobile-First Approach**: Responsive design that works perfectly on all devices
- **Custom Typography**: Open Sans font family with comprehensive scale (H1-H3, Body, Caption)
- **Color Palette**: Neutral, Primary, Secondary, and Accent color systems
- **Component Library**: Reusable UI components with consistent styling

### 🔍 **Advanced Filtering & Search**
- **Real-Time Search**: Instant category search in the app bar
- **Smart Filters**: Desktop sidebar with category and author filtering
- **Mobile Filters**: Touch-friendly mobile filter bar
- **Sort Options**: Newest, oldest, and alphabetical sorting

### 📱 **Responsive Layout**
- **Adaptive Grid**: 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- **Sticky Navigation**: App bar and filters stay accessible while scrolling
- **Flexible Containers**: Layout grows with screen width on desktop

### 🚀 **Performance & UX**
- **RTK Query**: Efficient data fetching with automatic caching
- **Redux State**: Centralized state management for filters and UI
- **Lazy Loading**: Images load only when needed
- **Smooth Animations**: CSS transitions and hover effects

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite (Fast HMR & Build)
- **State Management**: Redux Toolkit + RTK Query
- **Styling**: SCSS with CSS Custom Properties
- **Routing**: React Router DOM
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

## 📁 Project Structure

```
dws-front-end-test/
├── src/
│   ├── app/                    # Redux store & slices
│   │   ├── store.ts           # Main store configuration
│   │   ├── uiSlice.ts         # UI state management
│   │   └── filterSlice.ts     # Filter state management
│   ├── components/             # Reusable UI components
│   │   ├── AppBar.tsx         # Header with search functionality
│   │   ├── PostCard.tsx       # Blog post preview cards
│   │   ├── Layout.tsx         # Main layout wrapper
│   │   ├── FilterBar.tsx      # Mobile filter interface
│   │   ├── DesktopFilter.tsx  # Desktop sidebar filters
│   │   └── SortControl.tsx    # Sorting dropdown
│   ├── pages/                  # Page components
│   │   ├── PostsPage.tsx      # Main blog listing
│   │   ├── PostDetailPage.tsx # Individual post view
│   │   ├── AuthorDetailPage.tsx # Author profile & posts
│   │   └── CategoryDetailPage.tsx # Category posts listing
│   ├── services/               # API & data layer
│   │   └── api.ts             # RTK Query endpoints
│   ├── styles/                 # SCSS styling system
│   │   ├── index.scss         # Main stylesheet
│   │   ├── typography.scss    # Font & text styles
│   │   ├── colors/            # Color system
│   │   └── components/        # Component-specific styles
│   ├── types/                  # TypeScript definitions
│   │   └── index.ts           # API response types
│   └── tests/                  # Test files
├── public/                     # Static assets
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dws-front-end-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm test` | Run unit tests with Vitest |
| `npm run lint` | Check code with ESLint |

## 🌐 API Integration

The application integrates with the DWS Tech Test Backend API:

**Base URL**: `https://tech-test-backend.dwsbrazil.io/`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/posts/` | Fetch all blog posts |
| `GET` | `/posts/{id}` | Fetch specific post by ID |
| `GET` | `/authors/` | Fetch all authors |
| `GET` | `/authors/{id}` | Fetch specific author by ID |
| `GET` | `/categories/` | Fetch all categories |
| `GET` | `/categories/{id}` | Fetch specific category by ID |

### Data Flow
1. **RTK Query** handles API calls with automatic caching
2. **Redux Store** manages filter state and UI interactions
3. **React Components** consume data and render UI
4. **Real-time updates** when filters change

## 🎨 Design System

### Typography Scale
```scss
--font-size-h1: 2.5rem      // Page titles
--font-size-h2: 2rem        // Section headers
--font-size-h3: 1.5rem      // Card titles
--font-size-body-large: 1.125rem  // Main content
--font-size-body-small: 0.875rem  // Secondary text
--font-size-caption: 0.75rem      // Labels & metadata
```

### Color Palette
```scss
// Neutral Colors
--neutral-lightest: #F0F0F2    // Background
--neutral-light: #C0C2C8       // Borders
--neutral-medium: #6B7280      // Secondary text
--neutral-darkest: #1F2937     // Primary text

// Primary Colors
--primary-100: #1E40AF        // Accents
--primary-200: #1E3A8A        // Buttons

// Secondary Colors
--secondary-100: #E94E6B      // Highlights
--secondary-200: #C53030      // Hover states
```

### Responsive Breakpoints
```scss
// Mobile First
@media (min-width: 640px)   // Tablet
@media (min-width: 768px)   // Large Tablet
@media (min-width: 1024px)  // Desktop
@media (min-width: 1280px)  // Large Desktop
```

## 🔧 Development

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Automatic code formatting
- **SCSS**: Modular CSS architecture

### State Management
```typescript
// Filter State
interface FilterState {
  selectedCategories: string[]
  selectedAuthors: string[]
  searchQuery: string
  sortOrder: 'newest' | 'oldest' | 'title'
}

// UI State
interface UIState {
  theme: 'light' | 'dark'
  search: string
  selectedPostId: string | null
}
```

### Component Architecture
- **Functional Components** with React Hooks
- **Custom Hooks** for reusable logic
- **Prop Types** with TypeScript interfaces
- **CSS Modules** for component-scoped styles

## 🧪 Testing

### Test Setup
- **Vitest**: Fast unit testing framework
- **React Testing Library**: Component testing utilities
- **MSW**: API mocking for tests

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 📱 Responsive Design

### Mobile (≤640px)
- Single column layout
- Touch-friendly filters
- Optimized spacing
- Compact navigation

### Tablet (641px-1023px)
- Two column grid
- Enhanced filter sidebar
- Improved typography
- Better content spacing

### Desktop (≥1024px)
- Three column grid
- Full sidebar filters
- Maximum content width
- Enhanced hover states

## ♿ Accessibility

- **Semantic HTML**: Proper landmarks and structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant
- **Focus Management**: Clear focus indicators

## 🚀 Performance

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Lazy loading and proper sizing
- **Bundle Optimization**: Tree shaking and minification
- **Caching Strategy**: RTK Query automatic caching
- **Responsive Images**: Appropriate sizes for each device

## 🔒 Security

- **Input Validation**: Type-safe data handling
- **XSS Prevention**: React's built-in protection
- **API Security**: HTTPS-only API calls
- **Error Boundaries**: Graceful error handling

## 📈 Future Enhancements

- [ ] Dark mode theme toggle
- [ ] Advanced search filters
- [ ] Pagination for large post lists
- [ ] Offline support with PWA
- [ ] Social sharing integration
- [ ] Comment system
- [ ] User authentication
- [ ] Admin dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Dentsu World Services** for the design requirements
- **React Team** for the amazing framework
- **Redux Team** for state management tools
- **Vite Team** for the build tooling

---

**Built with ❤️ using React, TypeScript, and SCSS**

For questions or support, please open an issue in the repository.