import styles from '@/styles/authentication.module.css'
import Link from 'next/link'

export default function Login(){
    return(
        <div className={styles.authPage}>
            <form className={styles.formWrapper}>
                <h3>Log in</h3>
                <input type="email" name='email' id='email' placeholder='Email'/> <br />
                <input type="password" name='password' id='password' placeholder='Password'/> <br />
                <button type='submit'>Login</button>
            </form>
            <p>No account? No problem! <Link href={'/profile/signup'}><u>Sign Up!</u></Link></p>
        </div>
    )
}