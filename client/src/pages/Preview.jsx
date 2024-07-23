import React, { useState, useEffect } from "react";
import { useComments, useTags } from "../functions/Exports";
import Comments from "../components/Comments";
import axios from "axios";

export default function Preview(props) {
    const burst = props.burst;
    const [comments, setComments] = useState([]);
    const tags = useTags(`taggable_id = ${parseInt(burst.BurstID)}`);
    const [newComment, setNewComment] = useState("");
    console.log(comments);

    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/comments`, {
                    params: {
                        filter: `comment_focus_id=${parseInt(burst.BurstID)}`,
                        sort: ""
                    }
                });
                setComments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (burst) {
            fetchAllComments();
        }
    }, [burst]);

    const handleCommentSubmit = async () => {
        const data = {
            comment_id: '1', // Consider using a more robust method for generating unique IDs
            comment_body: newComment,
            comment_focus_id: burst.BurstID,
            comment_user_id: '456', // replace with actual user ID
            comment_user_login: 'user123', // replace with actual user login
            comment_created_at: new Date().toISOString()
        };

        try {
            const response = await axios.post('http://localhost:8800/comments', data);
            console.log('Response:', response.data);
            setComments([...comments, data]);
            setNewComment(""); // clear the textarea
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // prevent the default behavior of Enter key
            handleCommentSubmit();
        }
    };

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
            <div className="comments-container">
                <Comments comments={comments} />
                <div className="comment-box-container">
                    <div className="withpost">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Write a comment..."
                        ></textarea>
                        <button onClick={handleCommentSubmit}>Post</button>
                    </div>
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



