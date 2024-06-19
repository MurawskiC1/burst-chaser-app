import React from "react";
import { useComments, useTags } from "../functions/Exports";

export default function Preview(props) {
    const burst = props.burst;
    const comments = useComments(`comment_focus_id = ${parseInt(burst.BurstID)}`);
    const tags = useTags(`taggable_id = ${parseInt(burst.BurstID)}`)
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

            </div>
            <div className="thread">
                <div className="comments">
                    {comments.map((c, index) => (

                        <div className="comment" key={index}>
                            <div className="comment-info">
                                <div className="comment-username">
                                    {c.comment_user_login}
                                </div>
                                <div className="comment-body">
                                    <p>
                                        {c.comment_body}
                                    </p>

                                </div>
                            </div>
                            <div className="comment-vote">
                                <div className="vote-button">
                                    <div className="upvote">
                                        ^
                                    </div>
                                    <div className="downvote">
                                        ^
                                    </div>
                                </div>
                            </div>

                        </div>


                    ))}
                </div>
            </div>
            <div className="tags">
                {tags.map((t, index) => (
                    <div className="tag" key={index}>
                        {t.name}
                    </div>
                ))}
            </div>
        </div>
    );
}



