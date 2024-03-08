"use client";

import styles from "./TimerComponent.module.css";
import { useState, useEffect } from "react";

export default function TimerComponent() {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const endOfSale = new Date();
    endOfSale.setDate(endOfSale.getDate() + 3);
    endOfSale.setHours(23);
    endOfSale.setMinutes(59);
    endOfSale.setSeconds(59);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = endOfSale.getTime() - now.getTime();

      const days = Math.floor(diff / (3600000 * 24))
        .toString()
        .padStart(2, "0");
      const hours = Math.floor((diff % (3600000 * 24)) / 3600000)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((diff % 3600000) / 60000)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((diff % 60000) / 1000)
        .toString()
        .padStart(2, "0");

      setTime({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.timer}>
      <div className={styles.days}>
        <div className={styles.timeText}>Days</div>
        <div className={styles.timeNumber}>{time.days}</div>
      </div>
      <div className={styles.colon}>:</div>
      <div className={styles.hours}>
        <div className={styles.timeText}>Hours</div>
        <div className={styles.timeNumber}>{time.hours}</div>
      </div>
      <div className={styles.colon}>:</div>
      <div className={styles.minutes}>
        <div className={styles.timeText}>Minutes</div>
        <div className={styles.timeNumber}>{time.minutes}</div>
      </div>
      <div className={styles.colon}>:</div>
      <div className={styles.seconds}>
        <div className={styles.timeText}>Seconds</div>
        <div className={styles.timeNumber}>{time.seconds}</div>
      </div>
    </div>
  );
}
