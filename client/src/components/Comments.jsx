import React from "react"

export default function Comments({ comments }) {
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
            <div className="comment-box-container">
                <textarea>
                </textarea>
            </div>
        </div>
    )
};

