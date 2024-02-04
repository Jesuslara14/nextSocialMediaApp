"use client"
import styles from '@/styles/feed.module.css'
import { useEffect, useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Post from './Post/Post'

export default function Feed({search, type, term}) {
    const { status } = useSession();
    const isSet = useRef(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [apiUrl, setApiUrl] = useState(null)

    const fetchPosts = async () => {
        if(apiUrl != null){
            let res = await fetch(apiUrl, {
                method: 'GET',
            })
            res = await res.json();
            setLoadedPosts(res.body);
            setTotalPages(Math.floor(res.body.length/10))
        }
    }

    useEffect(() => {
        if(isSet.current){
            fetchPosts();
        }
    }, [apiUrl]);

    useEffect(() => {
        console.log({search, type, term})
        if(search){
            const newApiUrl = `/api/posts/fetch?${type}=${term}`;
            setApiUrl(newApiUrl);
        } else {
            setApiUrl('/api/posts/fetch');
        }
        isSet.current = true;
    }, []);

    if (status === "loading"){
        return(
            <div className={styles.feed}>
                Loading...
            </div>
        )
    }

    return(
        <div className={styles.feed}>
            <button onClick={fetchPosts}>Refresh Feed</button>
            <div className={styles.posts}>
                {loadedPosts.map((post, index) => (
                    <Post 
                        authorName={post.authorName}
                        author={post.author}
                        caption={post.caption}
                        media={post.media}
                        mediaType={post.mediaType}
                        likes={post.likes}
                        key={index}
                    />
                ))}
            </div>
            <div className={styles.feedPages}>
                Page {currentPage + 1} out of {totalPages + 1 || 'Unknown'} <br />
            </div>
        </div>
    )
}