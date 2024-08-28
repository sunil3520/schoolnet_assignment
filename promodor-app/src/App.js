import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [time, setTime] = useState(1500); 
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(intervalRef.current);
            setIsBreak(!isBreak);
            return isBreak ? workDuration * 60 : breakDuration * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, isBreak, workDuration, breakDuration]);

  const toggleStartStop = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(workDuration * 60);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{isBreak ? 'Break Time' : 'Work Time'}</h1>
        <div className="text-6xl font-mono">{formatTime(time)}</div>
        <div className="w-full h-2 bg-gray-700 rounded mt-4">
          <div
            className="h-2 bg-blue-500 rounded"
            style={{ width: `${((isBreak ? breakDuration * 60 : workDuration * 60) - time) / (isBreak ? breakDuration * 60 : workDuration * 60) * 100}%` }}
          ></div>
        </div>
        <div className="mt-8 space-x-4">
          <button
            onClick={toggleStartStop}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
          >
            {isActive ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Reset
          </button>
        </div>
        <div className="mt-8 flex space-x-4">
          <div>
            <label className="block">Work Duration (minutes)</label>
            <input
              type="number"
              value={workDuration}
              onChange={(e) => {
                setWorkDuration(Number(e.target.value));
                setTime(Number(e.target.value) * 60);
              }}
              className="w-16 p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block">Break Duration (minutes)</label>
            <input
              type="number"
              value={breakDuration}
              onChange={(e) => setBreakDuration(Number(e.target.value))}
              className="w-16 p-2 bg-gray-700 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
