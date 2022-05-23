import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./AlarmItem.css";
import { play, stop } from "../../utils/sound";

const AlarmItem = (props) => {
  const MINUTE_LENGTH = 60;
  const [key, setKey] = useState(new Date().getTime());
  const [taskDesc, setTaskDesc] = useState(props.taskDesc || "");

  const [taskMinutes, setTaskMinutes] = useState(props.taskMinutes || 0);
  const [taskTime, setTaskTime] = useState(
    (props.taskMinutes && props.taskMinutes * MINUTE_LENGTH) || 0
  );

  const [playing, setPlaying] = useState(false);

  const switchTimer = () => {
    if (playing) {
      //was playing, paused now
    } else {
      //was paused, play now
      setTimeout(play, +taskMinutes * MINUTE_LENGTH * 1000);
    }
    setPlaying(!playing);
  };

  const onComplete = () => {
    play();
  };

  const reset = () => {
    setKey(new Date().getTime());
    setTaskTime(+taskMinutes * MINUTE_LENGTH);
    setPlaying(false);
  };

  return (
    <div className="alarm-item">
      <div className="index">{props.index}</div>
      <input type="checkbox"></input>
      <input
        className="task-desc"
        type="text"
        onChange={(e) => setTaskDesc(e.target.value)}
        value={taskDesc}
      />
      <input
        className="task-time"
        type="number"
        min={0}
        onChange={(e) => setTaskMinutes(e.target.value)}
        value={taskMinutes}
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
        // onUpdate={(remainingTime) => {
        //   console.log(`updated to ${remainingTime}`);
        //   if (remainingTime <= 0) {
        //     play();
        //   }
        // }}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default AlarmItem;
