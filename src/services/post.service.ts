import { prisma } from "../utils/prisma"

export class PostService {
  async findAll() {
    const posts = await prisma.post.findMany()
    return posts
  }
}
