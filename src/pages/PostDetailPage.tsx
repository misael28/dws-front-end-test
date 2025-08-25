import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetAuthorQuery, useGetCategoriesQuery, useGetPostQuery } from '@/services/api'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { setSelectedPostId } from '@/app/uiSlice'

export default function PostDetailPage(){
  const { id } = useParams<{id: string}>()
  const dispatch = useAppDispatch()
  const selectedPostId = useAppSelector(state => state.ui.selectedPostId)
  
  // Use selected post ID from store if available, otherwise fall back to URL params
  const postId = selectedPostId || id || ''
  const { data: post, isLoading, isError } = useGetPostQuery(postId, { skip: !postId })
  console.log(post, 'post')
  
  // Get author and category from the post object directly
  const author = post?.author
  const category = post?.categories?.[0] // Get first category if available
  
  // Cleanup: Clear selected post ID when component unmounts
  useEffect(() => {
    return () => {
      dispatch(setSelectedPostId(null))
    }
  }, [dispatch])

  if(isLoading) return (
    <div className="post-detail-loading">
      <p>Loading post...</p>
    </div>
  )
  
  if(isError || !post) return (
    <div className="post-detail-error">
      <p>Post not found.</p>
      <Link to="/" className="back-link">← Back to Posts</Link>
    </div>
  )

  return (
    <section className="post-detail-container">
      <article className="post-detail">
        <nav className="post-detail__nav">
          <Link to="/" className="back-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
        </nav>
        
        <header className="post-detail__header">
          <h1 className="post-detail__title">{post.title}</h1>
          
          <div className="post-detail__meta">
            {author && (
              <div className="post-detail__author">
                <div className="post-detail__avatar">
                  <img src={author.profilePicture} alt={author.name} />
                </div>
                <div className="post-detail__author-info">
                  <span className="post-detail__author-label">Written by:</span>
                  <Link to={`/author/${author.id}`} className="post-detail__author-name">
                    {author.name}
                  </Link>
                  <span className="post-detail__date">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            )}
            
                      {category && (
            <div className="post-detail__category">
              <Link to={`/category/${category.id}`} className="category-tag">
                {category.name}
              </Link>
            </div>
          )}
          </div>
        </header>

        {post.thumbnail_url && (
          <div className="post-detail__image">
            <img 
              src={post.thumbnail_url} 
              alt={post.title}
              loading="lazy"
            />
          </div>
        )}

        <div className="post-detail__content">
          {post.description && (
            <p className="post-detail__description">{post.description}</p>
          )}
          
          {post.content && (
            <div className="post-detail__body">
              {post.content}
            </div>
          )}
        </div>
      </article>
    </section>
  )
}