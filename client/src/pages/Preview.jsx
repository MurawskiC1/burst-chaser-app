import React, { useState, useEffect } from "react";

export default function Preview(props) {

    const burst = props.burst;

    return (
        <div className="preview">
            <div className="name-class">
                <div className="name">
                    <h1>{burst.Burst_Name}</h1><h1 className="divider">/</h1> {burst.BurstID}
                </div>
                <div className="classification">
                    <p>{burst.Verify}</p>
                </div>
            </div>
            {/* Display the imported image */}
            <div className="image-container">
                {burst.Burst_PNG !== "" && (
                    <img src={`../../public/BurstPhotos/${burst.Burst_PNG}`} alt={`No Image`} />
                )}
            </div>

            <div className="preview-info">
                <div className="questions">
                    <div>
                        Simple: {burst.Simple}
                    </div>
                    <div>
                        Extended: {burst.Extended}
                    </div>
                    <div>
                        Other: {burst.Other}
                    </div>
                    <div>
                        Too Noisy: {burst.Too_Noisy}
                    </div>
                </div>
                <div className="questions">
                    <div>
                        Symmetrical Structure: {burst.Symmetrical}
                    </div>
                    <div>
                        Fast Rise Slow Decay: {burst.FastRiseSlowDecay}
                    </div>
                    <div>
                        Underlying Emmision: {burst.UnderlyingEmission}
                    </div>
                    <div>
                        Rapidly Varying Pulses: {burst.RapidlyVarying}
                    </div>
                </div>
            </div>

        </div >
    );
}



