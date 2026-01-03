import { Button, Card } from "antd";
import React, { useEffect, useRef, useState } from "react";

const StopWatch = () => {
  const [time, setTime] = useState({
    sec: 0,
    min: 0,
    hour: 0,
  });
  let intervalID = useRef<any>(null);
  const [isRunning, setIsRunning] = useState(false);
 
const handleReset = () => {
    // setIsRunning(false);
    setTime((prev) => {
        let {min,sec,hour} = prev;
        min = sec= hour = 0;
        return {min,sec,hour};

    })
}
 
  useEffect(() => {
    if (isRunning) {
      console.log("is Running useEffect");
     intervalID.current = setInterval(() => {
        setTime((prev  ) => {
        let {sec, min, hour} = prev;
        if(sec < 60){
            sec += 1;
        }
        if(sec === 60){
            sec = 0;
            min+=1;
        }
        if(min === 60){
            min = 0;
            hour+=1;
        }
 
        return {sec, min, hour};
    }
        )
     }, 1000)
    }
    else return;

    return () => {
        clearInterval(intervalID.current);
        intervalID.current = null;
    }
  }, [isRunning]);


  console.log("is running", isRunning);
  console.log("time", time.sec, time.min, time.hour);
  return (
    <Card title="Stopwatch" style={{ width: "500px" }}>
      {time.hour > 10 ? '' : '0'}{time.hour}: {time.min > 9 ? '' : '0'}{time.min} : {time.sec > 9 ? '' : '0'}{time.sec}
      <Button onClick={() => setIsRunning(true)}>Play</Button>
      <Button onClick={() => setIsRunning(false)}>Pause</Button>
      <Button onClick={()=> handleReset()}>Reset</Button>
    </Card>
  );

};

export default StopWatch;
