import z from "zod";

const uploadFormSchema = z.object({
    caption: z.string(),
    file: z
        .custom<FileList>((val) => val instanceof FileList, "File is required")
        .refine((files) => files.length > 0, "Please select a image")
});

export default uploadFormSchema