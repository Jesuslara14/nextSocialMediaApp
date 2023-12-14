"use client"
import styles from '@/styles/authentication.module.css'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function Login(){
    const [error, setError] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = e.target[0].value;
        const password = e.target[1].value;

        await signIn('credentials', {
            email,
            password
        })
        .then((resolve) => {
            console.log(resolve)
        })
    }

    return(
        <div className={styles.authPage}>
            <h3>Log in</h3>
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
                <input type="email" name='email' id='email' placeholder='Email'/> <br />
                <input type="password" name='password' id='password' placeholder='Password'/> <br />
                <button type='submit'>Login</button>
            </form>
            <p>No account? No problem! <Link href={'/profile/signup'}><u>Sign Up!</u></Link></p>
        </div>
    )
}