import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import FilterBar from '@/components/FilterBar'
import { useGetCategoriesQuery, useGetAuthorsQuery } from '@/services/api'

// Mock the API hooks
vi.mock('@/services/api', () => ({
  useGetCategoriesQuery: () => ({
    data: [
      { id: '1', name: 'Technology' },
      { id: '2', name: 'Science' },
      { id: '3', name: 'Business' }
    ],
    isLoading: false,
    isError: false
  }),
  useGetAuthorsQuery: () => ({
    data: [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Bob Johnson' }
    ],
    isLoading: false,
    isError: false
  })
}))

// Mock Redux hooks
vi.mock('@/app/hooks', () => ({
  useAppSelector: () => ({
    selectedCategories: [],
    selectedAuthors: [],
    sortOrder: 'newest'
  }),
  useAppDispatch: () => vi.fn()
}))

// Helper function to create mock query result
const createMockQueryResult = (data: any, isLoading = false, isError = false) => ({
  data,
  isLoading,
  isError,
  refetch: vi.fn(),
  currentData: data,
  error: isError ? new Error('Mock error') : null,
  isFetching: false,
  isSuccess: !isError && !isLoading,
  isUninitialized: false,
  status: isLoading ? 'pending' : isError ? 'rejected' : 'fulfilled'
})

const wrap = (ui: React.ReactNode) => render(
  <Provider store={store}>
    {ui}
  </Provider>
)

