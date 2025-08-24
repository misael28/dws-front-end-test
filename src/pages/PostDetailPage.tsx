import { Link, useParams } from 'react-router-dom'
import { useGetAuthorQuery, useGetCategoriesQuery, useGetPostQuery } from '@/services/api'

export default function PostDetailPage(){
  const { id } = useParams<{id: string}>()
  const postId = Number(id)
  const { data: post, isLoading, isError } = useGetPostQuery(postId, { skip: !postId })
  const { data: author } = useGetAuthorQuery(post?.author_id!, { skip: !post })
  const { data: categories } = useGetCategoriesQuery()
  const category = categories?.find(c => c.id === post?.category_id)

  if(isLoading) return <p>Loading…</p>
  if(isError || !post) return <p>Post not found.</p>

  return (
    <article>
      <nav style={{marginBottom:'1rem'}}>
        <Link to="/" className="pill">← Back</Link>
      </nav>
      <img src={post.image_url} alt="" style={{width:'100%', maxHeight:480, objectFit:'cover', borderRadius:'var(--radius)'}} />
      <h1 style={{marginTop:'1rem'}}>{post.title}</h1>
      <p style={{color:'var(--muted)'}}>
        {author ? <>By <strong>{author.name}</strong></> : '—'} · {new Date(post.created_at).toLocaleDateString()}
        {category && <> · <span className="pill">{category.name}</span></>}
      </p>
      <section style={{lineHeight:1.7, marginTop:'1rem'}}>
        <p>{post.content || post.description}</p>
      </section>
    </article>
  )
}