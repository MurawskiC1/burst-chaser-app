import React, { useState } from "react";

export default function DownloadPreview({ bursts }) {
    const [start, setStart] = useState(0);
    const [render, setRender] = useState(50);

    const end = start + render;

    // Function to get all unique keys from all bursts
    const getAllKeys = () => {
        let allKeys = new Set();
        bursts.forEach(burst => {
            Object.keys(burst).forEach(key => {
                allKeys.add(key);
            });
        });
        return Array.from(allKeys);
    };

    // Get all unique keys
    const keys = getAllKeys();

    return (
        <div>
            <div className='data-container'>
                <table className="view-boxes" >
                    <thead>
                        <tr>
                            {keys.map((key) => (
                                <th key={key} >{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bursts.slice(start, end).map((burst, index) => (
                            <tr key={burst.BurstID}>
                                {keys.map((key) => (
                                    <td key={key} >{burst[key]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
