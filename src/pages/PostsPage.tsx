import { useMemo, useState } from 'react'
import { useGetAuthorsQuery, useGetCategoriesQuery, useGetPostsQuery } from '@/services/api'
import PostCard from '@/components/PostCard'
import { useAppSelector } from '@/app/hooks'

export default function PostsPage(){
  const { data: posts, isLoading, isError } = useGetPostsQuery()
  const { data: authors } = useGetAuthorsQuery()
  const { data: categories } = useGetCategoriesQuery()
  const search = useAppSelector(s => s.ui.search).toLowerCase()
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('Category')
  const [selectedAuthor, setSelectedAuthor] = useState<string>('Author')
  const [sortOrder, setSortOrder] = useState<string>('newest')
  console.log(posts, 'posts')
  const authorMap = useMemo(() => new Map((authors ?? []).map(a => [a.id, a])), [authors])
  const catMap = useMemo(() => new Map((categories ?? []).map(c => [c.id, c])), [categories])

  const filtered = useMemo(() => {
    if(!posts) return []
    
    let filteredPosts = posts
    
    // Apply search filter
    if(search) {
      filteredPosts = filteredPosts.filter(p =>
        p.title.toLowerCase().includes(search) ||
        (p.description ?? '').toLowerCase().includes(search)
      )
    }
    
    // Apply category filter
    if(selectedCategory !== 'Category' && selectedCategory !== 'All Categories') {
      const category = categories?.find(c => c.name === selectedCategory)
      if(category) {
        filteredPosts = filteredPosts.filter(p => p.category_id === category.id)
      }
    }
    
    // Apply author filter
    if(selectedAuthor !== 'Author' && selectedAuthor !== 'All Authors') {
      const author = authors?.find(a => a.name === selectedAuthor)
      if(author) {
        filteredPosts = filteredPosts.filter(p => p.author_id === author.id)
      }
    }
    
    // Apply sorting
    if(sortOrder === 'newest') {
      filteredPosts = [...filteredPosts].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } else if(sortOrder === 'oldest') {
      filteredPosts = [...filteredPosts].sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    }
    
    return filteredPosts
  }, [posts, search, selectedCategory, selectedAuthor, sortOrder, categories, authors])

  // Filter handlers
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleAuthorChange = (author: string) => {
    setSelectedAuthor(author)
  }

  const handleSortChange = (sort: string) => {
    setSortOrder(sort)
  }

  if(isLoading) return <p>Loading posts…</p>
  if(isError) return <p>Failed to load posts.</p>

  return (
    <section aria-labelledby="posts-heading">
      <div className="page-header">
        <h1 id="posts-heading" className="h1">Posts</h1>
        <p className="body-large text-neutral-400">
          Discover insights and stories from our team
        </p>
      </div>
      
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