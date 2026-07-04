"use server";
import { CreateUserFields } from "@/libs/types";
import prisma from "@/libs/prisma";
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