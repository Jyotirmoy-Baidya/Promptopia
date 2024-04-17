'use client'

import { useState, useEffect } from "react"
import PromptCard from "@components/PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {
                data.map((post, i) => {
                    return (
                        <div key={i}>
                            <PromptCard key={i} post={post} handleTagClick={handleTagClick} />
                        </div>
                    )
                })
            }
        </div>
    )
}


const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearchChange = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch('/api/prompt');
            const data = await response.json();
            console.log(data);
            setPosts(data);
        }

        fetchPost();
    }, [])

    return (
        <section className="feed">
            <form className=" relative w-full flec-center">
                <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
            </form>
            <PromptCardList data={posts} handleTagClick={() => { }} />
        </section>
    )
}

export default Feed