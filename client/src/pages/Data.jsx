import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Data(props) {
    const [bursts, setBursts] = useState(props.bursts);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter bursts based on search query
    const filteredBursts = bursts.filter(burst =>
        burst.Burst_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search by Burst Name'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className='data-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Burst Name</th>
                            <th>Burst ID</th>
                            <th>Simple</th>
                            <th>Extended</th>
                            <th>Other</th>
                            <th>Too Noisy</th>
                            <th>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBursts.map((burst) => (
                            <tr key={burst.BurstID}>
                                <td><Link to={`/${burst.Burst_Name}`}>{burst.Burst_Name}</Link></td>
                                <td>{burst.BurstID}</td>
                                <td>{burst.Simple || 'N/A'}</td>
                                <td>{burst.Extended || 'N/A'}</td>
                                <td>{burst.Other || 'N/A'}</td>
                                <td>{burst.Too_Noisy || 'N/A'}</td>
                                <td>{burst.Verify || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
