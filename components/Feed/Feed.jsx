"use client"
import styles from '@/styles/feed.module.css'

export default function Feed() {
    return(
        <div className={styles.feed}>
            <h1>Welcome!</h1>
            <form>
                <h3>Search for specific tags</h3>
                <hr />
                <input type="text" name='searchTerm'/> 🔍
            </form>
        </div>
    )
}