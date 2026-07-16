"use client";
import { useInView } from "react-intersection-observer"
import React, { useEffect } from 'react'
import { useInfiniteQuery } from "@tanstack/react-query";
import Alignment from "@/components/ui/general/alignment";
import { Post } from "@/app/generated/prisma/client";
import { fetchPosts } from "@/actions/postActions";
import Message from "@/components/ui/general/message";
import PostContainer from "../general/PostContainer";
import PostsWrapper from "./PostsWrapper";

const PostsSection = () => {
    const postsLimit: number = 9

    const { ref, inView, entry } = useInView({
        threshold: 0.1
    });

    const { data, fetchNextPage, fetchPreviousPage, hasNextPage,
        hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage, status, error } = useInfiniteQuery({
            queryKey: ["posts-fetching"],
            initialPageParam: 1,
            queryFn: async ({ pageParam }) => fetchPosts({ page: pageParam, limit: postsLimit }),
            getNextPageParam: (lastPage, allPages) => lastPage.nextPage ?? null,
            getPreviousPageParam: (lastPage, allPages) => { }
        })


    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])
    if (status == "pending") return (<Message content={"Loading..."} variant="loading" disableOnContent="never" />)
    if (status == "error") return (<Message content={(error as Error).message} variant="error" disableOnContent="never" />)
    return (
        <div className="flex items-center flex-col gap-2 border-2 border-pink-500 w-full pt-2">
            <PostsWrapper data={data} />

            <div ref={ref}
                className={`${(hasNextPage && isFetchingNextPage) ? "text-yellow-500" : "text-white"}`}>
                {isFetchingNextPage ?
                    "Fetching...." : hasNextPage ?
                        "Scroll down to load..." : "You have reach the end"}
            </div>
        </div>

    )
}

export default PostsSection