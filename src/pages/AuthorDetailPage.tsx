import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetAuthorQuery, useGetPostsQuery } from '@/services/api'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { setSelectedPostId } from '@/app/uiSlice'
import PostCard from '@/components/PostCard'

export default function AuthorDetailPage(){
  const { id } = useParams<{id: string}>()
  const dispatch = useAppDispatch()
  const authorId = id || ''
  const { data: author, isLoading, isError } = useGetAuthorQuery(authorId, { skip: !authorId })
  const { data: posts } = useGetPostsQuery()
  
  // Filter posts by this author
  const authorPosts = posts?.filter(post => post.author.id === authorId) || []
  
  // Cleanup: Clear selected post ID when component unmounts
  useEffect(() => {
    return () => {
      dispatch(setSelectedPostId(null))
    }
  }, [dispatch])

  if(isLoading) return (
    <div className="author-detail-loading">
      <p>Loading author...</p>
    </div>
  )
  
  if(isError || !author) return (
    <div className="author-detail-error">
      <p>Author not found.</p>
      <Link to="/" className="back-link">← Back to Posts</Link>
    </div>
  )

  return (
    <section className="author-detail-container">
      <article className="author-detail">
        <nav className="author-detail__nav">
          <Link to="/" className="back-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Link>
        </nav>
        
        <header className="author-detail__header">
          <div className="author-detail__profile">
            <div className="author-detail__avatar">
              <img src={author.profilePicture} alt={author.name} />
            </div>
            <div className="author-detail__info">
              <h1 className="author-detail__name">{author.name}</h1>
              <div className="author-detail__meta">
                <span className="author-detail__join-date">
                  Joined {new Date(author.createdAt).toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </span>
                <span className="author-detail__posts-count">
                  {authorPosts.length} {authorPosts.length === 1 ? 'post' : 'posts'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="author-detail__content">
          <h2 className="author-detail__section-title">Posts by {author.name}</h2>
          
          {authorPosts.length > 0 ? (
            <div className="author-detail__posts">
              {authorPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="author-detail__no-posts">
              <p>No posts found for this author.</p>
            </div>
          )}
        </div>
      </article>
    </section>
  )
} 