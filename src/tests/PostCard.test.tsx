import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { BrowserRouter } from 'react-router-dom'
import PostCard from '@/components/PostCard'
import type { Post } from '@/types'
import { useAppDispatch } from '@/app/hooks'

// Mock Redux hooks
vi.mock('@/app/hooks', () => ({
  useAppDispatch: () => vi.fn()
}))

const mockPost: Post = {
  id: '1',
  title: 'Test Post Title',
  description: 'This is a test post description that should be displayed in the card.',
  content: 'Full post content for testing purposes.',
  image_url: 'https://example.com/test-image.jpg',
  thumbnail_url: 'https://example.com/test-thumbnail.jpg',
  createdAt: '2025-01-20T10:00:00Z',
  updatedAt: '2025-01-20T10:00:00Z',
  author: {
    id: '1',
    name: 'John Doe',
    avatar_url: 'https://example.com/avatar.jpg',
    profilePicture: 'https://example.com/avatar.jpg',
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-01T00:00:00Z'
  },
  categories: [
    { id: '1', name: 'Technology' },
    { id: '2', name: 'Innovation' }
  ]
}

const wrap = (ui: React.ReactNode) => render(
  <Provider store={store}>
    <BrowserRouter>{ui}</BrowserRouter>
  </Provider>
)

