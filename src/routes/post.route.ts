import { Router } from "express"
import { getPosts } from "../controllers/post.controller"

const postRouter = Router()

postRouter.get("/posts", getPosts)

export default postRouter
