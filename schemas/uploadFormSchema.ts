import z from "zod";

const uploadFormSchema = z.object({
    caption: z.string()
        .min(1, "Caption cant be null"),
    file: z
        .custom<FileList>((val) => val instanceof FileList, "File is required")
        .refine((files) => files.length > 0, "Please select a image")
});

export default uploadFormSchema