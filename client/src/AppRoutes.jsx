import React from "react"
import { Routes, Route } from "react-router-dom"
import { useBursts } from "./functions/Exports"
import Preview from "./pages/Preview"
import Home from "./pages/Home"
import Data from "./pages/Data"
export default function AppRoutes(props) {
    const bursts = useBursts();
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/data" element={<Data />} />
                {bursts.map((burst, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Route key={index} path={`data/${burst.Burst_Name}`} element={<Preview burst={burst} />} />
                        </React.Fragment>
                    )
                })}
            </Routes>

        </div>
    )
};

