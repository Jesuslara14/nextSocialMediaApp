"use client"
import styles from '@/styles/profile.module.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import UserCard from '@/components/UserCard/UserCard'

export default function Profile(){
    const { data: session, status } = useSession();
    const router = useRouter()

    if (status === "loading"){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if (status === "unauthenticated"){
        router.push('/profile/login');
        return(
            <div>
                Reditecting...
            </div>
        )
    }

    return(
        <div className={styles.profileWrapper}>
            <UserCard
                username={'John Doe'}
                bio={'HELL O'}
                avatar={null}
            />
            <hr />
        </div>
    )
}