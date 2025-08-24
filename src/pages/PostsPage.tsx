import { useMemo } from 'react'
import { useGetAuthorsQuery, useGetCategoriesQuery, useGetPostsQuery } from '@/services/api'
import PostCard from '@/components/PostCard'
import { useAppSelector } from '@/app/hooks'

export default function PostsPage(){
  const { data: posts, isLoading, isError } = useGetPostsQuery()
  const { data: authors } = useGetAuthorsQuery()
  const { data: categories } = useGetCategoriesQuery()
  const search = useAppSelector(s => s.ui.search).toLowerCase()
  console.log(posts, 'posts')
  const authorMap = useMemo(() => new Map((authors ?? []).map(a => [a.id, a])), [authors])
  const catMap = useMemo(() => new Map((categories ?? []).map(c => [c.id, c])), [categories])

  const filtered = useMemo(() => {
    if(!posts) return []
    if(!search) return posts
    return posts.filter(p =>
      p.title.toLowerCase().includes(search) ||
      (p.description ?? '').toLowerCase().includes(search)
    )
  }, [posts, search])

  if(isLoading) return <p>Loading posts…</p>
  if(isError) return <p>Failed to load posts.</p>

  return (
    <section aria-labelledby="posts-heading">
      <h1 id="posts-heading" className="sr-only">Posts</h1>
      <div className="grid">
        {filtered.map(p => (
          <PostCard
            key={p.id}
            post={p}
            author={authorMap.get(p.author_id)}
            category={catMap.get(p.category_id)}
          />
        ))}
      </div>
    </section>
  )
}