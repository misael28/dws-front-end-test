import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '@/components/Layout'

const wrap = (ui: React.ReactNode) => render(
  <BrowserRouter>
    {ui}
  </BrowserRouter>
)

describe('Layout', () => {
  describe('Rendering', () => {
    it('renders layout container', () => {
      wrap(<Layout>Test Content</Layout>)
      
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('renders children content', () => {
      wrap(<Layout>Test Content</Layout>)
      
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      wrap(
        <Layout>
          <div>First Child</div>
          <div>Second Child</div>
        </Layout>
      )
      
      expect(screen.getByText('First Child')).toBeInTheDocument()
      expect(screen.getByText('Second Child')).toBeInTheDocument()
    })

    it('renders complex nested children', () => {
      wrap(
        <Layout>
          <header>
            <h1>Page Title</h1>
            <nav>Navigation</nav>
          </header>
          <main>
            <section>Content Section</section>
          </main>
          <footer>Footer Content</footer>
        </Layout>
      )
      
      expect(screen.getByText('Page Title')).toBeInTheDocument()
      expect(screen.getByText('Navigation')).toBeInTheDocument()
      expect(screen.getByText('Content Section')).toBeInTheDocument()
      expect(screen.getByText('Footer Content')).toBeInTheDocument()
    })
  })

  describe('Structure', () => {
    it('has correct HTML structure', () => {
      wrap(<Layout>Content</Layout>)
      
      const main = screen.getByRole('main')
      expect(main.tagName).toBe('MAIN')
    })

    it('has correct CSS classes', () => {
      wrap(<Layout>Content</Layout>)
      
      const main = screen.getByRole('main')
      expect(main).toHaveClass('layout')
    })

    it('maintains proper nesting', () => {
      wrap(
        <Layout>
          <div data-testid="child">Child Element</div>
        </Layout>
      )
      
      const main = screen.getByRole('main')
      const child = screen.getByTestId('child')
      
      expect(main).toContainElement(child)
    })
  })

  describe('Accessibility', () => {
    it('has semantic HTML structure', () => {
      wrap(<Layout>Content</Layout>)
      
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('maintains proper heading hierarchy', () => {
      wrap(
        <Layout>
          <h1>Main Heading</h1>
          <h2>Sub Heading</h2>
          <h3>Section Heading</h3>
        </Layout>
      )
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
    })
  })

  describe('Content Handling', () => {
    it('renders text content', () => {
      wrap(<Layout>Simple text content</Layout>)
      
      expect(screen.getByText('Simple text content')).toBeInTheDocument()
    })

    it('renders HTML elements', () => {
      wrap(
        <Layout>
          <p>Paragraph text</p>
          <span>Inline text</span>
          <button>Click me</button>
        </Layout>
      )
      
      expect(screen.getByText('Paragraph text')).toBeInTheDocument()
      expect(screen.getByText('Inline text')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders React components', () => {
      const TestComponent = () => <div data-testid="test-component">Component Content</div>
      
      wrap(
        <Layout>
          <TestComponent />
        </Layout>
      )
      
      expect(screen.getByTestId('test-component')).toBeInTheDocument()
      expect(screen.getByText('Component Content')).toBeInTheDocument()
    })

    it('renders conditional content', () => {
      const showContent = true
      
      wrap(
        <Layout>
          {showContent && <div>Conditional Content</div>}
          {!showContent && <div>Hidden Content</div>}
        </Layout>
      )
      
      expect(screen.getByText('Conditional Content')).toBeInTheDocument()
      expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument()
    })
  })

  describe('Props and Flexibility', () => {
    it('accepts different types of children', () => {
      // String
      const { rerender } = wrap(<Layout>String Content</Layout>)
      expect(screen.getByText('String Content')).toBeInTheDocument()
      
      // Number
      rerender(<Layout>{42}</Layout>)
      expect(screen.getByText('42')).toBeInTheDocument()
      
      // Array
      rerender(
        <Layout>
          {['Item 1', 'Item 2', 'Item 3'].map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </Layout>
      )
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(screen.getByText('Item 3')).toBeInTheDocument()
    })

    it('handles empty children gracefully', () => {
      wrap(<Layout>{null}</Layout>)
      
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('handles null children gracefully', () => {
      wrap(<Layout>{null}</Layout>)
      
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('handles undefined children gracefully', () => {
      wrap(<Layout>{undefined}</Layout>)
      
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('works with routing context', () => {
      wrap(<Layout>Content</Layout>)
      
      // Should render without routing errors
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('maintains component state', () => {
      const { rerender } = wrap(<Layout>Initial Content</Layout>)
      
      expect(screen.getByText('Initial Content')).toBeInTheDocument()
      
      rerender(<Layout>Updated Content</Layout>)
      
      expect(screen.getByText('Updated Content')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles very long content', () => {
      const longContent = 'A'.repeat(10000)
      
      wrap(<Layout>{longContent}</Layout>)
      
      expect(screen.getByText(longContent)).toBeInTheDocument()
    })

    it('handles special characters in content', () => {
      const specialContent = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      
      wrap(<Layout>{specialContent}</Layout>)
      
      expect(screen.getByText(specialContent)).toBeInTheDocument()
    })

    it('handles unicode content', () => {
      const unicodeContent = '🚀🌟🎉💻📱🌍'
      
      wrap(<Layout>{unicodeContent}</Layout>)
      
      expect(screen.getByText(unicodeContent)).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('renders efficiently with many children', () => {
      const manyChildren = Array.from({ length: 100 }, (_, i) => (
        <div key={i}>Child {i + 1}</div>
      ))
      
      const startTime = performance.now()
      wrap(<Layout>{manyChildren}</Layout>)
      const endTime = performance.now()
      
      // Should render within reasonable time
      expect(endTime - startTime).toBeLessThan(100)
      
      // Verify all children rendered
      expect(screen.getByText('Child 1')).toBeInTheDocument()
      expect(screen.getByText('Child 100')).toBeInTheDocument()
    })
  })
}) 