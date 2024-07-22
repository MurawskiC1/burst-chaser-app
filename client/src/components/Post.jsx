import React, { useEffect, useState } from "react";
import axios from 'axios'; // Import axios for making HTTP requests
import { useBursts, useComments } from "../functions/Exports"; // Adjust the import path as needed
import { Link } from "react-router-dom";
export default function Post({ user, burstID, comment }) {
    const [burst, setBurst] = useState([]); // Initialize state to store burst data

    useEffect(() => {
        const fetchAllBursts = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/pulse_shape`, {
                    params: {
                        filter: `BurstID = ${burstID}`,
                        sort: ""
                    }
                });
                setBurst(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllBursts();
    }, [burstID]); // Ensure the effect runs when burstID changes


    return (

        <div className="post">
            <Link to={`data/${burst[0]?.Burst_Name}`}>
                <img src={`/BurstPhotos/${burst[0]?.Burst_PNG}`} alt="Burst" />
                <div className="post-comment">
                    <div className="post-comment-info">
                        <div className="post-comment-username">
                            {user}
                        </div>
                        <div className="post-comment-body">
                            <p>
                                {comment}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div >

    );
}