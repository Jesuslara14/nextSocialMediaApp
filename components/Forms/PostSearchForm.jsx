"use client"

export default function PostSearchForm({setData, styles}){
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value)
        setData({
            search: true,
            term: e.target[0].value
        })
    }
    return(
        <form onSubmit={handleSubmit}>
            <h3>Search for specific tags</h3>
            <hr />
            <input type="text" name='searchTerm'/> <button type='submit' className={styles.searchFeed}>🔍</button>
        </form>
    )
}