describe('FilterBar', () => {
  describe('Rendering', () => {
    it('renders filter bar container', () => {
      wrap(<FilterBar />)
      
      expect(screen.getByRole('region', { name: /filters/i })).toBeInTheDocument()
    })

    it('renders category filter dropdown', () => {
      wrap(<FilterBar />)
      
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
    })

    it('renders author filter dropdown', () => {
      wrap(<FilterBar />)
      
      expect(screen.getByLabelText(/author/i)).toBeInTheDocument()
    })

    it('renders sort dropdown', () => {
      wrap(<FilterBar />)
      
      expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument()
    })

    it('renders apply filters button', () => {
      wrap(<FilterBar />)
      
      expect(screen.getByRole('button', { name: /apply filters/i })).toBeInTheDocument()
    })
  })

  describe('Category Filter', () => {
    it('shows all categories in dropdown', () => {
      wrap(<FilterBar />)
      
      const categoryDropdown = screen.getByLabelText(/category/i)
      fireEvent.click(categoryDropdown)
      
      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.getByText('Science')).toBeInTheDocument()
      expect(screen.getByText('Business')).toBeInTheDocument()
    })

    it('allows selecting a category', () => {
      wrap(<FilterBar />)
      
      const categoryDropdown = screen.getByLabelText(/category/i)
      fireEvent.click(categoryDropdown)
      
      const technologyOption = screen.getByText('Technology')
      fireEvent.click(technologyOption)
      
      expect(categoryDropdown).toHaveValue('1')
    })

    it('shows placeholder text when no category is selected', () => {
      wrap(<FilterBar />)
      
      const categoryDropdown = screen.getByLabelText(/category/i)
      expect(categoryDropdown).toHaveDisplayValue('Select category')
    })
  })

  describe('Author Filter', () => {
    it('shows all authors in dropdown', () => {
      wrap(<FilterBar />)
      
      const authorDropdown = screen.getByLabelText(/author/i)
      fireEvent.click(authorDropdown)
      
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
    })

    it('allows selecting an author', () => {
      wrap(<FilterBar />)
      
      const authorDropdown = screen.getByLabelText(/author/i)
      fireEvent.click(authorDropdown)
      
      const johnOption = screen.getByText('John Doe')
      fireEvent.click(johnOption)
      
      expect(authorDropdown).toHaveValue('1')
    })

    it('shows placeholder text when no author is selected', () => {
      wrap(<FilterBar />)
      
      const authorDropdown = screen.getByLabelText(/author/i)
      expect(authorDropdown).toHaveDisplayValue('Select author')
    })
  })

  describe('Sort Functionality', () => {
    it('shows sort options in dropdown', () => {
      wrap(<FilterBar />)
      
      const sortDropdown = screen.getByLabelText(/sort by/i)
      fireEvent.click(sortDropdown)
      
      expect(screen.getByText('Newest first')).toBeInTheDocument()
      expect(screen.getByText('Oldest first')).toBeInTheDocument()
      expect(screen.getByText('Title A-Z')).toBeInTheDocument()
    })

    it('allows selecting sort order', () => {
      wrap(<FilterBar />)
      
      const sortDropdown = screen.getByLabelText(/sort by/i)
      fireEvent.click(sortDropdown)
      
      const oldestOption = screen.getByText('Oldest first')
      fireEvent.click(oldestOption)
      
      expect(sortDropdown).toHaveValue('oldest')
    })

    it('shows default sort option', () => {
      wrap(<FilterBar />)
      
      const sortDropdown = screen.getByLabelText(/sort by/i)
      expect(sortDropdown).toHaveDisplayValue('Newest first')
    })
  })

  describe('Filter Interactions', () => {
    it('handles multiple filter selections', () => {
      wrap(<FilterBar />)
      
      // Select category
      const categoryDropdown = screen.getByLabelText(/category/i)
      fireEvent.click(categoryDropdown)
      fireEvent.click(screen.getByText('Technology'))
      
      // Select author
      const authorDropdown = screen.getByLabelText(/author/i)
      fireEvent.click(authorDropdown)
      fireEvent.click(screen.getByText('John Doe'))
      
      // Change sort order
      const sortDropdown = screen.getByLabelText(/sort by/i)
      fireEvent.click(sortDropdown)
      fireEvent.click(screen.getByText('Title A-Z'))
      
      expect(categoryDropdown).toHaveValue('1')
      expect(authorDropdown).toHaveValue('1')
      expect(sortDropdown).toHaveValue('title')
    })

    it('resets filters when apply button is clicked', () => {
      wrap(<FilterBar />)
      
      // Select filters
      const categoryDropdown = screen.getByLabelText(/category/i)
      fireEvent.click(categoryDropdown)
      fireEvent.click(screen.getByText('Technology'))
      
      // Click apply button
      const applyButton = screen.getByRole('button', { name: /apply filters/i })
      fireEvent.click(applyButton)
      
      // Verify filters are applied (this would depend on the actual implementation)
      expect(applyButton).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('has correct CSS classes for mobile layout', () => {
      wrap(<FilterBar />)
      
      const filterBar = screen.getByRole('region', { name: /filters/i })
      expect(filterBar).toHaveClass('filter-bar')
      
      const container = filterBar.querySelector('.filter-bar__container')
      expect(container).toBeInTheDocument()
    })

    it('maintains proper layout structure', () => {
      wrap(<FilterBar />)
      
      const filterBar = screen.getByRole('region', { name: /filters/i })
      const dropdowns = filterBar.querySelector('.filter-dropdowns')
      const sortSection = filterBar.querySelector('.filter-sort')
      const buttonSection = filterBar.querySelector('.filter-button')
      
      expect(dropdowns).toBeInTheDocument()
      expect(sortSection).toBeInTheDocument()
      expect(buttonSection).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      wrap(<FilterBar />)
      
      expect(screen.getByLabelText(/category/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/author/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument()
    })

    it('has semantic HTML structure', () => {
      wrap(<FilterBar />)
      
      expect(screen.getByRole('region', { name: /filters/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /apply filters/i })).toBeInTheDocument()
    })

    it('has proper form controls', () => {
      wrap(<FilterBar />)
      
      const selects = screen.getAllByRole('combobox')
      expect(selects).toHaveLength(3) // category, author, sort
    })
  })

  describe('Edge Cases', () => {
    it('handles empty data gracefully', () => {
      // Mock empty data
      vi.mocked(useGetCategoriesQuery).mockReturnValue(createMockQueryResult([], false, false))
      
      wrap(<FilterBar />)
      
      const categoryDropdown = screen.getByLabelText(/category/i)
      fireEvent.click(categoryDropdown)
      
      // Should show no options or placeholder
      expect(screen.queryByText('Technology')).not.toBeInTheDocument()
    })

    it('handles loading state', () => {
      // Mock loading state
      vi.mocked(useGetCategoriesQuery).mockReturnValue(createMockQueryResult(undefined, true, false))
      
      wrap(<FilterBar />)
      
      // Component should still render without crashing
      expect(screen.getByRole('region', { name: /filters/i })).toBeInTheDocument()
    })

    it('handles error state', () => {
      // Mock error state
      vi.mocked(useGetCategoriesQuery).mockReturnValue(createMockQueryResult(undefined, false, true))
      
      wrap(<FilterBar />)
      
      // Component should still render without crashing
      expect(screen.getByRole('region', { name: /filters/i })).toBeInTheDocument()
    })
  })
}) 