import React, { useState, useEffect } from "react";
import AlarmItem from "../AlarmItem/AlarmItem";
import "./AlarmContainer.css";
import { stop } from "../../utils/sound";
//import DefaultSetting from "../../settings.json";
import { useFilePicker } from "use-file-picker";

const AlarmContainer = (props) => {
  const [settings, setSettings] = useState([{ taskDesc: "", taskMinutes: 0 }]);

  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    multiple: false,
    accept: ".json",
  });

  const addStep = () => {
    setSettings([...settings, { taskDesc: "", taskMinutes: 0 }]);
  };

  const updateSetting = (item, index) => {
    let settingsNew = settings.slice(0);
    settingsNew[index] = item;

    setSettings(settingsNew);
  };

  useEffect(() => {
    if (filesContent.length == 0) return;
    setSettings([]);
    setTimeout(() => {
      console.log(JSON.parse(filesContent[0].content));
      setSettings(JSON.parse(filesContent[0].content));
    }, 300);
  }, [filesContent]);

  const exportToJson = () => {
    const dataStr = JSON.stringify(settings);
    var fileStr = "data:text/json;charset=utf-8," + encodeURIComponent(dataStr);
    var dlAnchorElem = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", fileStr);
    dlAnchorElem.setAttribute("download", "settings.json");
    dlAnchorElem.click();
  };

  return (
    <div className="alarm-container">
      {settings.map((setting, index) => (
        <AlarmItem
          index={index + 1}
          {...setting}
          key={index}
          updateSetting={(data) => updateSetting(data, index)}
        ></AlarmItem>
      ))}

      <div className="footer">
        <button
          className="add-step"
          onClick={() => {
            addStep();
          }}
        >
          增加步骤
        </button>
        <button
          className="stopBtn"
          onClick={() => {
            stop();
          }}
        >
          关闭铃声
        </button>
        <button
          className="exportBtn"
          onClick={() => {
            exportToJson();
          }}
        >
          导出
        </button>
        <button className="importBtn" onClick={() => openFileSelector()}>
          导入
        </button>
        <a id="downloadAnchorElem" style={{ display: "none" }}></a>
      </div>
    </div>
  );
};

export default AlarmContainer;
