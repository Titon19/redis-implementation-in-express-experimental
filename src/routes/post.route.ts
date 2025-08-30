import { Router } from "express"
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/post.controller"

const postRouter = Router()

postRouter.get("/posts", getPosts)
postRouter.get("/posts/:id", getPostById)
postRouter.post("/posts", createPost)
postRouter.put("/posts/:id", updatePost)
postRouter.delete("/posts/:id", deletePost)

export default postRouter
