import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBursts } from '../functions/Exports';

export default function Data(props) {
    const [filter, setFilter] = useState('');
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(50);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([]);

    const handleTypeChange = (newType) => {

        setFilter(currentFilter => {
            setStart(0);
            setEnd(50);
            if (newType == "All") {
                setAppliedFilters([])
                return '';
            }
            if (newType == null) {
                setAppliedFilters(["Not Classified"]);
                return 'verify = ""';
            }
            if (appliedFilters.includes(newType)) {
                return currentFilter
            }
            if (currentFilter == "" || currentFilter.includes("AND") || currentFilter.includes("=")) {
                setAppliedFilters([newType]);
                return `verify LIKE '%${newType}%'`;
            } else {
                setAppliedFilters(current => [...current, newType]);
                return currentFilter + ` AND verify LIKE '%${newType}%'`;
            }
        });
        //console.log(filter)
        //console.log(appliedFilters)
    };

    const handleRemoveFilter = (toRemove) => {
        // Filter out the item to remove from appliedFilters
        const updatedFilters = appliedFilters.filter(filter => filter !== toRemove);
        // Update the appliedFilters state
        setAppliedFilters(updatedFilters);

        // Build the new filter string based on the remaining filters
        let newFilter = '';
        updatedFilters.forEach((filter, index) => {
            if (index === 0) {
                newFilter += `verify LIKE '%${filter}%'`;
            } else {
                newFilter += ` AND verify LIKE '%${filter}%'`;
            }
        });

        // Update the filter state with the new filter string
        setFilter(newFilter);
    };






    const bursts = useBursts("pulse_shape", filter);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBursts = bursts.filter(burst =>
        burst.Burst_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        burst.BurstID.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangePage = (direction) => {
        const change = end - start
        if (direction == "next" && start + change <= filteredBursts.length) {
            setStart(page => {
                return page + change
            })
            setEnd(page => {
                return page + change
            })
        }
        if (direction == "previous" && start - change >= 0) {
            setStart(page => {
                return page - change
            })
            setEnd(page => {
                return page - change
            })
        }
    }

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
                    <button onClick={() => handleTypeChange('All')}>All</button>
                    <button onClick={() => handleTypeChange('Simple')}>Simple</button>
                    <button onClick={() => handleTypeChange('Extended')}>Extended</button>
                    <button onClick={() => handleTypeChange('Other')}>Other</button>
                    <button onClick={() => handleTypeChange('Too Noisy')}>Too Noisy</button>
                    <button onClick={() => handleTypeChange(null)}>Not Classified</button>
                </div>

                <div className='applied-filters'>
                    {appliedFilters.map((filter, index) => (
                        <button key={index} onClick={() => handleRemoveFilter(filter)}>{filter}</button>

                    ))}
                </div>
            </div>
            <div className='data-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Index</th>
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
                        {filteredBursts.slice(start, end).map((burst, index) => (
                            <tr key={burst.BurstID}>
                                <td>{start + index + 1}</td>
                                <td><img src={`assets/BurstPhotos/${burst.Burst_PNG}`} alt={burst.Burst_Name} /></td>
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

            <div className="flippage-containter">
                <button onClick={() => handleChangePage("next")}>Next</button>
                <div>Page Number {Math.floor(end / (end - start))} of {Math.floor(filteredBursts.length / (end - start)) + 1} </div>
                <button onClick={() => handleChangePage("previous")}>Previous</button>
            </div>

        </div>
    )
};


