export interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: Array<{ id: number; text: string; user: string }>;
}
