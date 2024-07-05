
import React, { useState, useRef } from "react";
import "../components/Timer.css";

const Timer = () => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
  const [interv, setInterv] = useState();
  const [running, setRunning] = useState(false);
  const startTimeRef = useRef(0);

  const start = () => {
    if (!running) {
      const startTime = Date.now() - time.ms;
      startTimeRef.current = startTime;
      setInterv(setInterval(updateTimer, 10));
      setRunning(true);
    } else {
      clearInterval(interv);
      setRunning(false);
    }
  };

  const stop = () => {
    clearInterval(interv);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(interv);
    setRunning(false);
    setTime({ ms: 0, s: 0, m: 0 });
  };

  const updateTimer = () => {
    const currentTime = Date.now();
    let elapsedTime = currentTime - startTimeRef.current;

    let newMs = elapsedTime % 1000;
    let newS = Math.floor((elapsedTime / 1000) % 60);
    let newM = Math.floor(elapsedTime / 60000);

    setTime({ ms: newMs, s: newS, m: newM });
  };

  return (
    <div className="stopwatch">
      <p>{`${time.m.toString().padStart(2, "0")}:${time.s
        .toString()
        .padStart(2, "0")}.${time.ms.toString().padStart(3, "0")}`}</p>
      <div>
        <button className={running ? "pause" : "start"} onClick={start}>
          {running ? "Pause" : "Start"}
        </button>
        <button className="stop" onClick={stop}>
          Stop
        </button>
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
