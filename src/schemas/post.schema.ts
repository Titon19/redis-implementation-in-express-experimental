import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(1000),
});

export type CreatePostValue = z.infer<typeof createPostSchema>;
