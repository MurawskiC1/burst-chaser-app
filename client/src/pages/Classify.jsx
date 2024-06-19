import React, { useState, useEffect } from "react";
import { useBursts, useComments } from "../functions/Exports";
import axios from "axios";

const Classify = (props) => {
    const bursts = useBursts("", "Simple+Extended+Other+Too_Noisy");

    console.log(bursts)

    const handleDrop = async (event, classification) => {
        event.preventDefault();
        console.log(`Classified as: ${classification}`);

        try {
            const res = await axios.put('http://localhost:8800/update', {
                id: bursts[0].Burst_Name,
                classification: classification
            });
            console.log('Update successful:', res.data);
            // Optionally update state or trigger further actions based on the response
        } catch (err) {
            console.error('Error updating:', err);
            // Handle error state or display error message to the user
        }
        window.location.reload();
    };

    const allowDrop = (event) => {
        event.preventDefault();
    };

    return (
        <div className="classify-page">
            <div className="classify-container">
                <div className="burst-container">
                    {bursts.length > 0 && (
                        <div className="drag-container" draggable>
                            <img
                                src={`/BurstPhotos/${bursts[0].Burst_PNG}`}
                                alt="Burst"
                                draggable={false}
                            />
                        </div>
                    )}
                </div>
                <div className="classify-buttons">
                    <button
                        onDrop={(event) => handleDrop(event, 'Simple')}
                        onDragOver={allowDrop}
                        onClick={(event) => handleDrop(event, 'Simple')}
                    >
                        Simple
                    </button>
                    <button
                        onDrop={(event) => handleDrop(event, 'Extended')}
                        onDragOver={allowDrop}
                        onClick={(event) => handleDrop(event, 'Extended')}
                    >
                        Extended
                    </button>
                    <button
                        onDrop={(event) => handleDrop(event, 'Other')}
                        onDragOver={allowDrop}
                        onClick={(event) => handleDrop(event, 'Other')}
                    >
                        Other
                    </button>
                    <button
                        onDrop={(event) => handleDrop(event, 'Too_Noisy')}
                        onDragOver={allowDrop}
                        onClick={(event) => handleDrop(event, 'Too_Noisy')}
                    >
                        Too Noisy
                    </button>
                </div>
            </div>
            <div className="comments-container">
                Hello
            </div>
        </div>
    );
};

export default Classify;
