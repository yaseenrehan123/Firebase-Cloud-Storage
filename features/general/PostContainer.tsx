import { PostContainerProps } from '@/libs/types'
import Image from 'next/image'
import React from 'react'

const PostContainer = ({ caption, imgUrl }: PostContainerProps) => {
    return (
        <div className='w-full max-w-[320px] flex items-center flex-col gap-2 p-2 outline-2 outline-black'>
            <div className='w-full relative aspect-video'>
                <Image fill={true} src={imgUrl} alt="Post image" className='w-full h-full object-cover' />
            </div>
            <div className='text-white font-inter text-[1.2rem]'>
                {caption}
            </div>
        </div>
    )
}

export default PostContainer