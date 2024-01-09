"use client"
import styles from '@/styles/feed.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Post({authorName, author, caption, media, mediaType, likes}){
    const {data: session} = useSession();

    return(
        <div className={styles.post}>
            <Link href={`/user/${author}`}>{authorName}</Link> <br />
            {mediaType == 'i' && <Image width={350} height={350} src={media} alt='post image'/>}
            {mediaType == 'v' && <video src={media} className={styles.video} controls></video>}
            <p className={styles.postCaption}>{caption}</p>
            <button>{likes} Likes</button>
            {session?.user?.id == author && <button>Delete post</button>}
        </div>
    )
}