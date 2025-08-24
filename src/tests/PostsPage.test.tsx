import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { BrowserRouter } from 'react-router-dom'
import PostsPage from '@/pages/PostsPage'

vi.mock('@/services/api', async () => {
  const actual = await vi.importActual<any>('@/services/api')
  return {
    ...actual,
    useGetPostsQuery: () => ({ data: [{
      id: 1, title: 'Hello', description: 'World', image_url: '', createdAt: new Date().toISOString(), updatedAt: '', author_id: 1, category_id: 1
    }], isLoading: false, isError: false }),
    useGetAuthorsQuery: () => ({ data: [{ id: 1, name: 'Jane', avatar_url: '' }], isLoading: false }),
    useGetCategoriesQuery: () => ({ data: [{ id: 1, name: 'News' }], isLoading: false }),
  }
})

const wrap = (ui: React.ReactNode) => render(
  <Provider store={store}>
    <BrowserRouter>{ui}</BrowserRouter>
  </Provider>
)

describe('PostsPage', () => {
  it('renders post card', () => {
    wrap(<PostsPage />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})