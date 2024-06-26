import React, { useState, useEffect } from "react";
import { useBursts } from "../functions/Exports";
import DownloadPreview from "./DownloadPreview";

export default function Download(props) {
    const [arrFilter, setArrFilters] = useState([]);
    const [filters, setFilters] = useState("");
    const bursts = useBursts(filters);
    const [isNotPreview, setPreview] = useState(true);

    const [checkedItems, setCheckedItems] = useState({
        Simple: false,
        Extended: false,
        Other: false,
        Too_Noisy: false,
        All: false,
    });

    useEffect(() => {
        const filterString = arrFilter
            .map((type, index) => (index === 0 ? `Verify Like '%${type}%'` : `OR Verify Like '%${type}%'`))
            .join(" ");
        setFilters(filterString);
    }, [arrFilter]);

    const handleCheckboxChange = (type) => {
        setCheckedItems((prevCheckedItems) => {
            const newCheckedItems = { ...prevCheckedItems, [type]: !prevCheckedItems[type] };

            if (type === 'All') {
                const allChecked = !prevCheckedItems.All;
                const updatedCheckedItems = Object.keys(newCheckedItems).reduce((acc, key) => {
                    acc[key] = allChecked;
                    return acc;
                }, {});

                setCheckedItems(updatedCheckedItems);
                setArrFilters(allChecked ? ['Simple', 'Extended', 'Other', 'Too_Noisy'] : []);
            } else {
                if (newCheckedItems[type]) {
                    setArrFilters((prevFilters) => [...prevFilters, type]);
                } else {
                    setArrFilters((prevFilters) => prevFilters.filter((filter) => filter !== type));
                }
            }

            return newCheckedItems;
        });
    };

    const jsonToCsv = (json) => {
        const csvRows = [];
        const headers = Object.keys(json[0]);
        csvRows.push(headers.join(','));

        for (const row of json) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        return csvRows.join('\n');
    };

    const downloadCsv = (csvData, filename = 'Burst_Chaser_Pulse_Shapes.csv') => {
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    const handleDownload = (jsonData) => {
        const csvData = jsonToCsv(jsonData);
        downloadCsv(csvData);
    };

    return (
        <div>
            <div className="download-filter-container">
                {isNotPreview ? (
                    <div className="download-filter">
                        {Object.keys(checkedItems).map((type) => (
                            <div key={type}>
                                <input
                                    type="checkbox"
                                    checked={checkedItems[type]}
                                    onChange={() => handleCheckboxChange(type)}
                                />
                                {type.replace('_', ' ')}
                            </div>
                        ))}
                    </div>
                ) : (
                    <DownloadPreview bursts={bursts} />
                )}
            </div>
            <div className="download-preview-container">
                <div className="download-preview-buttons">
                    <button onClick={() => setPreview(!isNotPreview)}>
                        {isNotPreview ? "Preview" : "Filters"}
                    </button>
                    <button onClick={() => handleDownload(bursts)}>Download</button>
                </div>
            </div>
        </div>
    );
}
