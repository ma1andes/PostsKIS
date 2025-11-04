export enum PostType {
  NEWS = "news",
  ALERT = "alert",
}

export interface IPost {
  id: number;
  title: string;
  content: string;
  dateTime: Date;
  typePost: PostType;
}

export interface IPostRequest {
  title?: string;
  content?: string;
  dateTime?: string;
  typePost?: PostType;
}
