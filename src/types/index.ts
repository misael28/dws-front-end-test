export interface Post {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  thumbnail_url?: string;
  createdAt: string;
  updatedAt: string;
  content?: string;
  author: Author;
  categories: Category[];
}

export interface Author {
  id: string;
  name: string;
  avatar_url: string;
  createdAt: string;
  updatedAt: string;
  profilePicture: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}