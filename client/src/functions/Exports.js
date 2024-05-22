import { useState, useEffect } from 'react';
import axios from 'axios';

const table = "pulse_shape";

export function useBursts(table, filter = '', limit = '') {
    const [out, setOut] = useState([]);


    useEffect(() => {
        const fetchAllBursts = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/${table}`, {
                    params: {
                        filter: filter,
                        limit: limit
                    }
                });
                setOut(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllBursts();
    }, [table, filter]); // Include table and filter in the dependency array

    return out;
}
export function useAddBurst(name, desc, number) {
    const addBurst = async () => {
        const burst = {
            name: name,
            description: desc,
            number: number
        };

        try {
            const res = await axios.post(`http://localhost:8800/new_table`, burst);
            // Handle the result here if needed
        } catch (err) {
            console.error(err);
        }
    };
    addBurst()
}




