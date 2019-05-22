import React, { useState, useEffect } from "react";
import WiMap from "./WiMap";

import "./components/styles.css";

const WiMapController = props => {
    const foodAssistData = props.foodAssistData;
    const mapData = props.mapData;

    return (
        <div className="mapBox">
            <WiMap mapData={mapData} foodAssistData={foodAssistData} width={500} height={700} />
        </div>
    );
};

export default WiMapController;