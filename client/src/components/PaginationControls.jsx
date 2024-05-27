import React from 'react';

export function PaginationControls({ start, render, total, handleChangePage, handleLimit }) {
    return (
        <div className="page-edit-container">
            <div className='page-edit'>
                <button onClick={() => handleChangePage("previous")} disabled={start === 0}>Previous</button>
                <select value={render} onChange={(e) => handleLimit(e.target.value)}>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={total}>All</option>
                </select>
                <button onClick={() => handleChangePage("next")} disabled={start + render >= total}>Next</button>
            </div>
            <div className='page-number'>

                <div>Page Number {Math.floor(start / render) + 1} of {Math.ceil(total / render)}</div>
            </div>


        </div>
    );
}
