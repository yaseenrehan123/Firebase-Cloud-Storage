import z from "zod";

const uploadFormSchema = z.object({
    caption: z.string(),
    file: z.instanceof(File)
});

export default uploadFormSchema