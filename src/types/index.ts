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
  author?: Author;
}

export interface Author {
  createdAt: string;
  id: number;
  name: string;
  avatar_url: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}