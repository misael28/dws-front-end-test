import { Routes, Route, Navigate } from 'react-router-dom'
import PostsPage from './pages/PostsPage'
import PostDetailPage from './pages/PostDetailPage'
import Layout from './components/Layout'

export default function App(){
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PostsPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}