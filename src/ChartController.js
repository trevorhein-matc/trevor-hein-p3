import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";

import "./components/styles.css";

const ChartController = props => {
  const getPlayerStats = (rawData, player) => {
    return rawData[player];
  };

  const changePlayer = e => {
    setPlayer(e.target.value);
    setData(getPlayerStats(rawData, e.target.value));
  };

  const rawData = props.data;
  const startingPlayer = "Salah";
  const [player, setPlayer] = useState(startingPlayer);
  const [data, setData] = useState(getPlayerStats(rawData, player));
  let playerDropList = Object.keys(rawData);
  // console.log(playerDropList);

  useEffect(() => {
    setData(rawData[player]);
  }, [!data]);

  return (
    <div className="chartBox">
      <p>
        Player Stats
        {/* dropdown options */}
        <select name="player" onChange={changePlayer}>
          {playerDropList.map(option => {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </p>
      <BarChart data={data} width={700} height={500} />
    </div>
  );
};

export default ChartController;
