import { useState } from 'react'
import type { Category, Author } from '@/types'

interface DesktopFilterProps {
  categories: Category[]
  authors: Author[]
  selectedCategories: string[]
  selectedAuthors: string[]
  onCategoryChange: (categoryId: string) => void
  onAuthorChange: (authorId: string) => void
  onApplyFilters: () => void
}

export default function DesktopFilter({
  categories,
  authors,
  selectedCategories,
  selectedAuthors,
  onCategoryChange,
  onAuthorChange,
  onApplyFilters
}: DesktopFilterProps) {
  return (
    <aside className="desktop-filter">
      <div className="desktop-filter__header">
        <svg className="desktop-filter__icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 4h14M3 10h14M3 16h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 4v12M13 4v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="desktop-filter__title">Filters</span>
      </div>

      <div className="desktop-filter__section">
        <h3 className="desktop-filter__section-title">Category</h3>
        <div className="desktop-filter__options">
          {categories.map((category) => (
            <label key={category.id} className="desktop-filter__option">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id.toString())}
                onChange={() => onCategoryChange(category.id.toString())}
                className="desktop-filter__checkbox"
              />
              <span className="desktop-filter__option-text">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="desktop-filter__section">
        <h3 className="desktop-filter__section-title">Author</h3>
        <div className="desktop-filter__options">
          {authors.map((author) => (
            <label key={author.id} className="desktop-filter__option">
              <input
                type="checkbox"
                checked={selectedAuthors.includes(author.id.toString())}
                onChange={() => onAuthorChange(author.id.toString())}
                className="desktop-filter__checkbox"
              />
              <span className="desktop-filter__option-text">{author.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        className="desktop-filter__apply-btn"
        onClick={onApplyFilters}
      >
        Apply filters
      </button>
    </aside>
  )
} 