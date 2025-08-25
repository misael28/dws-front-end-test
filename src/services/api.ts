import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Post, Author, Category } from '@/types'

export const api = createApi({
  reducerPath: 'dwsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tech-test-backend.dwsbrazil.io/' }),
  tagTypes: ['Posts','Post','Authors','Categories'],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts/',
      providesTags: (result) => result ? [
        ...result.map(p => ({ type: 'Post' as const, id: p.id })),
        { type: 'Posts', id: 'LIST' }
      ] : [{ type: 'Posts', id: 'LIST' }]
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Post', id }]
    }),
    getAuthors: builder.query<Author[], void>({
      query: () => 'authors/',
      providesTags: [{ type: 'Authors', id: 'LIST' }]
    }),
    getAuthor: builder.query<Author, string>({
      query: (id) => `authors/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Authors', id }]
    }),
    getCategories: builder.query<Category[], void>({
      query: () => 'categories/',
      providesTags: [{ type: 'Categories', id: 'LIST' }]
    }),
    getCategory: builder.query<Category, string>({
      query: (id) => `categories/${id}`,
      providesTags: (_res, _err, id) => [{ type: 'Categories', id }]
    }),
  })
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useGetAuthorsQuery,
  useGetAuthorQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery
} = api