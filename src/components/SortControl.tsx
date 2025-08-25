import { useState } from 'react'

interface SortControlProps {
  currentSort: string
  onSortChange: (sort: string) => void
}

export default function SortControl({ currentSort, onSortChange }: SortControlProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'title', label: 'Title A-Z' },
    { value: 'author', label: 'Author A-Z' }
  ]

  const currentOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0]

  const handleSortChange = (sortValue: string) => {
    onSortChange(sortValue)
    setIsOpen(false)
  }

  return (
    <div className="sort-control">
      <div className="sort-control__label">Sort by:</div>
      <div className="sort-control__selection">
        <button 
          className="sort-control__button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="sort-control__text">{currentOption.label}</span>
          <svg 
            className={`sort-control__icon ${isOpen ? 'open' : ''}`}
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {isOpen && (
          <div className="sort-control__dropdown">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={`sort-control__option ${option.value === currentSort ? 'active' : ''}`}
                onClick={() => handleSortChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 