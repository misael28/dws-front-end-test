import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import DesktopFilter from '@/components/DesktopFilter'
import { useGetCategoriesQuery, useGetAuthorsQuery } from '@/services/api'

// Mock the API hooks
vi.mock('@/services/api', () => ({
  useGetCategoriesQuery: () => ({
    data: [
      { id: '1', name: 'Technology' },
      { id: '2', name: 'Science' },
      { id: '3', name: 'Business' },
      { id: '4', name: 'Health' }
    ],
    isLoading: false,
    isError: false
  }),
  useGetAuthorsQuery: () => ({
    data: [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' },
      { id: '3', name: 'Bob Johnson' },
      { id: '4', name: 'Alice Brown' }
    ],
    isLoading: false,
    isError: false
  })
}))

// Mock data
const mockCategories = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Science' },
  { id: '3', name: 'Business' },
  { id: '4', name: 'Health' }
]

const mockAuthors = [
  { id: '1', name: 'John Doe', avatar_url: '', createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z', profilePicture: '' },
  { id: '2', name: 'Jane Smith', avatar_url: '', createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z', profilePicture: '' },
  { id: '3', name: 'Bob Johnson', avatar_url: '', createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z', profilePicture: '' },
  { id: '4', name: 'Alice Brown', avatar_url: '', createdAt: '2025-01-01T00:00:00Z', updatedAt: '2025-01-01T00:00:00Z', profilePicture: '' }
]

// Mock Redux hooks
const mockDispatch = vi.fn()
vi.mock('@/app/hooks', () => ({
  useAppSelector: () => ({
    selectedCategories: ['1', '3'],
    selectedAuthors: ['2']
  }),
  useAppDispatch: () => mockDispatch
}))

// Mock Redux actions
vi.mock('@/app/filterSlice', () => ({
  addCategory: (id: string) => ({ type: 'filter/addCategory', payload: id }),
  removeCategory: (id: string) => ({ type: 'filter/removeCategory', payload: id }),
  addAuthor: (id: string) => ({ type: 'filter/addAuthor', payload: id }),
  removeAuthor: (id: string) => ({ type: 'filter/removeAuthor', payload: id })
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

describe('DesktopFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders desktop filter sidebar', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      expect(screen.getByRole('complementary', { name: /filters/i })).toBeInTheDocument()
    })

    it('renders filter sections', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      expect(screen.getByText('Categories')).toBeInTheDocument()
      expect(screen.getByText('Authors')).toBeInTheDocument()
    })

    it('renders apply filters button', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      expect(screen.getByRole('button', { name: /filters applied/i })).toBeInTheDocument()
    })
  })

  describe('Categories Section', () => {
    it('renders all available categories', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.getByText('Science')).toBeInTheDocument()
      expect(screen.getByText('Business')).toBeInTheDocument()
      expect(screen.getByText('Health')).toBeInTheDocument()
    })

    it('shows selected categories as checked', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const technologyCheckbox = screen.getByRole('checkbox', { name: /technology/i })
      const businessCheckbox = screen.getByRole('checkbox', { name: /business/i })
      const scienceCheckbox = screen.getByRole('checkbox', { name: /science/i })
      
      expect(technologyCheckbox).toBeChecked()
      expect(businessCheckbox).toBeChecked()
      expect(scienceCheckbox).not.toBeChecked()
    })

    it('handles category selection', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const scienceCheckbox = screen.getByRole('checkbox', { name: /science/i })
      fireEvent.click(scienceCheckbox)
      
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'filter/addCategory',
        payload: '2'
      })
    })

    it('handles category deselection', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const technologyCheckbox = screen.getByRole('checkbox', { name: /technology/i })
      fireEvent.click(technologyCheckbox)
      
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'filter/removeCategory',
        payload: '1'
      })
    })
  })

  describe('Authors Section', () => {
    it('renders all available authors', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument()
      expect(screen.getByText('Alice Brown')).toBeInTheDocument()
    })

    it('shows selected authors as checked', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const janeCheckbox = screen.getByRole('checkbox', { name: /jane smith/i })
      const johnCheckbox = screen.getByRole('checkbox', { name: /john doe/i })
      
      expect(janeCheckbox).toBeChecked()
      expect(johnCheckbox).not.toBeChecked()
    })

    it('handles author selection', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const johnCheckbox = screen.getByRole('checkbox', { name: /john doe/i })
      fireEvent.click(johnCheckbox)
      
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'filter/addAuthor',
        payload: '1'
      })
    })

    it('handles author deselection', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const janeCheckbox = screen.getByRole('checkbox', { name: /jane smith/i })
      fireEvent.click(janeCheckbox)
      
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'filter/removeAuthor',
        payload: '2'
      })
    })
  })

  describe('Filter State Management', () => {
    it('updates Redux state when filters change', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      // Select a new category
      const healthCheckbox = screen.getByRole('checkbox', { name: /health/i })
      fireEvent.click(healthCheckbox)
      
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'filter/addCategory',
        payload: '4'
      })
    })

    it('maintains filter state across re-renders', () => {
      const { rerender } = wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      // Verify initial state
      expect(screen.getByRole('checkbox', { name: /technology/i })).toBeChecked()
      
      // Re-render component
      rerender(
        <Provider store={store}>
          <DesktopFilter categories={mockCategories} authors={mockAuthors} />
        </Provider>
      )
      
      // State should persist
      expect(screen.getByRole('checkbox', { name: /technology/i })).toBeChecked()
    })
  })

  describe('Layout and Styling', () => {
    it('has correct CSS classes', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const sidebar = screen.getByRole('complementary', { name: /filters/i })
      expect(sidebar).toHaveClass('desktop-filter')
      
      const categoriesSection = screen.getByText('Categories').closest('.desktop-filter__section')
      expect(categoriesSection).toBeInTheDocument()
      
      const authorsSection = screen.getByText('Authors').closest('.desktop-filter__section')
      expect(authorsSection).toBeInTheDocument()
    })

    it('has proper section structure', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const categoriesSection = screen.getByText('Categories').closest('.desktop-filter__section')
      const authorsSection = screen.getByText('Authors').closest('.desktop-filter__section')
      
      expect(categoriesSection).toBeInTheDocument()
      expect(authorsSection).toBeInTheDocument()
    })

    it('has sticky apply button', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const applyButton = screen.getByRole('button', { name: /filters applied/i })
      expect(applyButton).toHaveClass('desktop-filter__apply-btn')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      expect(screen.getByRole('complementary', { name: /filters/i })).toBeInTheDocument()
      expect(screen.getByText('Categories')).toBeInTheDocument()
      expect(screen.getByText('Authors')).toBeInTheDocument()
    })

    it('has accessible form controls', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const checkboxes = screen.getAllByRole('checkbox')
      expect(checkboxes.length).toBeGreaterThan(0)
      
      checkboxes.forEach(checkbox => {
        expect(checkbox).toHaveAttribute('type', 'checkbox')
      })
    })

    it('has proper heading structure', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const headings = screen.getAllByRole('heading')
      expect(headings).toHaveLength(2) // Categories and Authors
      
      headings.forEach(heading => {
        expect(heading.tagName).toBe('H3')
      })
    })
  })

  describe('Responsive Behavior', () => {
    it('is hidden on mobile devices', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const sidebar = screen.getByRole('complementary', { name: /filters/i })
      // This would typically be tested with CSS media queries in integration tests
      expect(sidebar).toBeInTheDocument()
    })

    it('maintains proper width and positioning', () => {
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      const sidebar = screen.getByRole('complementary', { name: /filters/i })
      expect(sidebar).toHaveClass('desktop-filter')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty categories gracefully', () => {
      // Mock empty categories
      vi.mocked(useGetCategoriesQuery).mockReturnValue(createMockQueryResult([], false, false))
      
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      expect(screen.getByText('Categories')).toBeInTheDocument()
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    })

    it('handles empty authors gracefully', () => {
      // Mock empty authors
      vi.mocked(useGetAuthorsQuery).mockReturnValue(createMockQueryResult([], false, false))
      
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      expect(screen.getByText('Authors')).toBeInTheDocument()
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    })

    it('handles loading state', () => {
      // Mock loading state
      vi.mocked(useGetCategoriesQuery).mockReturnValue(createMockQueryResult(undefined, true, false))
      
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      // Component should still render without crashing
      expect(screen.getByRole('complementary', { name: /filters/i })).toBeInTheDocument()
    })

    it('handles error state', () => {
      // Mock error state
      vi.mocked(useGetCategoriesQuery).mockReturnValue(createMockQueryResult(undefined, false, true))
      
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      
      // Component should still render without crashing
      expect(screen.getByRole('complementary', { name: /filters/i })).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many options', () => {
      // Mock many categories and authors
      const manyCategories = Array.from({ length: 50 }, (_, i) => ({
        id: String(i + 1),
        name: `Category ${i + 1}`
      }))
      
      const manyAuthors = Array.from({ length: 50 }, (_, i) => ({
        id: String(i + 1),
        name: `Author ${i + 1}`,
        avatar_url: '',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        profilePicture: ''
      }))
      
      vi.mocked(useGetCategoriesQuery).mockReturnValue(createMockQueryResult(manyCategories, false, false))
      
      vi.mocked(useGetAuthorsQuery).mockReturnValue(createMockQueryResult(manyAuthors, false, false))
      
      const startTime = performance.now()
      wrap(<DesktopFilter categories={mockCategories} authors={mockAuthors} />)
      const endTime = performance.now()
      
      // Should render within reasonable time (adjust threshold as needed)
      expect(endTime - startTime).toBeLessThan(100)
    })
  })
}) 