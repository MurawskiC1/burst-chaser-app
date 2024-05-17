import { useState, useEffect } from 'react';
import axios from 'axios';

const table = "new_table";

export function useBursts() {
    const [out, setOut] = useState([]);

    useEffect(() => {
        const fetchAllBursts = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/${table}`);
                setOut(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllBursts();
    }, []);

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
            const res = await axios.post(`http://localhost:8800/${table}`, burst);
            // Handle the result here if needed
        } catch (err) {
            console.error(err);
        }
    };
    addBurst()
}




