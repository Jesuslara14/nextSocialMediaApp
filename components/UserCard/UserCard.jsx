import styles from '@/styles/profile.module.css'
import Image from 'next/image'

export default function UserCard({ username, bio, avatar, followers }){
    return(
        <div className={styles.userCard}>
            <Image 
            src={avatar || '/default.jpg'}
            width={125}
            height={125}
            className={styles.avatar}
            alt={'profile'}
            />
            <div className={styles.wordInfo}>
                <h2>
                    {username}
                </h2>
                <h4>{followers || 0} Followers</h4>
                <hr />
                <p className={styles.bio}>
                    {bio || 'A fellow earth dweller'}
                </p>
            </div>
        </div>
    )
}