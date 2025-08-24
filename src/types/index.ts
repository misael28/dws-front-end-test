export interface Post {
  id: number;
  title: string;
  description: string;
  image_url: string;
  createdAt: string;
  updatedAt: string;
  author_id: number;
  category_id: number;
  content?: string;
  thumbnail_url?: string;
}

export interface Author {
  id: number;
  name: string;
  avatar_url: string;
  bio?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}