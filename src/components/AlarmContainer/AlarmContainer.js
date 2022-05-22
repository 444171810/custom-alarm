import React, { useState } from "react";
import AlarmItem from "../AlarmItem/AlarmItem";
import "./AlarmContainer.css";
import { play, stop } from "../../utils/sound";
import DefaultSetting from "../../settings.json";

const AlarmContainer = (props) => {
  const [settings, setSettings] = useState(DefaultSetting);

  const addStep = () => {
    setSettings([...settings, {}]);
  };

  const exportToJson = () => {
    var dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(settings));
    var dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "settings.json");
    dlAnchorElem.click();
  };

  return (
    <div className="alarm-container">
      {settings.map((setting, index) => (
        <AlarmItem {...setting} index={index + 1}></AlarmItem>
      ))}

      <div className="footer">
        <button
          className="add-step"
          onClick={() => {
            addStep();
          }}
        >
          Add step
        </button>
        <button
          className="stopBtn"
          onClick={() => {
            stop();
          }}
        >
          stop
        </button>
        <button
          className="exportBtn"
          onClick={() => {
            exportToJson();
          }}
        >
          download
        </button>
        <a id="downloadAnchorElem" style={{ display: "none" }}></a>
      </div>
    </div>
  );
};

export default AlarmContainer;
