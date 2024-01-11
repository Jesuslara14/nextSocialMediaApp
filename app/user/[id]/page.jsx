"use client"
import styles from '@/styles/profile.module.css'
import UserCard from '@/components/UserCard/UserCard'
import Feed from '@/components/Feed/Feed'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function User({params}) {
    const {data: session, status, update} = useSession();
    const followingList = session?.user?.following;
    const router = useRouter();
    const [isFollowing, setIsFollowing] = useState(false)
    const [userData, setUserData] = useState({});

    if(status == 'authenticated' && session?.user?.id == params.id){
        router.push('/profile');
    }

    useEffect(() => {
        setIsFollowing(followingList.includes(params.id));
    }, [followingList, params.id])

    useEffect(() => {
        fetch('/api/users/fetch/' + params.id, {
            method: 'GET',
        }).then(res => {
            return res.json();
        }).then(data => {
            setUserData(data.body);
        })
    }, []);

    const handleFollow = () => {
        if(!session){
            return router.push('/profile/login')
        } else {
            if(isFollowing){
                const updatedFollowing = session.user.following.splice(session.user.following.indexOf(params.id), 1);
                debugger
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
    
    return(
        <div className={styles.profileWrapper}>
            <UserCard
                username={userData.username}
                bio={userData.bio}
                avatar={userData.avatar}
                followers={userData.followers}
            />
            <button onClick={handleFollow}>Follow</button>
            <hr />
            <Feed 
                search={true}
                type={'user'}
                term={params.id}
            />
        </div>
    )
}