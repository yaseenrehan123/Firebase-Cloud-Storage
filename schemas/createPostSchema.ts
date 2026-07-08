import z from "zod";

const createPostSchema = z.object({
    caption: z.string()
        .min(1, "Title cant be empty")
        .max(50, "Title cant exceed max 50 characters"),
    fileUrl: z.string(),
    userClerkId: z.string(),
});

export default createPostSchema;