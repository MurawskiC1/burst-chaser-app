import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';
import { useComments } from '../functions/Exports';
import Post from '../components/Post';

export default function Home(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const comments = useComments('', 'comment_created_at DESC')
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    console.log(comments)

    return (
        <div className="home">
            <div className="home-search">
                <div className="home-search-buttons">
                    <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
                    {/* Pass searchQuery as state in Link */}
                    <div className='search-button'>
                        <Link to={{
                            pathname: "/data",
                            search: `?search=${searchQuery}`
                        }}>
                            <button>Search</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='post-feed'>
                <div className='post-container'>
                    {comments.slice(0, 10).map((comment, index) => (
                        <Post key={index} user={comment.comment_user_login} burstID={comment.comment_focus_id} comment={comment.comment_body}
                        />

                    ))}
                </div>
            </div>
        </div>
    );
}

