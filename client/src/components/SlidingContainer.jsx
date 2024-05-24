import React from "react"

export default function SlidingContainer(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleContainer = () => {
        setIsOpen(!isOpen)
    };
    return (
        <div>
            {props.children}
        </div>
    )
};

