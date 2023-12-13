import Image from 'next/image'
import Feed from '@/components/Feed/Feed'
import styles from '../styles/page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Feed />
    </main>
  )
}
