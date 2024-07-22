import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FilterButtons, AppliedFilters, ConfidenceSlider } from '../components/FilterComponents';
import { SearchInput } from '../components/SearchInput';
import { BurstTable } from '../components/BurstTable';
import { PaginationControls } from '../components/PaginationControls';
import { useDataHandlers } from '../functions/DataHandler';
import SlidingContainer from '../components/SlidingContainer';
import { useComments } from '../functions/Exports';

export default function Data() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState(new URLSearchParams(location.search).get('search') || '');

    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [render, setRender] = useState(50);
    const [start, setStart] = useState(0);
    const [conf, setConf] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const comments = useComments();

    const {
        appliedFilters,
        setAppliedFilters,
        bursts,
        handleTypeChange,
        handleConfidenceLevel,
        handleSortChange,
        handleRemoveFilter
    } = useDataHandlers(conf, filter, sort, setConf);

    const handleLimit = (limit) => {
        setRender(parseInt(limit, 10));
        setStart(0);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleChangePage = (direction) => {
        const change = render;
        if (direction === "next" && start + change < bursts.length) {
            setStart((prev) => prev + change);
        } else if (direction === "previous" && start - change >= 0) {
            setStart((prev) => prev - change);
        }
    };

    const filteredBursts = bursts.filter((burst) =>
        burst.Burst_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        burst.BurstID.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const end = start + render;

    const clickOff = () => {
        if (isOpen === true) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Fetch data or perform operations based on searchQuery change
    }, [searchQuery]);

    return (
        <div className='data-page'>
            <SlidingContainer isOpen={isOpen}>
                <h1>Classification:</h1>
                <FilterButtons handleTypeChange={(newType) => handleTypeChange(newType, setFilter, setStart)} />
                <div className='applied-filter-container'>
                    <AppliedFilters appliedFilters={appliedFilters} handleRemoveFilter={handleRemoveFilter} setFilter={setFilter} />
                </div>
                <h1>Confidence:</h1>
                <div className='confidence-container'>
                    <ConfidenceSlider conf={conf} handleConfidenceLevel={handleConfidenceLevel} />
                </div>
            </SlidingContainer>
            <div className="main-page" onClick={() => clickOff()}>
                <div className="filter-container">
                    <button className="toggle" onClick={() => setIsOpen(!isOpen)}>+ Filters</button>
                    <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
                </div>
                <div className='data-container'>
                    <BurstTable bursts={filteredBursts} start={start} end={end} comments={comments} handleSortChange={(toSort) => handleSortChange(toSort, setSort)} />
                </div>
                <div className='page-control-container'>
                    <PaginationControls
                        start={start}
                        render={render}
                        total={filteredBursts.length}
                        handleChangePage={handleChangePage}
                        handleLimit={handleLimit}
                    />
                </div>
            </div>
        </div>
    );
}
