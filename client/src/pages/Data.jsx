import React from 'react';
import { useBursts, useAddBurst } from '../functions/Exports';

export default function Data(props) {
    const bursts = useBursts();

    // Define a function to handle adding a burst
    const handleAddBurst = () => {
        useAddBurst("Campbell", "IS", 57); // Call useAddBurst when the button is clicked
    };

    return (
        <div>
            {bursts.map((burst, index) => (
                <div key={index}>
                    {burst.name}
                    {burst.description}
                    {burst.number}
                </div>
            ))}
            {/* Button to add a burst */}
            <button onClick={handleAddBurst}>Add</button>
        </div>
    );
}



