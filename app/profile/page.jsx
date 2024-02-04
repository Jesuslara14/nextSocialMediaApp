"use client"
import styles from '@/styles/profile.module.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import ReactModal from 'react-modal'
import UserCard from '@/components/UserCard/UserCard'
import Feed from '@/components/Feed/Feed'
import PostFormModal from '../../components/Forms/PostForm'
import EditFormModal from '../../components/Forms/EditProfileForm'

ReactModal.setAppElement('#body');

export default function Profile(){
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [postFormIsOpen, setPostFormIsOpen] = useState(false);
    const [editFormIsOpen, setEditFormIsOpen] = useState(false);

    const handleTogglePostForm = () => {
        setPostFormIsOpen(!postFormIsOpen);
    }

    const handleToggleEditForm = () => {
        setEditFormIsOpen(!editFormIsOpen);
    }

    if (status === "loading"){
        return(
            <div>
                Loading...
            </div>
        )
    }

    if (status === "unauthenticated"){
        router.push('/profile/login');
        return(
            <div>
                Reditecting...
            </div>
        )
    }

    return(
        <div className={styles.profileWrapper}>
            <UserCard
                username={session.user.username}
                bio={session.user.bio}
                avatar={session.user.avatar}
                followers={session.user.followers}
            />
            <button onClick={handleTogglePostForm}>Post</button> <br />
            <button onClick={handleToggleEditForm}>Edit Profile</button>
            <hr />
            <PostFormModal 
                isOpen={postFormIsOpen}
                toggleOpen={handleTogglePostForm}
                sessionData={session.user}
            />
            <EditFormModal
                isOpen={editFormIsOpen}
                toggleOpen={handleToggleEditForm}
                sessionData={session.user}
                update={update}
            />
            <Feed 
                search={true}
                type={'user'}
                term={session.user.id}
            />
        </div>
    )
}