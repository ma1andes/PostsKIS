import { Request, Response, NextFunction } from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../models/Post";
import { IPostRequest } from "../models/types";
import { IApiSuccess } from "../types";
import { asyncHandler } from "../utils/asyncHandler";

export const getAllPostsHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = getAllPosts();

    const response: IApiSuccess<typeof posts> = {
      success: true,
      data: posts,
    };

    res.status(200).json(response);
  }
);

export const getPostByIdHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const post = getPostById(id);

    if (!post) {
      res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: `Пост с ID ${id} не найден`,
        },
      });
      return;
    }

    const response: IApiSuccess<typeof post> = {
      success: true,
      data: post,
    };

    res.status(200).json(response);
  }
);

export const createPostHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const postData: IPostRequest = req.body;
    const newPost = createPost(postData);

    const response: IApiSuccess<typeof newPost> = {
      success: true,
      data: newPost,
    };

    res.status(201).json(response);
  }
);

export const updatePostHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const updateData: IPostRequest = req.body;

    if (
      updateData.title === undefined &&
      updateData.content === undefined &&
      updateData.dateTime === undefined &&
      updateData.typePost === undefined
    ) {
      res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Необходимо указать хотя бы одно поле для обновления",
        },
      });
      return;
    }

    const updatedPost = updatePost(id, updateData);

    const response: IApiSuccess<typeof updatedPost> = {
      success: true,
      data: updatedPost,
    };

    res.status(200).json(response);
  }
);

export const deletePostHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    deletePost(id);

    const response: IApiSuccess<{ message: string; id: number }> = {
      success: true,
      data: {
        message: "Пост успешно удален",
        id,
      },
    };

    res.status(200).json(response);
  }
);
