"use client"
import Feed from '@/components/Feed/Feed'
import HomeAside from '@/components/HomeAside/HomeAside'
import styles from '../styles/page.module.css'
import { useState } from 'react'
import PostSearchForm from '@/components/Forms/PostSearchForm'

export default function Home() {
  const [searchFormData, setSearchFormData] = useState({
    search: false,
    term: null
  });

  return (
    <main className={styles.main}>
      <div className={styles.feed}>
        <h1>Welcome!</h1>
        <PostSearchForm 
          setData = {setSearchFormData}
          styles = {styles}
        />
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
