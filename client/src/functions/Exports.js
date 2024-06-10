import { useState, useEffect } from 'react';
import axios from 'axios';

export function useBursts(table, filter = '', sort = '') {
    const [out, setOut] = useState([]);

    useEffect(() => {
        const fetchAllBursts = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/${table}`, {
                    params: {
                        filter: filter,
                        sort: sort
                    }
                });
                setOut(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllBursts();
    }, [table, filter, sort]); // Include table, filter, and sort in the dependency array

    return out;
}

export function useComments(filter = '', sort = '') {
    const [out, setOut] = useState([]);

    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/comments`, {
                    params: {
                        filter: filter,
                        sort: sort
                    }
                });
                setOut(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllComments();
    }, [filter, sort]); // Include filter and sort in the dependency array

    return out;
}

export function useAddBurst(name, desc, number) {
    useEffect(() => {
        const addBurst = async () => {
            const burst = {
                name: name,
                description: desc,
                number: number
            };

            try {
                const res = await axios.post(`http://localhost:8800/pulse_shape`, burst);
                // Handle the result here if needed
            } catch (err) {
                console.error(err);
            }
        };

        if (name && desc && number) { // Ensure the function runs only when the parameters are defined
            addBurst();
        }
    }, [name, desc, number]); // Include name, desc, and number in the dependency array
}



