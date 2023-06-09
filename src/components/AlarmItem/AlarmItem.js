import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./AlarmItem.css";
import { play } from "../../utils/sound";

const AlarmItem = (props) => {
  const MINUTE_LENGTH = 60;
  const [key, setKey] = useState(new Date().getTime());
  const [taskTime, setTaskTime] = useState(
    (props.taskMinutes && props.taskMinutes * MINUTE_LENGTH) || 0
  );

  const [playing, setPlaying] = useState(false);

  const switchTimer = () => {
    setPlaying(!playing);
  };

  const onComplete = () => {
    play();
  };

  const reset = () => {
    setKey(new Date().getTime());
    setTaskTime(+props.taskMinutes * MINUTE_LENGTH);
    setPlaying(false);
  };

  useEffect(() => {
    setTaskTime((props.taskMinutes && props.taskMinutes * MINUTE_LENGTH) || 0);
  }, [props.taskMinutes])

  return (
    <div className="alarm-item">
      <div className="index">{props.index}</div>
      <input type="checkbox"></input>
      <input
        className="task-desc"
        type="text"
        onChange={(e) => {
          props.updateSetting({
            taskDesc: e.target.value,
            taskMinutes: props.taskMinutes,
          });
        }}
        value={props.taskDesc}
      />
      <input
        className="task-time"
        type="number"
        min={0}
        onChange={(e) => {
          props.updateSetting({
            taskDesc: props.taskDesc,
            taskMinutes: e.target.value,
          });
        }}
        value={props.taskMinutes}
      />
      <button className="pause-continue" onClick={() => switchTimer()}>
        {playing ? "pause" : "start/continue"}
      </button>
      <button
        className="reset"
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
      <CountdownCircleTimer
        key={key}
        isPlaying={playing}
        duration={taskTime}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        size={60}
        strokeWidth={5}
        onComplete={() => {
          onComplete();
        }}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default AlarmItem;
