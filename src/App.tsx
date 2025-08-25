import { Routes, Route, Navigate } from 'react-router-dom'
import PostsPage from './pages/PostsPage'
import PostDetailPage from './pages/PostDetailPage'
import AuthorDetailPage from './pages/AuthorDetailPage'
import CategoryDetailPage from './pages/CategoryDetailPage'
import Layout from './components/Layout'

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/author/:id" element={<AuthorDetailPage />} />
        <Route path="/category/:id" element={<CategoryDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}