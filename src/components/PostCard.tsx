import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSelectedPostId } from '@/app/uiSlice'
import type { Post, Author, Category } from '@/types'

export default function PostCard({ post }: { post: Post }){
  const dispatch = useDispatch()
  
  const handlePostClick = () => {
    dispatch(setSelectedPostId(post.id))
  }
  
  return (
    <article className="post-card">
      <Link to={`/post/${post.id}`} aria-label={`Open post ${post.title}`} onClick={handlePostClick}>
        <img className="post-card__image" src={post.thumbnail_url ?? post.image_url} alt="" loading="lazy" />
      </Link>
      
      <div className="post-card__content">
        {/* Metadata */}
        <div className="post-card__meta">
          <span className="post-card__date">
            {new Date(post.createdAt).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
          <span className="post-card__separator"></span>
          <Link to={`/author/${post.author.id}`} className="post-card__author">
            {post.author ? post.author.name : 'Unknown Author'}
          </Link>
        </div>

        {/* Text Container */}
        <div className="post-card__text-container">
          <h3 className="post-card__title">
            <Link to={`/post/${post.id}`} onClick={handlePostClick}>{post.title}</Link>
          </h3>
          <p className="post-card__description">
            {post.description || post.content || 'No description available'}
          </p>
        </div>

        {/* Categories */}
        <div className="post-card__categories">
          {post.categories && post.categories.length > 0 ? (
            <>
              <Link to={`/category/${post.categories[0].id}`} className="post-card__category">
                {post.categories[0].name}
              </Link>
              {post.categories[1] && (
                <Link to={`/category/${post.categories[1].id}`} className="post-card__category">
                  {post.categories[1].name}
                </Link>
              )}
            </>
          ) : (
            <>
              <span className="post-card__category">General</span>
              <span className="post-card__category">News</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}