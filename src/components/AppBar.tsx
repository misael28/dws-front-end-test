import React, { useState } from 'react';

export default function AppBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="app-bar">
      <div className="app-bar__container">
        {/* Brand Section */}
        <div className="app-bar__brand">
          <div className="brand-logo">
            <span className="brand-name">dentsu</span>
            <span className="brand-subtitle">world services</span>
          </div>
        </div>

        {/* Search Section */}
        <div className="app-bar__search">
          {isSearchOpen ? (
            <div className="search-expanded">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <button 
                className="search-close"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                ×
              </button>
            </div>
          ) : (
            <button
              className="search-toggle"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Open search"
            >
              <svg 
                className="search-icon" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
} 