describe('PostCard', () => {
  describe('Rendering', () => {
    it('renders post title correctly', () => {
      wrap(<PostCard post={mockPost} />)
      
      expect(screen.getByText('Test Post Title')).toBeInTheDocument()
    })

    it('renders post description correctly', () => {
      wrap(<PostCard post={mockPost} />)
      
      expect(screen.getByText('This is a test post description that should be displayed in the card.')).toBeInTheDocument()
    })

    it('renders author name correctly', () => {
      wrap(<PostCard post={mockPost} />)
      
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders post date correctly', () => {
      wrap(<PostCard post={mockPost} />)
      
      expect(screen.getByText('Jan 20, 2025')).toBeInTheDocument()
    })

    it('renders category tags correctly', () => {
      wrap(<PostCard post={mockPost} />)
      
      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.getByText('Innovation')).toBeInTheDocument()
    })

    it('renders post image with correct src and alt', () => {
      wrap(<PostCard post={mockPost} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', 'https://example.com/test-thumbnail.jpg')
      expect(image).toHaveAttribute('alt', '')
    })
  })

  describe('Image Handling', () => {
    it('uses thumbnail_url when available', () => {
      wrap(<PostCard post={mockPost} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', 'https://example.com/test-thumbnail.jpg')
    })

    it('falls back to image_url when thumbnail_url is not available', () => {
      const postWithoutThumbnail = {
        ...mockPost,
        thumbnail_url: undefined
      }
      
      wrap(<PostCard post={postWithoutThumbnail} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg')
    })

    it('handles missing image gracefully', () => {
      const postWithoutImage = {
        ...mockPost,
        image_url: undefined,
        thumbnail_url: undefined
      }
      
      wrap(<PostCard post={postWithoutImage} />)
      
      const image = screen.getByRole('img')
      expect(image).toHaveAttribute('src', '')
    })
  })

  describe('Content Fallbacks', () => {
    it('shows description when available', () => {
      wrap(<PostCard post={mockPost} />)
      
      expect(screen.getByText('This is a test post description that should be displayed in the card.')).toBeInTheDocument()
    })

    it('falls back to content when description is not available', () => {
      const postWithoutDescription = {
        ...mockPost,
        description: undefined
      }
      
      wrap(<PostCard post={postWithoutDescription} />)
      
      expect(screen.getByText('Full post content for testing purposes.')).toBeInTheDocument()
    })

    it('shows fallback message when neither description nor content is available', () => {
      const postWithoutContent = {
        ...mockPost,
        description: undefined,
        content: undefined
      }
      
      wrap(<PostCard post={postWithoutContent} />)
      
      expect(screen.getByText('No description available')).toBeInTheDocument()
    })
  })

  describe('Category Handling', () => {
    it('shows actual categories when available', () => {
      wrap(<PostCard post={mockPost} />)
      
      expect(screen.getByText('Technology')).toBeInTheDocument()
      expect(screen.getByText('Innovation')).toBeInTheDocument()
    })

    it('shows fallback categories when no categories are available', () => {
      const postWithoutCategories = {
        ...mockPost,
        categories: []
      }
      
      wrap(<PostCard post={postWithoutCategories} />)
      
      expect(screen.getByText('General')).toBeInTheDocument()
      expect(screen.getByText('News')).toBeInTheDocument()
    })

    it('shows only first two categories when more than two are available', () => {
      const postWithManyCategories = {
        ...mockPost,
        categories: [
          { id: '1', name: 'Category 1' },
          { id: '2', name: 'Category 2' },
          { id: '3', name: 'Category 3' }
        ]
      }
      
      wrap(<PostCard post={postWithManyCategories} />)
      
      expect(screen.getByText('Category 1')).toBeInTheDocument()
      expect(screen.getByText('Category 2')).toBeInTheDocument()
      expect(screen.queryByText('Category 3')).not.toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('has correct link to post detail page', () => {
      wrap(<PostCard post={mockPost} />)
      
      const postLink = screen.getByRole('link', { name: /open post test post title/i })
      expect(postLink).toHaveAttribute('href', '/post/1')
    })

    it('has correct link to author detail page', () => {
      wrap(<PostCard post={mockPost} />)
      
      const authorLink = screen.getByRole('link', { name: 'John Doe' })
      expect(authorLink).toHaveAttribute('href', '/author/1')
    })

    it('has correct link to category detail page', () => {
      wrap(<PostCard post={mockPost} />)
      
      const categoryLink = screen.getByRole('link', { name: 'Technology' })
      expect(categoryLink).toHaveAttribute('href', '/category/1')
    })
  })

  describe('Interactions', () => {
    it('dispatches selectedPostId when post is clicked', () => {
      const mockDispatch = vi.fn()
      vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)
      
      wrap(<PostCard post={mockPost} />)
      
      const postLink = screen.getByRole('link', { name: /open post test post title/i })
      fireEvent.click(postLink)
      
      expect(mockDispatch).toHaveBeenCalled()
    })

    it('handles click events properly', () => {
      wrap(<PostCard post={mockPost} />)
      
      const postLink = screen.getByRole('link', { name: /open post test post title/i })
      expect(() => fireEvent.click(postLink)).not.toThrow()
    })
  })

  describe('Styling and Classes', () => {
    it('has correct CSS classes', () => {
      wrap(<PostCard post={mockPost} />)
      
      const card = screen.getByRole('article')
      expect(card).toHaveClass('post-card')
      
      const image = screen.getByRole('img')
      expect(image).toHaveClass('post-card__image')
      
      const title = screen.getByText('Test Post Title')
      expect(title.closest('h3')).toHaveClass('post-card__title')
      
      const description = screen.getByText('This is a test post description that should be displayed in the card.')
      expect(description).toHaveClass('post-card__description')
    })

    it('has proper semantic structure', () => {
      wrap(<PostCard post={mockPost} />)
      
      expect(screen.getByRole('article')).toBeInTheDocument()
      expect(screen.getByRole('img')).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles post with minimal data', () => {
      const minimalPost: Post = {
        id: '1',
        title: 'Minimal Post',
        createdAt: '2025-01-20T10:00:00Z',
        updatedAt: '2025-01-20T10:00:00Z',
        author: {
          id: '1',
          name: 'Unknown Author',
          avatar_url: '',
          profilePicture: '',
          createdAt: '2025-01-01T00:00:00Z',
          updatedAt: '2025-01-01T00:00:00Z'
        },
        categories: []
      }
      
      wrap(<PostCard post={minimalPost} />)
      
      expect(screen.getByText('Minimal Post')).toBeInTheDocument()
      expect(screen.getByText('Unknown Author')).toBeInTheDocument()
      expect(screen.getByText('General')).toBeInTheDocument()
    })

    it('handles very long titles gracefully', () => {
      const postWithLongTitle = {
        ...mockPost,
        title: 'This is a very long post title that should be handled gracefully by the component without breaking the layout or causing any visual issues'
      }
      
      wrap(<PostCard post={postWithLongTitle} />)
      
      expect(screen.getByText('This is a very long post title that should be handled gracefully by the component without breaking the layout or causing any visual issues')).toBeInTheDocument()
    })

    it('handles very long descriptions gracefully', () => {
      const postWithLongDescription = {
        ...mockPost,
        description: 'This is an extremely long description that contains many words and should be handled properly by the component. It should not break the layout or cause any overflow issues. The component should apply proper text truncation or line clamping to ensure the card maintains its intended dimensions.'
      }
      
      wrap(<PostCard post={postWithLongDescription} />)
      
      expect(screen.getByText(/This is an extremely long description/)).toBeInTheDocument()
    })
  })
}) 