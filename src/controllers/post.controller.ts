import { NextFunction, Request, Response } from "express"
import { PostService } from "../services/post.service"
import redisClient from "../utils/redis"
import logger from "../config/logger"

const postService = new PostService()

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
