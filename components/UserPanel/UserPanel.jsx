"use client"
import styles from '@/styles/userpanel.module.css'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Notifications from './Notifications/Notifications';

export default function UserPanel() {
    const { data: session, status } = useSession();

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
            <div className={styles.userPanel}>
                <h3>Welcome, <br /><Link href={'/profile'} className={styles.underline}>{session.user.username}</Link></h3>
                <Notifications />
                <button onClick={signOut} className={styles.signOut}>Sign Out</button>
            </div>
        )
    }
}