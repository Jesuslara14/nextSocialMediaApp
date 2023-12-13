"use client"
import styles from '@/styles/feed.module.css'
import { useSession } from 'next-auth/react'

export default function Feed() {
    const { status } = useSession()

    if (status === "loading"){
        return(
            <div className={styles.feed}>
                Loading...
            </div>
        )
    }

    return(
        <div className={styles.feed}>
        </div>
    )
}