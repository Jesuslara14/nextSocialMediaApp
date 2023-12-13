"use client"
import styles from '@/styles/userpanel.module.css'
import { useSession } from 'next-auth/react'
import Link from 'next/link';

export default function UserPanel() {
    const { status } = useSession();

    if(status === "loading"){
        return(
            <p className={styles.mustSignIn}>
                Loading...
            </p>
        )
    }
    
    if(status === "unauthenticated"){
        return(
            <p className={styles.mustSignIn}>
                It's bout time you <Link href={'/profile/signup'} className={styles.underline}>
                    create an account 
                </Link>. 
                Or if you already have one, make sure to <Link href={'/profile/login'} className={styles.underline}>
                     sign in!
                </Link>
            </p>
        )
    }

    if(status === "authenticated"){
        return(
            <Link href={'/profile'} className={styles.underline}>Profile Page</Link>
        )
    }
}