import React, { useState } from 'react';

interface FilterBarProps {
  onCategoryChange?: (category: string) => void;
  onAuthorChange?: (author: string) => void;
  onSortChange?: (sort: string) => void;
}

export default function FilterBar({ onCategoryChange, onAuthorChange, onSortChange }: FilterBarProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Category');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('Author');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isAuthorOpen, setIsAuthorOpen] = useState(false);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    onCategoryChange?.(category);
  };

  const handleAuthorSelect = (author: string) => {
    setSelectedAuthor(author);
    setIsAuthorOpen(false);
    onAuthorChange?.(author);
  };

  return (
    <div className="filter-bar">
      <div className="filter-bar__container">
        {/* Filter Dropdowns */}
        <div className="filter-dropdowns">
          {/* Category Dropdown */}
          <div className="filter-dropdown">
            <button
              className="filter-button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              aria-expanded={isCategoryOpen}
              aria-haspopup="listbox"
            >
              <span>{selectedCategory}</span>
              <svg 
                className={`filter-chevron ${isCategoryOpen ? 'open' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            
            {isCategoryOpen && (
              <div className="filter-dropdown-menu" role="listbox">
                <div 
                  className="filter-option" 
                  onClick={() => handleCategorySelect('All Categories')}
                  role="option"
                >
                  All Categories
                </div>
                <div 
                  className="filter-option" 
                  onClick={() => handleCategorySelect('Technology')}
                  role="option"
                >
                  Technology
                </div>
                <div 
                  className="filter-option" 
                  onClick={() => handleCategorySelect('Business')}
                  role="option"
                >
                  Business
                </div>
                <div 
                  className="filter-option" 
                  onClick={() => handleCategorySelect('Design')}
                  role="option"
                >
                  Design
                </div>
              </div>
            )}
          </div>

          {/* Author Dropdown */}
          <div className="filter-dropdown">
            <button
              className="filter-button"
              onClick={() => setIsAuthorOpen(!isAuthorOpen)}
              aria-expanded={isAuthorOpen}
              aria-haspopup="listbox"
            >
              <span>{selectedAuthor}</span>
              <svg 
                className={`filter-chevron ${isAuthorOpen ? 'open' : ''}`}
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            
            {isAuthorOpen && (
              <div className="filter-dropdown-menu" role="listbox">
                <div 
                  className="filter-option" 
                  onClick={() => handleAuthorSelect('All Authors')}
                  role="option"
                >
                  All Authors
                </div>
                <div 
                  className="filter-option" 
                  onClick={() => handleAuthorSelect('John Doe')}
                  role="option"
                >
                  John Doe
                </div>
                <div 
                  className="filter-option" 
                  onClick={() => handleAuthorSelect('Jane Smith')}
                  role="option"
                >
                  Jane Smith
                </div>
                <div 
                  className="filter-option" 
                  onClick={() => handleAuthorSelect('Mike Johnson')}
                  role="option"
                >
                  Mike Johnson
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sort Section */}
        <div className="filter-sort">
          <span className="sort-label">Newest first</span>
          <button 
            className="sort-button"
            onClick={() => onSortChange?.('newest')}
            aria-label="Sort by newest first"
          >
            <svg 
              className="sort-icon" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M7 13l5-5 5 5"/>
              <path d="M7 6l5 5 5-5"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 