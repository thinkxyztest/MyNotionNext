import { useState, useEffect } from "react";

export default function Rhythm() {
  const rhythm = [1, 2, 1, 1, 2, 1]; // 节奏定义
  const [isPlaying, setIsPlaying] = useState(false); // 是否正在播放
  const [intervalId, setIntervalId] = useState(null); // 定时器 ID
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 剩余时间（秒）
  
  const shortBeep = new Audio("/assets/short_beep.mp3"); // 短音
  const longBeep = new Audio("/assets/long_beep.mp3");  // 长音

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const countdown = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timeLeft === 0) {
      stopRhythm();
      alert("练习结束！");
    }
  }, [isPlaying, timeLeft]);

  const playRhythm = () => {
    let index = 0;
    const id = setInterval(() => {
      if (!isPlaying) return clearInterval(id);
      if (rhythm[index] === 1) {
        shortBeep.play();
      } else if (rhythm[index] === 2) {
        longBeep.play();
      }
      index = (index + 1) % rhythm.length; // 循环节奏
    }, 800); // 每个节奏间隔 0.8 秒
    setIntervalId(id);
  };

  const startRhythm = () => {
    setIsPlaying(true);
    playRhythm();
  };

  const stopRhythm = () => {
    setIsPlaying(false);
    clearInterval(intervalId);
    setIntervalId(null);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>节奏练习</h1>
      <p>节奏：121121</p>
      <p>剩余时间：{Math.floor(timeLeft / 60)} 分 {timeLeft % 60} 秒</p>
      <button
        onClick={startRhythm}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          margin: "10px",
        }}
        disabled={isPlaying}
      >
        开始练习
      </button>
      <button
        onClick={stopRhythm}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          margin: "10px",
        }}
        disabled={!isPlaying}
      >
        停止练习
      </button>
    </div>
  );
}
