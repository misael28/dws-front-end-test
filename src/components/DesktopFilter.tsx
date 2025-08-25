import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { addCategory, removeCategory, addAuthor, removeAuthor } from '@/app/filterSlice'
import type { Category, Author } from '@/types'

interface DesktopFilterProps {
  categories: Category[]
  authors: Author[]
}

export default function DesktopFilter({
  categories,
  authors
}: DesktopFilterProps) {
  const dispatch = useAppDispatch()
  
  const selectedCategories = useAppSelector(state => state.filter.selectedCategories)
  const selectedAuthors = useAppSelector(state => state.filter.selectedAuthors)

  const handleCategoryChange = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      dispatch(removeCategory(categoryId))
    } else {
      dispatch(addCategory(categoryId))
    }
  }
  
  const handleAuthorChange = (authorId: string) => {
    if (selectedAuthors.includes(authorId)) {
      dispatch(removeAuthor(authorId))
    } else {
      dispatch(addAuthor(authorId))
    }
  }

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
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
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
                checked={selectedAuthors.includes(author.id)}
                onChange={() => handleAuthorChange(author.id)}
                className="desktop-filter__checkbox"
              />
              <span className="desktop-filter__option-text">{author.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        className="desktop-filter__apply-btn"
        onClick={() => {}} // No need for apply filters since it's real-time
      >
        Filters Applied
      </button>
    </aside>
  )
} 