import { useMemo } from 'react'
import { useGetAuthorsQuery, useGetCategoriesQuery, useGetPostsQuery } from '@/services/api'
import PostCard from '@/components/PostCard'
import DesktopFilter from '@/components/DesktopFilter'
import SortControl from '@/components/SortControl'
import { useAppSelector } from '@/app/hooks'

export default function PostsPage(){
  const { data: posts, isLoading, isError } = useGetPostsQuery()
  const { data: authors } = useGetAuthorsQuery()
  const { data: categories } = useGetCategoriesQuery()
  
  // Get filter state from Redux
  const search = useAppSelector(s => s.ui.search).toLowerCase()
  const selectedCategories = useAppSelector(s => s.filter.selectedCategories)
  const selectedAuthors = useAppSelector(s => s.filter.selectedAuthors)
  const sortOrder = useAppSelector(s => s.filter.sortOrder)

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
    
    // Apply category filter (using Redux state)
    if(selectedCategories.length > 0) {
      filteredPosts = filteredPosts.filter(p => 
        p.categories.some(cat => selectedCategories.includes(cat.id))
      )
    }
    
    // Apply author filter (using Redux state)
    if(selectedAuthors.length > 0) {
      filteredPosts = filteredPosts.filter(p => selectedAuthors.includes(p.author.id))
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
  }, [posts, search, selectedCategories, selectedAuthors, sortOrder])

  // Sort handler - will be integrated with Redux in the future
  const handleSortChange = (sort: string) => {
    console.log('Sort changed to:', sort)
  }

  if(isLoading) return (
    <div className="posts-loading">
      <p>Loading posts...</p>
    </div>
  )
  
  if(isError) return (
    <div className="posts-error">
      <p>Failed to load posts.</p>
    </div>
  )

  return (
    <section aria-labelledby="posts-heading">
      <div className="page-header">
        <div className="page-header__content">
          <h1 id="posts-heading" className="h1">DWS blog</h1>
        </div>
        <SortControl 
          currentSort={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>
      
      <div className="posts-layout">
        {/* Desktop Filter Sidebar */}
        <DesktopFilter
          categories={categories || []}
          authors={authors || []}
        />
        
        {/* Posts Grid */}
        <div className="posts-grid">
          {filtered.map(p => (
            <PostCard
              key={p.id}
              post={p}
            />
          ))}
        </div>
      </div>
    </section>
  )
}