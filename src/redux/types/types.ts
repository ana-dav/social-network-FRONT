export interface User {
  credentials: Credential;
  likes: Like[];
  notifications: any[];
}

export interface Credential {
  location: string;
  website: string;
  bio: string;
  userId: string;
  imageUrl: string;
  email: string;
  handle: string;
  createdAt: string;
}

export interface Like {
  userHandle: string;
  screamId: string;
}

export interface IPost {
  screamId: string;
  body: string;
  userHandle: string;
  createdAt: string;
  commentCount: number;
  likeCount: number;
  userImage: string;
  comments: Comment[];
}

export interface Comment {
  screamId: string;
  createdAt: string;
  userImage: string;
  body: string;
  userHandle: string;
  createadAt: string;
}

export interface NewUser {
  email: string;
  password: string;
  confirmPassword: string;
  handle: string;
}

export interface UiInitState {
  loading: boolean;
  errors: null;
}

export type DataInitState = {
  post: IPost | {} | any;
  posts: IPost[] | [];
  loading: boolean;
};

export interface UserInitState {
  authenticated: boolean;
  loading: boolean;
  credentials: any;
  likes: Like[] | [];
  notifications?: any[];
}
