"use client"
import ReactModal from "react-modal";
import uploadToCloudinary from '../../app/profile/uploadToCloudinary'
import { useState } from "react";
import styles from '@/styles/profile.module.css'

export default function EditFormModal({isOpen, toggleOpen, sessionData, update}){
    const [editFormError, setEditFormError] = useState(null);
    const [editFormData, setEditFormData] = useState({
        username: sessionData.username,
        bio: sessionData.bio
    });

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
                userId: sessionData.id,
                username: editFormData.username,
                avatarUrl: cloudRes.body || sessionData.avatar,
                bio: editFormData.bio,
                password: password
            })
        });

        if(apiRes.status == 200){
            setEditFormError(null);
            update({
                username: editFormData.username,
                bio: editFormData.bio,
                avatar: cloudRes.body || sessionData.avatar
            })
            return toggleOpen();
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

    return(
        <ReactModal
            isOpen = {isOpen}
            onRequestClose={toggleOpen}
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
    )
}