import { generateUploadButton, generateUploadDropzone, generateReactHelpers } from "@uploadthing/react"
import type { UploadThingFileRouter } from "./types"

export const UploadButton = generateUploadButton<UploadThingFileRouter>()
export const UploadDropZone = generateUploadDropzone<UploadThingFileRouter>()
export const { useUploadThing } = generateReactHelpers<UploadThingFileRouter>();