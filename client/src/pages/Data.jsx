import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBursts } from '../functions/Exports';


export default function Data(props) {
    const bursts = useBursts("pulse_shape")
    const [searchQuery, setSearchQuery] = useState('');
    const [type, setType] = useState('');

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleTypeChange = (newType) => {
        setType(newType);
    };

    // Filter bursts based on search query and type
    const filteredBursts = bursts.filter(burst => {
        const matchesSearchQuery =
            burst.Burst_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            burst.Verify.toLowerCase().includes(searchQuery.toLowerCase()) ||
            burst.BurstID.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = type === '' || type === 'None' || burst.Verify.toLowerCase() === type.toLowerCase();

        return matchesSearchQuery && matchesType;
    });

    return (
        <div>
            <div className='search-container'>
                <input
                    type='text'
                    placeholder='Search by Burst Name'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <div className='filter-buttons'>
                    <button onClick={() => handleTypeChange('')}>All</button>
                    <button onClick={() => handleTypeChange('Simple')}>Simple</button>
                    <button onClick={() => handleTypeChange('Extended')}>Extended</button>
                    <button onClick={() => handleTypeChange('Other')}>Other</button>
                    <button onClick={() => handleTypeChange('Too Noisy')}>Too Noisy</button>
                    <button onClick={() => handleTypeChange('None')}>Not Classified</button>
                </div>
            </div>
            <div className='data-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
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
                                <td><img src={`assets/BurstPhotos/${burst.Burst_PNG}`} /></td>
                                <td><Link to={`${burst.Burst_Name}`}>{burst.Burst_Name}</Link></td>
                                <td>{burst.BurstID}</td>
                                <td>{burst.Simple}</td>
                                <td>{burst.Extended}</td>
                                <td>{burst.Other}</td>
                                <td>{burst.Too_Noisy}</td>
                                <td>{burst.Verify}</td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
