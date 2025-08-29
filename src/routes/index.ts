import { Router } from "express"
import PostRouter from "./post.route"

const indexRouter = Router()

indexRouter.use(PostRouter)

export default indexRouter
