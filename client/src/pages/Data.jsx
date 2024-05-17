import React from 'react';
import { useBursts } from '../functions/Exports';

export default function Data(props) {
    const bursts = useBursts();

    return (
        <div>
            {bursts.map((burst, index) => (
                <div key={index}>
                    {burst.number}
                </div>
            ))}
        </div>
    );
}


