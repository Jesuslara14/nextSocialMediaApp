import styles from '@/styles/profile.module.css'
import Image from 'next/image'

export default function UserCard({ username, bio, avatar }){
    return(
        <div className={styles.userCard}>
            <Image 
            src={avatar || '/default.jpg'}
            width={125}
            height={125}
            className={styles.avatar}
            />
            <div className={styles.wordInfo}>
                <h2>
                    {username}
                </h2>
                <hr />
                <p className={styles.bio}>
                    {bio}
                </p>
            </div>
        </div>
    )
}