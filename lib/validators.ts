import { z } from "zod"

// Validate Community Posts
export const PostSchema = z.object({
  content: z.string().min(3, "Post is too short").max(500, "Post is too long"),
  isAnonymous: z.boolean().default(false),
})

// Validate Finance Inquiries
export const InquirySchema = z.object({
  topic: z.string().min(2, "Topic required"),
  message: z.string().min(10, "Please provide more detail"),
})
