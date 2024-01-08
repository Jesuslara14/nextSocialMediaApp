"use client"
import styles from '@/styles/profile.module.css'
import UserCard from '@/components/UserCard/UserCard'
import Feed from '@/components/Feed/Feed'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function User({params}) {
    const {data: session, status} = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState({});
    const [isFollowed, setIsFollowed] = useState(null);

    if(status == 'authenticated' && session.user.id == params.id){
        router.push('/profile')
    }

    useEffect(() => {
        fetch('/api/users/fetch/' + params.id, {
            method: 'GET',
        }).then(res => {
            return res.json()
        }).then(data => {
            setUserData(data.body)
        })
    }, []);
    
    return(
        <div className={styles.profileWrapper}>
            <UserCard
                username={userData.username}
                bio={userData.bio}
                avatar={userData.avatar}
                followers={userData.followers}
            />
            <button>Follow</button>
            <hr />
            <Feed 
                search={true}
                type={'user'}
                term={params.id}
            />
        </div>
    )
}