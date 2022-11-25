export interface CommentEntity {
  id: string;
  author: string;
  text: string;
  avatar: string;
}

export interface CommentsData {
  [key: string]: Array<CommentEntity>;
}
