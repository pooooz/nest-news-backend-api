export interface NewsEntity {
  id: string;
  title: string;
  author: string;
  description: string;
  coverSrc: string;
  views: number;
}

export interface NewsData {
  [key: string]: NewsEntity;
}
