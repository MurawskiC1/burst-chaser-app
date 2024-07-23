import React, { useState, useEffect } from "react";
import axios from "axios";
import Comments from "../components/Comments";

const Classify = () => {
    const [bursts, setBursts] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");


    // Fetch all bursts when the component mounts
    useEffect(() => {
        const fetchAllBursts = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/pulse_shape`, {
                    params: {
                        filter: "",
                        sort: "Simple+Extended+Other+Too_Noisy"
                    }
                });
                setBursts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllBursts();
    }, []);

    // Fetch comments when bursts change
    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/comments`, {
                    params: {
                        filter: `comment_focus_id=${bursts[0].BurstID}`,
                        sort: ""
                    }
                });
                setComments(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        if (bursts.length > 0) {
            fetchAllComments();
        }
    }, [bursts]);

    const handleDrop = async (event, classification) => {
        event.preventDefault();
        console.log(`Classified as: ${classification}`);

        try {
            const res = await axios.put('http://localhost:8800/update', {
                id: bursts[0].Burst_Name,
                classification: classification
            });
            console.log('Update successful:', res.data);
        } catch (err) {
            console.error('Error updating:', err);
        }
        window.location.reload();
    };

    const allowDrop = (event) => {
        event.preventDefault();
    };

    const handleCommentSubmit = async () => {
        const data = {
            comment_id: '1',
            comment_body: newComment,
            comment_focus_id: bursts[0].BurstID,
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
                    {['Simple', 'Extended', 'Other', 'Too_Noisy'].map(classification => (
                        <button
                            key={classification}
                            onDrop={(event) => handleDrop(event, classification)}
                            onDragOver={allowDrop}
                            onClick={(event) => handleDrop(event, classification)}
                        >
                            {classification.replace('_', ' ')}
                        </button>
                    ))}
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
        </div>
    );
};

export default Classify;
