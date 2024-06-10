import React from "react";
import { useComments } from "../functions/Exports";

export default function Preview(props) {
    const burst = props.burst;
    const comments = useComments(`comment_focus_id = ${parseInt(burst.BurstID)}`);

    console.log(comments);

    return (
        <div className="preview">
            <div className="name-class">
                <div className="name">
                    <h1>{burst.Burst_Name}</h1>
                </div>
                <div className="classification">
                    <p>{burst.Verify}</p>
                </div>
            </div>
            {/* Display the imported image */}
            <div className="image-container">
                {burst.Burst_PNG && (
                    <img src={`/BurstPhotos/${burst.Burst_PNG}`} alt="Burst Image" />
                )}
            </div>

            <div className="preview-info">
                <div className="questions">
                    <div>Simple: {burst.Simple}</div>
                    <div>Extended: {burst.Extended}</div>
                    <div>Other: {burst.Other}</div>
                    <div>Too Noisy: {burst.Too_Noisy}</div>
                </div>
                <div className="questions">
                    <div>Symmetrical Structure: {burst.Symmetrical}</div>
                    <div>Fast Rise Slow Decay: {burst.FastRiseSlowDecay}</div>
                    <div>Underlying Emission: {burst.UnderlyingEmission}</div>
                    <div>Rapidly Varying Pulses: {burst.RapidlyVarying}</div>
                </div>
                <div className="comments">
                    {comments.map((c, index) => (
                        <h1 key={index}>{c.comment_body}</h1>
                    ))}
                </div>
            </div>
        </div>
    );
}



