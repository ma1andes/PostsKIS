import { Router } from "express";
import {
  getAllPostsHandler,
  getPostByIdHandler,
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
} from "../controllers/postsController";

const router = Router();

/**
 * @route   GET /api/posts
 * @desc    Получить все посты
 */
router.get("/", getAllPostsHandler);

/**
 * @route   GET /api/posts/:id
 * @desc    Получить пост по ID
 */
router.get("/:id", getPostByIdHandler);

/**
 * @route   POST /api/posts
 * @desc    Создать новый пост
 */
router.post("/", createPostHandler);

/**
 * @route   PUT /api/posts/:id
 * @desc    Обновить существующий пост
 */
router.put("/:id", updatePostHandler);

/**
 * @route   DELETE /api/posts/:id
 * @desc    Удалить пост
 */
router.delete("/:id", deletePostHandler);

export default router;
