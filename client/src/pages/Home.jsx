import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchInput } from '../components/SearchInput';

export default function Home(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

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
            <div>
                hello
            </div>
        </div>
    );
}

