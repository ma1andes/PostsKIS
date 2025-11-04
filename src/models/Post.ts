import { IPost, IPostRequest, PostType } from "./types";
//Заменить на БД
let posts: IPost[] = [];
let idCounter = 1;

function validatePostData(data: IPostRequest, isCreate: boolean = false): void {
  if (isCreate) {
    if (!data.title || typeof data.title !== "string") {
      throw new Error(
        "VALIDATION_ERROR: title обязателен и должен быть строкой"
      );
    }
    if (!data.content || typeof data.content !== "string") {
      throw new Error(
        "VALIDATION_ERROR: content обязателен и должен быть строкой"
      );
    }
  }

  if (data.title !== undefined) {
    if (typeof data.title !== "string") {
      throw new Error("VALIDATION_ERROR: title должен быть строкой");
    }
    if (data.title.trim().length === 0) {
      throw new Error("VALIDATION_ERROR: title не может быть пустым");
    }
    if (data.title.length > 200) {
      throw new Error(
        "VALIDATION_ERROR: title не может быть длиннее 200 символов"
      );
    }
  }

  if (data.content !== undefined) {
    if (typeof data.content !== "string") {
      throw new Error("VALIDATION_ERROR: content должен быть строкой");
    }
    if (data.content.trim().length === 0) {
      throw new Error("VALIDATION_ERROR: content не может быть пустым");
    }
    if (data.content.length > 10000) {
      throw new Error(
        "VALIDATION_ERROR: content не может быть длиннее 10000 символов"
      );
    }
  }

  if (
    data.typePost !== undefined &&
    !Object.values(PostType).includes(data.typePost)
  ) {
    throw new Error(
      "VALIDATION_ERROR: typePost должен быть одним из: news, alert"
    );
  }

  if (data.dateTime !== undefined) {
    const date = new Date(data.dateTime);
    if (isNaN(date.getTime())) {
      throw new Error("VALIDATION_ERROR: dateTime должен быть валидной датой");
    }
  }
}

function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, "");
}

export function getAllPosts(): IPost[] {
  return [...posts];
}

export function getPostById(id: number): IPost | undefined {
  return posts.find((p) => p.id === id);
}

export function createPost(data: IPostRequest): IPost {
  validatePostData(data, true);

  if (!data.title || !data.content) {
    throw new Error("VALIDATION_ERROR: title и content обязательны");
  }

  const post: IPost = {
    id: idCounter++,
    title: sanitizeString(data.title),
    content: sanitizeString(data.content),
    dateTime: data.dateTime ? new Date(data.dateTime) : new Date(),
    typePost: data.typePost || PostType.NEWS,
  };

  posts.push(post);
  return post;
}

export function updatePost(id: number, data: IPostRequest): IPost {
  validatePostData(data, false);

  const post = posts.find((p) => p.id === id);
  if (!post) {
    throw new Error("NOT_FOUND: Пост с указанным ID не найден");
  }

  if (data.title !== undefined) {
    post.title = sanitizeString(data.title);
  }
  if (data.content !== undefined) {
    post.content = sanitizeString(data.content);
  }
  if (data.dateTime !== undefined) {
    post.dateTime = new Date(data.dateTime);
  }
  if (data.typePost !== undefined) {
    post.typePost = data.typePost;
  }

  return post;
}

export function deletePost(id: number): boolean {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error("NOT_FOUND: Пост с указанным ID не найден");
  }

  posts.splice(index, 1);
  return true;
}
