"use server";
import { CreatePostFields, FetchPostFields } from "@/libs/types";
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
export async function fetchPosts({ page, limit }: FetchPostFields) {
    try {
        const posts = await prisma.post.findMany({
            skip: (page - 1) * limit,
            take: limit + 1,
            orderBy: {
                createdAt: 'asc'
            }
        });
        const hasMore = posts.length > limit;

        if (hasMore) {
            posts.pop();
        }

        const nextPage = hasMore ? page + 1 : null;

        return { posts, nextPage }
    }
    catch (err) {
        throw new Error((err as Error).message)
    }

}