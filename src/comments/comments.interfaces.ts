export interface CommentEntity {
  id: string;
  author: string;
  text: string;
}

export interface CommentsData {
  [key: string]: Array<CommentEntity>;
}
