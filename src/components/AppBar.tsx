import React, { useState, useEffect, useRef } from 'react';
import { useGetCategoriesQuery } from '@/services/api';
import { useAppDispatch } from '@/app/hooks';
import { addCategory, removeCategory } from '@/app/filterSlice';
import type { Category } from '@/types';

export default function AppBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  
  const { data: categories = [] } = useGetCategoriesQuery();
  
  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSearchFocus = () => {
    setShowCategoryDropdown(true);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowCategoryDropdown(true);
  };
  
  const handleCategorySelect = (category: Category) => {
    dispatch(addCategory(category.id));
    setSearchQuery('');
    setShowCategoryDropdown(false);
    setIsSearchOpen(false);
  };

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
        <div className="app-bar__search" ref={searchRef}>
          {isSearchOpen ? (
            <div className="search-expanded">
              <input
                type="text"
                placeholder="Search categories..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                autoFocus
              />
              <button 
                className="search-close"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                  setShowCategoryDropdown(false);
                }}
                aria-label="Close search"
              >
                ×
              </button>
              
              {/* Category Dropdown */}
              {showCategoryDropdown && (
                <div className="search-dropdown">
                  {searchQuery && filteredCategories.length > 0 ? (
                    <div className="dropdown-categories">
                      {filteredCategories.map((category) => (
                        <div 
                          key={category.id} 
                          className="dropdown-category"
                          onClick={() => handleCategorySelect(category)}
                        >
                          <span className="category-name">{category.name}</span>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery && filteredCategories.length === 0 ? (
                    <div className="dropdown-no-results">
                      No categories found for "{searchQuery}"
                    </div>
                  ) : (
                    <div className="dropdown-placeholder">
                      Type to search categories...
                    </div>
                  )}
                </div>
              )}
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
                stroke="white" 
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