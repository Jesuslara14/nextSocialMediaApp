"use client"
import styles from '@/styles/profile.module.css'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import ReactModal from 'react-modal'
import UserCard from '@/components/UserCard/UserCard'
import Feed from '@/components/Feed/Feed'
import uploadToCloudinary from './upload'

ReactModal.setAppElement('#body');

export default function Profile(){
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const [postFormIsOpen, setPostFormIsOpen] = useState(false);
    const [postFormError, setPostFormError] = useState(null);
    const [editFormIsOpen, setEditFormIsOpen] = useState(false);
    const [editFormError, setEditFormError] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const handleTogglePostForm = () => {
        setPostFormIsOpen(!postFormIsOpen);
        setPostFormError(null);
    }

    const handleToggleEditForm = () => {
        setEditFormIsOpen(!editFormIsOpen);
        setEditFormError(null);
        setEditFormData({
            username: session.user.username,
            bio: session.user.bio,
            avatarUrl: session.user.avatar
        })
    }

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const media = e.target[0].files[0];
        const caption = e.target[1].value;
        const author = session.user.id;
        const authorName = session.user.username;
        const mediaType = media.type[0];

        const formData = new FormData();
    
        formData.append('file', media);
        formData.append('upload_preset', 'social_app_media');

        const cloudRes = await uploadToCloudinary(formData);

        if(!cloudRes.ok){
            return setPostFormError(cloudRes.message);
        }

        const apiRes = await fetch('api/posts/upload', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author: author,
                authorName: authorName,
                caption: caption,
                media: cloudRes.body,
                mediaType: mediaType
            })
        });

        if(apiRes.status == 200){
            setPostFormError(null);
            return handleTogglePostForm();
        } else {
            return setPostFormError('Internal server error');
        }
    }

    const handleEditFormSubmit = async (e) => {
        e.preventDefault();
        const avatar = e.target[0].files[0]
        const password = e.target[3].value;

        const formData = new FormData();

        formData.append('file', avatar);
        formData.append('upload_preset', 'social_app_media');

        const cloudRes = await uploadToCloudinary(formData);

        if(!cloudRes.ok && avatar != undefined){
            return setEditFormError(cloudRes.message);
        }

        const apiRes = await fetch('api/users/edit', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: session.user.id,
                username: editFormData.username,
                avatarUrl: cloudRes.body || session.user.avatar,
                bio: editFormData.bio,
                password: password
            })
        });

        if(apiRes.status == 200){
            setEditFormError(null);
            update({
                username: editFormData.username,
                bio: editFormData.bio,
                avatar: cloudRes.body || session.user.avatar
            })
            return handleToggleEditForm();
        } else if(apiRes.status == 401){
            return setEditFormError('Wrong password')
        } else {
            return setEditFormError('Internal server error');
        }
    }

    const handleEditFormChange = (e) => {
        setEditFormData(prevData => ({
            ...prevData,
            [ e.target.name ]: e.target.value
        }))
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
            <ReactModal 
                isOpen = {postFormIsOpen}
                onRequestClose={handleTogglePostForm}
                contentLabel='Create a New Post'
            >
                <h1>Create New Post</h1>
                {postFormError && postFormError}
                <form onSubmit={handlePostSubmit}>
                    <input type="file" accept='image/png, image/jpg, image/jpeg, video/mp4' required/> <br />
                    <input type="text" placeholder='Enter a caption' className={styles.textBox} required/> <br />
                    <button type='submit'>Post</button>
                </form>
            </ReactModal>
            <ReactModal
                isOpen = {editFormIsOpen}
                onRequestClose={handleToggleEditForm}
                contentLabel='Edit User'
            >
                <h1>Edit User</h1>
                {editFormError && editFormError}
                <form onSubmit={handleEditFormSubmit}>
                    <input type="file" accept='image/png, image/jpg' /> <br />
                    <input type="text" value={editFormData.username} placeholder="Don't be nameless" onChange={handleEditFormChange} name='username' required/> <br />
                    <input type="text" value={editFormData.bio} placeholder='Make it descriptive' onChange={handleEditFormChange} name='bio'/> <br />
                    <input type="password" placeholder='Password required' required/> <br />
                    <button type='submit'>Update</button>
                </form>
            </ReactModal>
            <Feed />
        </div>
    )
}