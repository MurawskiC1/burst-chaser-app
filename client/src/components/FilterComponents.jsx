export function AppliedFilters({ appliedFilters, handleRemoveFilter, setFilter }) {
    return (
        <div className='applied-filters'>
            {appliedFilters.map((filter, index) => (
                <button key={index} onClick={() => handleRemoveFilter(filter, setFilter)}>
                    {filter} x
                </button>
            ))}
        </div>
    );
}

export function FilterButtons({ handleTypeChange }) {
    return (

        <div className='filter-buttons'>
            <div className='filter-buttons-space'>
                <button onClick={() => handleTypeChange('All')}>All</button>
                <button onClick={() => handleTypeChange('Simple')}>Simple</button>
                <button onClick={() => handleTypeChange('Extended')}>Extended</button>
                <button onClick={() => handleTypeChange('Other')}>Other</button>
            </div>
            <div className='filter-buttons-space'>
                <button onClick={() => handleTypeChange('Too Noisy')}>Too Noisy</button>
                <button onClick={() => handleTypeChange(null)}>Not Classified</button>
            </div>
        </div >
    );
}



import React from 'react';

export function ConfidenceSlider({ conf, handleConfidenceLevel }) {
    return (
        <div className="confidence-level">
            <input className="slide" type="range" value={conf} min="75" max="100" onChange={(e) => handleConfidenceLevel(e.target.value)} />
            {conf}%
        </div>
    );
}

