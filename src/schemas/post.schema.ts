import { z } from "zod"

export const PostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(1000),
})

export type PostValue = z.infer<typeof PostSchema>
