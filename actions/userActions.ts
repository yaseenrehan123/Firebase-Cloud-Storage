"use server";
import { CreateUserFields, DeleteAccountConfirmationFields } from "@/libs/types";
import prisma from "@/libs/prisma";
import { createClerkClient } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { Post } from "@/app/generated/prisma/client";

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
const uTApi = new UTApi();

export async function createUser(data: CreateUserFields): Promise<void> {
    const user = await prisma.user.findUnique({
        where: { clerkId: data.clerkId }
    });
    if (user) {
        throw new Error("USER ALREADY EXISTS!")
    }
    const newUser = await prisma.user.create({
        data: data
    });
    console.log("NEW USER CREATED: ", newUser);

}
export async function deleteUser(data: DeleteAccountConfirmationFields): Promise<void> {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
        include: { posts: true }
    });
    if (!user) {
        throw new Error("USER DOES NOT EXIST!")
    }

    const fileKeysToDelete: string[] = user.posts.map((post: Post) =>
        post.fileUrl.split("/").pop()).filter(Boolean) as string[]

    await prisma.user.delete({
        where: { email: user.email }
    });

    try {
        console.log(`Deleting ${fileKeysToDelete.length} files from UploadThing...`);
        await uTApi.deleteFiles(fileKeysToDelete)
    }
    catch (err) {
        throw new Error((err as Error).message)
    }

    try {
        clerkClient.users.deleteUser(user.clerkId);
    }
    catch (err) {
        throw new Error((err as Error).message)
    }
}