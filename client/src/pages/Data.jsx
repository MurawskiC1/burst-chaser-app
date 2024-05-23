import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBursts } from '../functions/Exports';

export default function Data(props) {
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [render, setRender] = useState(50);
    const [start, setStart] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [conf, setConf] = useState(0);
    const [confFilter, setConfFilter] = useState(`Primary_Confidence_Level >= ${conf / 100}`)
    const bursts = useBursts("pulse_shape", confFilter + filter, sort);

    useEffect(() => {
        setStart(0);
    }, [filter, sort, render, conf + filter, confFilter]);



    const handleTypeChange = (newType) => {
        setFilter((currentFilter) => {
            setStart(0);
            if (newType === "All") {
                setAppliedFilters([]);
                return '';
            }
            if (newType === null) {
                setAppliedFilters(["Not Classified"]);
                return ' AND verify = ""';
            }
            if (appliedFilters.includes(newType)) {
                return currentFilter;
            }
            if (!currentFilter || currentFilter.includes("verify") || currentFilter.includes("=")) {
                setAppliedFilters([newType]);
                return ` AND verify LIKE '%${newType}%'`;
            } else {
                setAppliedFilters((current) => [...current, newType]);
                return `${currentFilter} AND verify LIKE '%${newType}%'`;
            }
        });
    };


    const handleLimit = (limit) => {
        setRender(parseInt(limit, 10));
        setStart(0); // Reset start to 0 when the limit changes
    };

    const handleConfidenceLevel = (level) => {
        setConf(level)
        setConfFilter(`Primary_Confidence_Level >= ${level / 100}`)

    }

    const handleSortChange = (toSort) => {
        setSort((current) => {
            if (!current.includes(toSort)) {
                return `${toSort} DESC`;
            } else {
                return current.includes("DESC") ? `${toSort} ASC` : `${toSort} DESC`;
            }
        });
    };

    const handleRemoveFilter = (toRemove) => {
        const updatedFilters = appliedFilters.filter((filter) => filter !== toRemove);
        setAppliedFilters(updatedFilters);

        let newFilter = '';
        updatedFilters.forEach((filter, index) => {
            newFilter += index === 0 ? `verify LIKE '%${filter}%'` : ` AND verify LIKE '%${filter}%'`;
        });

        setFilter(newFilter);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBursts = bursts.filter((burst) =>
        burst.Burst_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        burst.BurstID.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleChangePage = (direction) => {
        const change = render;
        if (direction === "next" && start + change < filteredBursts.length) {
            setStart((prev) => prev + change);
        } else if (direction === "previous" && start - change >= 0) {
            setStart((prev) => prev - change);
        }
    };

    const end = start + render;

    return (
        <div>
            <div className="filter-container">
                <div className='search-container'>
                    <input
                        type='text'
                        placeholder='Search by Burst Name or ID'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
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
                        <button key={index} onClick={() => handleRemoveFilter(filter)}>
                            {filter}
                        </button>
                    ))}
                </div>
                <div className="confidence-interval">
                    <input type="range" value={conf} min="0" max="100" onChange={(e) => handleConfidenceLevel(e.target.value)} />
                    {conf}%
                </div>
            </div>
            <div className='data-container'>
                <table className="view-boxes">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Image</th>
                            <th onClick={() => handleSortChange("Burst_Name")}>Burst Name</th>
                            <th onClick={() => handleSortChange("BurstID")}>Burst ID</th>
                            <th onClick={() => handleSortChange("Simple")}>Simple</th>
                            <th onClick={() => handleSortChange("Extended")}>Extended</th>
                            <th onClick={() => handleSortChange("Other")}>Other</th>
                            <th onClick={() => handleSortChange("Too_Noisy")}>Too Noisy</th>
                            <th onClick={() => handleSortChange("verify")}>Verified</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBursts.slice(start, end).map((burst, index) => (
                            <tr key={burst.BurstID}>
                                <td>{start + index + 1}</td>
                                <td><img src={`../../public/BurstPhotos/${burst.Burst_PNG}`} alt={burst.Burst_Name} /></td>
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
            <div className="page-edit-container">
                <button onClick={() => handleChangePage("previous")} disabled={start === 0}>Previous</button>
                <div>Page Number {Math.floor(start / render) + 1} of {Math.ceil(filteredBursts.length / render)}</div>
                <button onClick={() => handleChangePage("next")} disabled={start + render >= filteredBursts.length}>Next</button>
                <select value={render} onChange={(e) => handleLimit(e.target.value)}>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={filteredBursts.length}>All</option>
                </select>
            </div>
        </div>
    );
}
