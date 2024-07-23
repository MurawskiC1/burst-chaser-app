import React from "react"
import axios from "axios";
export default function Comments({ comments }) {

    const handlePostComment = (event) => {

        const data = {
            comment_id: '1',
            comment_body: 'This is a comment.',
            comment_focus_id: burstID,
            comment_user_id: '456',
            comment_user_login: 'user123',
            comment_created_at: new Date().toISOString()
        };
        axios.post('http://localhost:8800/comments', data)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error.response ? error.response.data : error.message);
            });

    }


    return (
        <div>
            <div className="thread">
                <div className="comments">
                    {comments.length === 0 ? (
                        <h2>No Comments</h2>
                    ) : (
                        comments.map((c, index) => (
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
                        ))
                    )}
                </div>

            </div>

        </div>
    )
};

