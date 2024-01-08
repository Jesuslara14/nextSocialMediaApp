"use client"
import styles from '@/styles/authentication.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

export default function Signup(){
    const { status } = useSession();
    const [error, setError] = useState(null);
    const router = useRouter();

    if(status == 'authenticated'){
        router.push('/profile');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const confirmPassword = e.target[3].value

        if(password != confirmPassword){
            return(setError('Passwords do not match!'));
        }

        const res = await fetch('/api/auth/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        if(res.status == 200){
            router.push('/profile/login');
        } else {
            setError('Internal server error');
        }
    }

    return(
        <div className={styles.authPage}>
            <h3>Sign Up</h3>
            {error && error}
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
                <input type="text" name='username' id='username' placeholder='Username'/> <br />
                <input type="email" name='email' id='email' placeholder='Email'/> <br />
                <input type="password" name='password' id='password' placeholder='Password'/> <br />
                <input type="password" name='confirmPassword' id='confirmPassword' placeholder='Confirm Password'/> <br />
                <button type='submit'>Sign Up</button>
            </form>
            <p>Pssst, Account already? <Link href={'/profile/login'}><u>Log In!</u></Link></p>
        </div>
    )
}