"use server";
import { CreatePostFields } from "@/libs/types";
import prisma from "@/libs/prisma";

export async function createPost(data: CreatePostFields) {
    const user = await prisma.user.findUnique({
        where: { clerkId: data.userClerkId }
    });
    if (!user) {
        throw new Error("USER DOES NOT EXIST!")
    }

    const post = await prisma.post.create({
        data: data
    });

    console.log("POST CREATED: ", post);
}