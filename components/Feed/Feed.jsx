"use client"
import styles from '@/styles/feed.module.css'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Post from './Post/Post'

export default function Feed({search, type, term}) {
    const { status } = useSession();
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [apiUrl, setApiUrl] = useState('/api/posts/fetch')

    const fetchPosts = async () => {
        let res = await fetch(apiUrl, {
            method: 'GET',
        })
    
        res = await res.json();

        console.log(res.body)

        setLoadedPosts(res.body);
        setTotalPages(Math.floor(res.body.length/10))
    }

    useEffect(() => {
        fetchPosts();
    }, [apiUrl]);

    useEffect(() => {
        if(search){
            const newApiUrl = `${apiUrl}?${type}=${term}`;
            setApiUrl(newApiUrl);
        } else {
            setApiUrl(prevData => prevData);
        }
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
            <button>Refresh Feed</button>
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