import { Post } from "../generated/prisma"
import { PostValue } from "../schemas/post.schema"
import { prisma } from "../utils/prisma"

export class PostService {
  async findAll() {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    })
    return posts
  }

  async findById(id: number) {
    const postById = await prisma.post.findUnique({ where: { id } })
    return postById
  }

  async create(data: PostValue): Promise<Post> {
    const post = await prisma.post.create({ data })
    return post
  }

  async update(data: PostValue, id: number): Promise<Post> {
    const post = await prisma.post.update({ where: { id }, data })
    return post
  }

  async delete(id: number): Promise<Post> {
    const post = await prisma.post.delete({ where: { id } })
    return post
  }
}
