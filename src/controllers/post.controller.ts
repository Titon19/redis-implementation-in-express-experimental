import { NextFunction, Request, Response } from "express"
import { PostService } from "../services/post.service"
import redisClient from "../utils/redis"
import logger from "../config/logger"
import { PostSchema } from "../schemas/post.schema"

const postService = new PostService()

// get all page eager cache
export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ambil dari redis dulu, kalau ada, langsung return

    const cachedPosts = await redisClient.get("posts")
    if (cachedPosts) {
      logger.info("Get data from redis")
      return res.status(200).json(JSON.parse(cachedPosts))
    }

    //   Kalo gaada baru ambil dari database
    const posts = await postService.findAll()

    //   Terus masukin ke redis
    await redisClient.setex("posts", 60 * 60, JSON.stringify(posts))

    return res.status(200).json({
      data: posts,
      success: true,
      message: "Success",
    })
  } catch (error) {
    next(error)
  }
}

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = parseInt(req.params.id)
    const cachedPost = await redisClient.get(`post:${postId}`)

    if (cachedPost) {
      logger.info("Get data from redis")
      return res.status(200).json(JSON.parse(cachedPost))
    }

    const post = await postService.findById(postId)
    if (!post) {
      return res.status(404).json({
        data: null,
        message: "Post not found",
        success: false,
      })
    }

    await redisClient.setex(`post:${postId}`, 60 * 60, JSON.stringify(post))

    return res.status(200).json({
      data: post,
      message: "Succesfully get post by id",
      success: true,
    })
  } catch (error) {
    next(error)
  }
}

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parse = PostSchema.safeParse(req.body)

    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format })
    }

    const newPost = await postService.create(parse.data)
    await redisClient.del("posts")

    return res.status(201).json({
      data: newPost,
      success: true,
      message: "Success",
    })
  } catch (error) {
    next(error)
  }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parse = PostSchema.safeParse(req.body)
    const postId = parseInt(req.params.id)

    if (!postId) {
      return res.status(404).json({
        data: null,
        message: "Post not found",
        success: false,
      })
    }

    if (!parse.success) {
      return res.status(400).json({ error: parse.error.format })
    }

    const updatePost = await postService.update(parse.data, postId)

    await redisClient.del("posts")
    await redisClient.del(`posts:${postId}`)

    return res.status(201).json({
      data: updatePost,
      success: true,
      message: "Success",
    })
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = parseInt(req.params.id)

    const deletePost = await postService.delete(postId)
    await redisClient.del("posts")
    await redisClient.del(`post:${postId}`)

    return res.status(201).json({
      data: deletePost,
      success: true,
      message: "Success",
    })
  } catch (error) {
    next(error)
  }
}
