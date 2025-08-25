import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetCategoryQuery, useGetPostsQuery } from '@/services/api'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { setSelectedPostId } from '@/app/uiSlice'
import PostCard from '@/components/PostCard'

export default function CategoryDetailPage(){
  const { id } = useParams<{id: string}>()
  const dispatch = useAppDispatch()
  const categoryId = id || ''
  const { data: category, isLoading, isError } = useGetCategoryQuery(categoryId, { skip: !categoryId })
  const { data: posts } = useGetPostsQuery()
  console.log(category, 'category')
  
  // Filter posts by this category
  const categoryPosts = posts?.filter(post => 
    post.categories.some(cat => cat.id === categoryId)
  ) || []
  
  // Cleanup: Clear selected post ID when component unmounts
  useEffect(() => {
    return () => {
      dispatch(setSelectedPostId(null))
    }
  }, [dispatch])

  if(isLoading) return (
    <div className="category-detail-loading">
      <p>Loading category...</p>
    </div>
  )
  
  if(isError || !category) return (
    <div className="category-detail-error">
      <p>Category not found.</p>
      <Link to="/" className="back-link">← Back to Posts</Link>
    </div>
  )

  return (
    <section className="category-detail-container">
      <article className="category-detail">
        <nav className="category-detail__nav">
          <Link to="/" className="back-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
        </nav>
        
        <header className="category-detail__header">
          <div className="category-detail__info">
            <h1 className="category-detail__name">{category.name}</h1>
            {category.description && (
              <p className="category-detail__description">{category.description}</p>
            )}
            <div className="category-detail__meta">
              <span className="category-detail__posts-count">
                {categoryPosts.length} {categoryPosts.length === 1 ? 'post' : 'posts'} in this category
              </span>
            </div>
          </div>
        </header>

        <div className="category-detail__content">
          <h2 className="category-detail__section-title">Posts in {category.name}</h2>
          
          {categoryPosts.length > 0 ? (
            <div className="category-detail__posts">
              {categoryPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="category-detail__no-posts">
              <p>No posts found in this category.</p>
            </div>
          )}
        </div>
      </article>
    </section>
  )
} 