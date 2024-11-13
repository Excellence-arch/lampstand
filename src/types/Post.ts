import { IData } from './User';

export interface ILike {
  user: string;
  // comment: Schema.Types.ObjectId;
  post: string;
}

export enum ContentType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
}

export interface IComment {
  _id: string;
  body: string;
  like: ILike[];
  user: string;
  post: string;
}

export interface IPost {
  _id: string;
  title: string;
  body: string;
  contentType: ContentType;
  user: string;
  comments: IComment[];
  likes: ILike[];
}

export interface IPostCom {
  _id: string;
  title: string;
  body: string;
  contentType: ContentType;
  user: string;
  comments: string;
  likes: ILike[];
}

export interface postResponse extends IData {
  posts: IPost[];
}
