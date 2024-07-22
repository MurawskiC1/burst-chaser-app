import { useState, useEffect } from 'react';
import { useBursts } from '../functions/Exports';

export const useDataHandlers = (conf, filter, sort, setConf) => {
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [confFilter, setConfFilter] = useState(`Final_Confidence >= ${conf / 100}`);
    console.log(confFilter)
    const bursts = useBursts(confFilter + filter, sort);

    useEffect(() => {
        setConfFilter(`Final_Confidence >= ${conf / 100}`);
    }, [conf]);

    const handleTypeChange = (newType, setFilter, setStart) => {
        setFilter((currentFilter) => {
            setStart(0);
            if (newType === "All") {
                setAppliedFilters([]);
                return '';
            }
            if (newType === null) {
                setAppliedFilters(["Not Classified"]);
                return ' AND verify = ""';
            }
            if (appliedFilters.includes(newType)) {
                return currentFilter;
            }
            if (!currentFilter || !currentFilter.includes("LIKE") || currentFilter.includes("=") || appliedFilters.length >= 2) {
                setAppliedFilters([newType]);
                return ` AND verify LIKE '%${newType}%'`;
            } else {
                setAppliedFilters((current) => [...current, newType]);
                return `${currentFilter} AND verify LIKE '%${newType}%'`;
            }
        });
    };

    const handleConfidenceLevel = (level) => {
        setConf(level);
        setConfFilter(`Final_Confidence >= ${level / 100}`);
    };

    const handleSortChange = (toSort, setSort) => {
        setSort((current) => {
            if (!current.includes(toSort)) {
                return `${toSort} DESC`;
            } else {
                return current.includes("DESC") ? `${toSort} ASC` : `${toSort} DESC`;
            }
        });
    };

    const handleRemoveFilter = (toRemove, setFilter) => {
        console.log(appliedFilters)
        setAppliedFilters((prevFilters) => {

            const updatedFilters = []
            let newFilter = '';
            prevFilters.forEach((filter, index) => {
                if (filter != toRemove) {
                    newFilter += ` AND verify LIKE '${filter}'`
                    updatedFilters.push(filter)
                }
            });
            console.log(newFilter)
            setFilter(newFilter);
            console.log(updatedFilters)

            return updatedFilters;
        });

    };


    return {
        appliedFilters,
        setAppliedFilters,
        bursts,
        handleTypeChange,
        handleConfidenceLevel,
        handleSortChange,
        handleRemoveFilter
    };
};
