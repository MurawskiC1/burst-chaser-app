import React from "react"

export default function SlidingContainer({ isOpen, children }) {
    return (
        <div>
            <div className={`side-container ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-contents">
                    {children}
                </div>
            </div>
        </div>
    )
};

