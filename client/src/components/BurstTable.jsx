import React from 'react';
import { Link } from 'react-router-dom';

export function BurstTable({ bursts, start, end, comments, handleSortChange }) {
    return (
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
                {bursts.slice(start, end).map((burst, index) => (
                    <tr key={burst.BurstID}>
                        <td>{start + index + 1}</td>
                        <td><img src={`/BurstPhotos/${burst.Burst_PNG}`} alt={burst.Burst_Name} /></td>
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
    );
}

