import { createUploadthing } from "uploadthing/next";
import type { FileRouter } from "uploadthing/next";
const uploadThing = createUploadthing();

export const uploadThingFileRouter = {
    imageUploader: uploadThing({
        image: { maxFileSize: "32MB", maxFileCount: 1 }
    }).onUploadComplete(() => { })
} satisfies FileRouter
