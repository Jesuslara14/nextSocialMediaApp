import styles from '@/styles/authentication.module.css'
import Link from 'next/link'

export default function Signup(){
    return(
        <div className={styles.authPage}>
            <form className={styles.formWrapper}>
                <h3>Sign Up</h3>
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