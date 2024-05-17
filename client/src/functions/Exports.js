import { useState, useEffect } from 'react';
import axios from 'axios';

export function useBursts() {
    const [out, setOut] = useState([]);

    useEffect(() => {
        const fetchAllBursts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/new_table");
                setOut(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllBursts();
    }, []);

    return out;
}





