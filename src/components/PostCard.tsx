import { Link } from 'react-router-dom'
import type { Post, Author, Category } from '@/types'

export default function PostCard({ post, author, category }: { post: Post; author?: Author; category?: Category; }){
  // Handle both cases: author prop or post.author
  const postAuthor = author || post.author
  console.log('PostCard author:', { author, postAuthor, postAuthorId: post.author_id })
  
  return (
    <article className="post-card">
      <Link to={`/post/${post.id}`} aria-label={`Open post ${post.title}`}>
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
          <span className="post-card__author">
            {postAuthor ? postAuthor.name : 'Unknown Author'}
          </span>
        </div>

        {/* Text Container */}
        <div className="post-card__text-container">
          <h3 className="post-card__title">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h3>
          <p className="post-card__description">
            {post.description || post.content || 'No description available'}
          </p>
        </div>

        {/* Categories */}
        <div className="post-card__categories">
          {category ? (
            <>
              <span className="post-card__category">{category.name}</span>
              <span className="post-card__category">{category.name}</span>
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