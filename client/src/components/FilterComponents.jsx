export function AppliedFilters({ appliedFilters, handleRemoveFilter }) {
    return (
        <div className='applied-filters'>
            {appliedFilters.map((filter, index) => (
                <button key={index} onClick={() => handleRemoveFilter(filter)}>
                    {filter}
                </button>
            ))}
        </div>
    );
}


export function FilterButtons({ handleTypeChange }) {
    return (
        <div className='filter-buttons'>
            <button onClick={() => handleTypeChange('All')}>All</button>
            <button onClick={() => handleTypeChange('Simple')}>Simple</button>
            <button onClick={() => handleTypeChange('Extended')}>Extended</button>
            <button onClick={() => handleTypeChange('Other')}>Other</button>
            <button onClick={() => handleTypeChange('Too Noisy')}>Too Noisy</button>
            <button onClick={() => handleTypeChange(null)}>Not Classified</button>
        </div>
    );
}



import React from 'react';

export function ConfidenceSlider({ conf, handleConfidenceLevel }) {
    return (
        <div className="confidence-interval">
            <input type="range" value={conf} min="75" max="100" onChange={(e) => handleConfidenceLevel(e.target.value)} />
            {conf}%
        </div>
    );
}

