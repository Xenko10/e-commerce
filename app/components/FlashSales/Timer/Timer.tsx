import dynamic from "next/dynamic";

const Timer = dynamic(() => import("./TimerComponent"), {
  ssr: false,
});

export default Timer;
