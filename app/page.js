import Image from 'next/image'
import Feed from '@/components/Feed/Feed'
import HomeAside from '@/components/HomeAside/HomeAside'
import styles from '../styles/page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.feed}>
        <h1>Welcome!</h1>
        <form>
            <h3>Search for specific tags</h3>
            <hr />
          <input type="text" name='searchTerm'/> <button type='submit' className={styles.searchFeed}>🔍</button>
        </form>
      </div>
      <div className={styles.homeContent}>
        <Feed />
        <HomeAside />
      </div>
    </main>
  )
}
