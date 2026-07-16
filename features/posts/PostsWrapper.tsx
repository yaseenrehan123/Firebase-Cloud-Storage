"use client";
import React from 'react'
import PostContainer from '../general/PostContainer'
import { PostsWrapperProps } from '@/libs/types'

const PostsWrapper = ({ data }: PostsWrapperProps) => {
    return (
        <div className='w-full min-h-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2'>
            {data.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                    {page.posts.map((post) => (
                        <PostContainer
                            key={post.id}
                            caption={post.caption}
                            imgUrl={post.fileUrl}
                        />
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}

export default PostsWrapper