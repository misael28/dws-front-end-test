import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import AppBar from '@/components/AppBar'

// Mock the API hook
vi.mock('@/services/api', () => ({
  useGetCategoriesQuery: () => ({
    data: [
      { id: '1', name: 'Technology' },
      { id: '2', name: 'Science' },
      { id: '3', name: 'Business' }
    ],
    isLoading: false,
    isError: false
  })
}))

// Mock Redux hooks
vi.mock('@/app/hooks', () => ({
  useAppDispatch: () => vi.fn(),
  useAppSelector: () => ({})
}))

const wrap = (ui: React.ReactNode) => render(
  <Provider store={store}>
    {ui}
  </Provider>
)

describe('AppBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Brand Section', () => {
    it('renders dentsu world services branding', () => {
      wrap(<AppBar />)
      
      expect(screen.getByText('dentsu')).toBeInTheDocument()
      expect(screen.getByText('world services')).toBeInTheDocument()
    })

    it('has correct brand styling classes', () => {
      wrap(<AppBar />)
      
      const brandName = screen.getByText('dentsu')
      const brandSubtitle = screen.getByText('world services')
      
      expect(brandName).toHaveClass('brand-name')
      expect(brandSubtitle).toHaveClass('brand-subtitle')
    })
  })

  describe('Search Functionality', () => {
    it('shows search toggle button by default', () => {
      wrap(<AppBar />)
      
      const searchButton = screen.getByLabelText('Open search')
      expect(searchButton).toBeInTheDocument()
    })

    it('expands search input when search button is clicked', async () => {
      wrap(<AppBar />)
      
      const searchButton = screen.getByLabelText('Open search')
      fireEvent.click(searchButton)
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search categories...')).toBeInTheDocument()
      })
    })

    it('shows close button when search is expanded', async () => {
      wrap(<AppBar />)
      
      const searchButton = screen.getByLabelText('Open search')
      fireEvent.click(searchButton)
      
      await waitFor(() => {
        expect(screen.getByLabelText('Close search')).toBeInTheDocument()
      })
    })

    it('closes search when close button is clicked', async () => {
      wrap(<AppBar />)
      
      // Open search
      const searchButton = screen.getByLabelText('Open search')
      fireEvent.click(searchButton)
      
      // Verify search is open
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search categories...')).toBeInTheDocument()
      })
      
      // Close search
      const closeButton = screen.getByLabelText('Close search')
      fireEvent.click(closeButton)
      
      // Verify search is closed
      await waitFor(() => {
        expect(screen.queryByPlaceholderText('Search categories...')).not.toBeInTheDocument()
      })
    })
  })

  describe('Category Search', () => {
    it('shows category dropdown when search input is focused', async () => {
      wrap(<AppBar />)
      
      // Open search
      const searchButton = screen.getByLabelText('Open search')
      fireEvent.click(searchButton)
      
      // Focus search input
      const searchInput = screen.getByPlaceholderText('Search categories...')
      fireEvent.focus(searchInput)
      
      await waitFor(() => {
        expect(screen.getByText('Type to search categories...')).toBeInTheDocument()
      })
    })

    it('filters categories as user types', async () => {
      wrap(<AppBar />)
      
      // Open search
      const searchButton = screen.getByLabelText('Open search')
      fireEvent.click(searchButton)
      
      // Focus and type in search input
      const searchInput = screen.getByPlaceholderText('Search categories...')
      fireEvent.focus(searchInput)
      fireEvent.change(searchInput, { target: { value: 'Tech' } })
      
      await waitFor(() => {
        expect(screen.getByText('Technology')).toBeInTheDocument()
        expect(screen.queryByText('Science')).not.toBeInTheDocument()
        expect(screen.queryByText('Business')).not.toBeInTheDocument()
      })
    })

    it('shows no results message for non-matching search', async () => {
      wrap(<AppBar />)
      
      // Open search
      const searchButton = screen.getByLabelText('Open search')
      fireEvent.click(searchButton)
      
      // Focus and type in search input
      const searchInput = screen.getByPlaceholderText('Search categories...')
      fireEvent.focus(searchInput)
      fireEvent.change(searchInput, { target: { value: 'NonExistent' } })
      
      await waitFor(() => {
        expect(screen.getByText('No categories found for "NonExistent"')).toBeInTheDocument()
      })
    })

    it('closes search when category is selected', async () => {
      wrap(<AppBar />)
      
      // Open search
      const searchButton = screen.getByLabelText('Open search')
      fireEvent.click(searchButton)
      
      // Focus search input
      const searchInput = screen.getByPlaceholderText('Search categories...')
      fireEvent.focus(searchInput)
      
      // Select a category
      await waitFor(() => {
        const technologyCategory = screen.getByText('Technology')
        fireEvent.click(technologyCategory)
      })
      
      // Verify search is closed
      await waitFor(() => {
        expect(screen.queryByPlaceholderText('Search categories...')).not.toBeInTheDocument()
      })
    })
  })

  describe('Responsive Behavior', () => {
    it('has correct container classes', () => {
      wrap(<AppBar />)
      
      const container = screen.getByRole('banner')
      expect(container).toHaveClass('app-bar')
      
      const innerContainer = container.querySelector('.app-bar__container')
      expect(innerContainer).toBeInTheDocument()
    })

    it('maintains proper layout structure', () => {
      wrap(<AppBar />)
      
      const container = screen.getByRole('banner')
      const brandSection = container.querySelector('.app-bar__brand')
      const searchSection = container.querySelector('.app-bar__search')
      
      expect(brandSection).toBeInTheDocument()
      expect(searchSection).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      wrap(<AppBar />)
      
      expect(screen.getByLabelText('Open search')).toBeInTheDocument()
      
      // Open search to test close button
      const searchButton = screen.getByLabelText('Open search')
      fireEvent.click(searchButton)
      
      expect(screen.getByLabelText('Close search')).toBeInTheDocument()
    })

    it('has semantic HTML structure', () => {
      wrap(<AppBar />)
      
      expect(screen.getByRole('banner')).toBeInTheDocument()
    })
  })
}) 