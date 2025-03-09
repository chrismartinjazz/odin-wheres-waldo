import React, { useEffect, useState, useRef } from "react";
import styles from "./Timer.module.css";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;

export default function Timer({ timerRunning }) {
  const startTimeRef = useRef(Date.now());
  const [time, setTime] = useState(0);

  const hours = Math.floor(time / HOUR);
  const minutes = Math.floor((time / MINUTE) % 60);
  const seconds = Math.floor((time / SECOND) % 60);

  useEffect(() => {
    if (timerRunning) {
      const key = setInterval(
        () => setTime(Date.now() - startTimeRef.current),
        1000
      );

      return () => {
        clearInterval(key);
      };
    }
  }, [timerRunning]);

  return (
    <>
      <div className={styles.timer}>
        {hours > 0 ? `${hours}:` : ""}
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </div>
    </>
  );
}
