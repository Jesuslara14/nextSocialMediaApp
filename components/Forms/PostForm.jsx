"use client"
import ReactModal from "react-modal";
import uploadToCloudinary from '../../app/profile/uploadToCloudinary'
import { useState } from "react";
import styles from '@/styles/profile.module.css'

export default function PostFormModal({isOpen, toggleOpen, sessionData}){
    const [postFormData, setPostFormData] = useState({});
    const [formError, setFormError] = useState(null);

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        const media = e.target[0].files[0];
        const mediaType = media.type[0];

        const formData = new FormData();
    
        formData.append('file', media);
        formData.append('upload_preset', 'social_app_media');

        const cloudRes = await uploadToCloudinary(formData);

        if(!cloudRes.ok){
            return setFormError(cloudRes.message);
        }

        const apiRes = await fetch('api/posts/upload', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author: sessionData.id,
                authorName: sessionData.username,
                caption: postFormData.caption,
                media: cloudRes.body,
                mediaType: mediaType
            })
        });

        if(apiRes.status == 200){
            setFormError(null);
            setPostFormData({});
            return toggleOpen();
        } else {
            return setFormError('Internal server error');
        }
    }

    const handleFormChange = (e) => {
        setPostFormData(prevData => ({
            ...prevData,
            [ e.target.name ]: e.target.value
        }));
    }

    return(
        <ReactModal 
                isOpen = {isOpen}
                onRequestClose={toggleOpen}
                contentLabel='Create a New Post'
            >
                <h1>Create New Post</h1>
                {formError && formError}
                <form onSubmit={handlePostSubmit}>
                    <input type="file" accept='image/png, image/jpg, image/jpeg, video/mp4' required/> <br />
                    <input type="text" placeholder='Enter a caption' className={styles.textBox} name="caption" onChange={handleFormChange} required/> <br />
                    <button type='submit'>Post</button>
                </form>
        </ReactModal> 
    )
}