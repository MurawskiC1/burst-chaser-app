import React, { useState, useEffect } from 'react';


const Draggable = ({ children }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        // Reset position to initial state after releasing mouse
        setPosition({ x: 0, y: 0 });
    };

    useEffect(() => {
        const handleMouseUpGlobal = () => {
            if (isDragging) {
                setIsDragging(false);
                // Reset position to initial state after releasing mouse globally
                setPosition({ x: 0, y: 0 });
            }
        };

        const handleMouseMoveGlobal = (e) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y,
                });
            }
        };

        window.addEventListener('mouseup', handleMouseUpGlobal);
        window.addEventListener('mousemove', handleMouseMoveGlobal);

        return () => {
            window.removeEventListener('mouseup', handleMouseUpGlobal);
            window.removeEventListener('mousemove', handleMouseMoveGlobal);
        };
    }, [isDragging, offset]);

    return (
        <div
            className="draggable"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'transform 0.3s ease', // Smooth transition effect
            }}
        >
            {children}
        </div>
    );
};

export default Draggable;
