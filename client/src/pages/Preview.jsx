import React, { useState, useEffect } from "react";

export default function Preview(props) {

    const burst = props.burst;

    return (
        <div>
            {/* Display the imported image */}
            <img src={`../../public/BurstPhotos/${burst.Burst_PNG}`} alt={burst.Burst_PNG} />
            <h1>{burst.Burst_Name}</h1>

        </div>
    );
}



