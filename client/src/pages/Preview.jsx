import React, { useState, useEffect } from "react";

export default function Preview(props) {
    const [image, setImage] = useState(null);
    const burst = props.burst;

    useEffect(() => {
        // Dynamically import the image
        import(`../assets/BurstPhotos/${burst.Burst_PNG}`)
            .then(imageModule => {
                // Once the image is imported, set it as the state
                setImage(imageModule.default);
            })
            .catch(error => {
                console.error("Error loading image:", error);
            });
    }, []);

    return (
        <div>
            {/* Display the imported image */}
            <img src={image} alt={burst.Burst_PNG} />
        </div>
    );
}



