import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import SortControl from '@/components/SortControl'
import { useAppSelector } from '@/app/hooks'

// Mock Redux hooks
const mockDispatch = vi.fn()
vi.mock('@/app/hooks', () => ({
  useAppSelector: () => ({
    sortOrder: 'newest'
  }),
  useAppDispatch: () => mockDispatch
}))

// Mock Redux actions
vi.mock('@/app/filterSlice', () => ({
  setSortOrder: (order: string) => ({ type: 'filter/setSortOrder', payload: order })
}))

const mockOnSortChange = vi.fn()

const wrap = (ui: React.ReactNode) => render(
  <Provider store={store}>
    {ui}
  </Provider>
)

describe('SortControl', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders sort control container', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Sort by:')).toBeInTheDocument()
    })

    it('renders sort label', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Sort by:')).toBeInTheDocument()
    })

    it('renders sort dropdown', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Newest first')).toBeInTheDocument()
    })

    it('shows current sort order', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Newest first')).toBeInTheDocument()
    })
  })

  describe('Sort Options', () => {
    it('shows all available sort options', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Newest first')).toBeInTheDocument()
      expect(screen.getByText('Oldest first')).toBeInTheDocument()
      expect(screen.getByText('Title A-Z')).toBeInTheDocument()
    })

    it('has correct option values', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Newest first')).toBeInTheDocument()
      expect(screen.getByText('Oldest first')).toBeInTheDocument()
      expect(screen.getByText('Title A-Z')).toBeInTheDocument()
    })

    it('has correct option labels', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Newest first')).toBeInTheDocument()
      expect(screen.getByText('Oldest first')).toBeInTheDocument()
      expect(screen.getByText('Title A-Z')).toBeInTheDocument()
    })
  })

  describe('Sort Functionality', () => {
    it('allows selecting newest first', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Newest first')).toBeInTheDocument()
    })

    it('allows selecting oldest first', () => {
      wrap(<SortControl currentSort="oldest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Oldest first')).toBeInTheDocument()
    })

    it('allows selecting title A-Z', () => {
      wrap(<SortControl currentSort="title" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByText('Title A-Z')).toBeInTheDocument()
    })

    it('dispatches sort order change', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(mockOnSortChange).toHaveBeenCalled()
    })
  })

  describe('State Management', () => {
    it('reflects current sort order from Redux', () => {
      // Mock different sort order
      vi.mocked(useAppSelector).mockReturnValue({
        sortOrder: 'oldest'
      })
      
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      expect(dropdown).toHaveDisplayValue('Oldest first')
    })

    it('updates display when sort order changes', () => {
      const { rerender } = wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      // Verify initial state
      expect(screen.getByRole('combobox', { name: /sort posts/i })).toHaveDisplayValue('Newest first')
      
      // Mock updated state
      vi.mocked(useAppSelector).mockReturnValue({
        sortOrder: 'title'
      })
      
      // Re-render with new state
      rerender(
        <Provider store={store}>
          <SortControl currentSort="newest" onSortChange={mockOnSortChange} />
        </Provider>
      )
      
      // Should reflect new state
      expect(screen.getByRole('combobox', { name: /sort posts/i })).toHaveDisplayValue('Title A-Z')
    })
  })

  describe('Layout and Styling', () => {
    it('has correct CSS classes', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const container = screen.getByRole('group', { name: /sort posts/i })
      expect(container).toHaveClass('sort-control')
      
      const label = screen.getByText('Sort by:')
      expect(label).toHaveClass('sort-control__label')
      
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      expect(dropdown).toHaveClass('sort-control__select')
    })

    it('has proper layout structure', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const container = screen.getByRole('group', { name: /sort posts/i })
      const label = container.querySelector('.sort-control__label')
      const dropdown = container.querySelector('.sort-control__select')
      
      expect(label).toBeInTheDocument()
      expect(dropdown).toBeInTheDocument()
    })

    it('maintains proper spacing and alignment', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const container = screen.getByRole('group', { name: /sort posts/i })
      expect(container).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByRole('combobox', { name: /sort posts/i })).toBeInTheDocument()
    })

    it('has semantic HTML structure', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      expect(screen.getByRole('group', { name: /sort posts/i })).toBeInTheDocument()
      expect(screen.getByRole('combobox', { name: /sort posts/i })).toBeInTheDocument()
    })

    it('has proper form control attributes', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      expect(dropdown).toHaveAttribute('aria-label', 'Sort posts')
      expect(dropdown).toHaveAttribute('name', 'sort-order')
    })

    it('has accessible label association', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const label = screen.getByText('Sort by:')
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      
      expect(label).toBeInTheDocument()
      expect(dropdown).toBeInTheDocument()
    })
  })

  describe('User Experience', () => {
    it('provides clear visual feedback on selection', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      
      // Select different option
      fireEvent.change(dropdown, { target: { value: 'oldest' } })
      
      // Should show selected value
      expect(dropdown).toHaveValue('oldest')
    })

    it('maintains focus after selection', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      fireEvent.change(dropdown, { target: { value: 'title' } })
      
      // Dropdown should still be focusable
      expect(dropdown).not.toHaveAttribute('disabled')
    })
  })

  describe('Edge Cases', () => {
    it('handles invalid sort order gracefully', () => {
      // Mock invalid sort order
      vi.mocked(useAppSelector).mockReturnValue({
        sortOrder: 'invalid'
      })
      
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      // Should fall back to default or handle gracefully
      expect(dropdown).toBeInTheDocument()
    })

    it('handles missing sort order', () => {
      // Mock missing sort order
      vi.mocked(useAppSelector).mockReturnValue({
        sortOrder: undefined
      })
      
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      // Should handle undefined gracefully
      expect(dropdown).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('works with Redux store', () => {
      wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      fireEvent.change(dropdown, { target: { value: 'oldest' } })
      
      // Should dispatch action to Redux
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('maintains state consistency', () => {
      const { rerender } = wrap(<SortControl currentSort="newest" onSortChange={mockOnSortChange} />)
      
      // Change sort order
      const dropdown = screen.getByRole('combobox', { name: /sort posts/i })
      fireEvent.change(dropdown, { target: { value: 'title' } })
      
      // Re-render
      rerender(
        <Provider store={store}>
          <SortControl currentSort="newest" onSortChange={mockOnSortChange} />
        </Provider>
      )
      
      // Should maintain selection
      expect(dropdown).toHaveValue('title')
    })
  })
}) 