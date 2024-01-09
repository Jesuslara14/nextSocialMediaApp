"use client"
import styles from '@/styles/profile.module.css'
import UserCard from '@/components/UserCard/UserCard'
import Feed from '@/components/Feed/Feed'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function User({params}) {
    const {data: session, status, update} = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState({});

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

    const handleFollow = () => {
        if(!session){
            return router.push('/profile/login')
        } else {
            if(session.user.following.includes(params.id)){
                const following = session.user.following.splice(session.user.following.indexOf(params.id), 1);
                update({
                    following: following
                });
            } else {
                const following = session.user.following.push(params.id);
                update({
                    following: following
                })
            }
            fetch(`/api/users/follow?user=${session.user.id}&target=${params.id}`, {
                method: 'PUT'
            });
        }
    }

    const getFollowButtonName = () => {
        if(session?.user?.following.includes(params.id)){
            return 'Unfollow'
        } else {
            return 'Follow'
        }
    }
    
    return(
        <div className={styles.profileWrapper}>
            <UserCard
                username={userData.username}
                bio={userData.bio}
                avatar={userData.avatar}
                followers={userData.followers}
            />
            <button onClick={handleFollow}>{getFollowButtonName()}</button>
            <hr />
            <Feed 
                search={true}
                type={'user'}
                term={params.id}
            />
        </div>
    )
}