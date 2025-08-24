import { Link } from 'react-router-dom'
import type { Post, Author, Category } from '@/types'

export default function PostCard({ post, author, category }: { post: Post; author?: Author; category?: Category; }){
  return (
    <article className="card">
      <Link to={`/post/${post.id}`} aria-label={`Open post ${post.title}`}>
        <img className="card__image" src={post.image_url} alt="" loading="lazy" />
      </Link>
      <div className="card__body">
        <div style={{display:'flex', gap:'.5rem', flexWrap:'wrap', marginBottom:'.5rem'}}>
          {category && <span className="pill">{category.name}</span>}
          {author && <span className="pill">by {author.name}</span>}
        </div>
        <h3 className="card__title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h3>
        <div className="card__meta">{new Date(post.created_at).toLocaleDateString()}</div>
      </div>
    </article>
  )
}