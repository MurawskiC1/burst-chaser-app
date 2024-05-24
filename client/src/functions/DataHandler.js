import { useState, useEffect } from 'react';
import { useBursts } from '../functions/Exports';

export const useDataHandlers = (conf, filter, sort, setConf) => {
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [confFilter, setConfFilter] = useState(`Primary_Confidence_Level >= ${conf / 100}`);
    const bursts = useBursts("pulse_shape", confFilter + filter, sort);

    useEffect(() => {
        setConfFilter(`Primary_Confidence_Level >= ${conf / 100}`);
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
        setConfFilter(`Primary_Confidence_Level >= ${level / 100}`);
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
        const updatedFilters = appliedFilters.filter((filter) => filter !== toRemove);
        setAppliedFilters(updatedFilters);

        let newFilter = '';
        updatedFilters.forEach((filter, index) => {
            newFilter += index === 0 ? `verify LIKE '%${filter}%'` : ` AND verify LIKE '%${filter}%'`;
        });

        setFilter(newFilter);
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
