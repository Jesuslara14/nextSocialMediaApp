"use client"
import Feed from '@/components/Feed/Feed'
import HomeAside from '@/components/HomeAside/HomeAside'
import styles from '../styles/page.module.css'
import { useState } from 'react'

export default function Home() {
  const [searchFormData, setSearchFormData] = useState({
    search: false,
    term: null
  });

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
        <Feed 
          search={searchFormData.search}
          type={'keyword'}
          term={searchFormData.term}
        />
        <HomeAside />
      </div>
    </main>
  )
}
