import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import beep from "./beep.mp3"

function App() {

  const [seconds, setSeconds] = useState(25*60)
  const [toggleOn, setToggleOn] = useState(false)
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [onBreak, setOnBreak] = useState(false)
  const [countdownInterval, setCountdownInterval] = useState();

  const handleIncrementUp = (type) => {
    if (!toggleOn) {
      if (type == "break") {
        if (breakLength < 60) {
          setBreakLength(breakLength+1);
        }
      } else {
        if (sessionLength < 60) {
          setSessionLength(sessionLength+1);
          setSeconds(seconds+60);
        }
      }
    }
  }

  const handleDecrementUp = (type) => {
    if (!toggleOn) {
      if (type == "break") {
        if (breakLength>1) {
          setBreakLength(breakLength-1);
        }
      } else {
        if (sessionLength > 1) {
          setSessionLength(sessionLength-1);
          setSeconds(seconds-60)
        }
      }
    }
  }

  const handleToggleOn = () => {
    setToggleOn(!toggleOn);
    if (!toggleOn) {
      const timer = setInterval(() => {
        if (seconds === 0) {
          handleSwitch();
        } else {
          setSeconds((secondsleft) => secondsleft-1);
        }
      }, 1000);
      setCountdownInterval(timer);
    }
  }

  useEffect(() => {
    if (seconds === 0) {
      const audio = new Audio(beep);
      audio.play();
      handleSwitch();
    }
  }, [countdownInterval, seconds]);

  useEffect(() => {
    if (!toggleOn) {
      clearInterval(countdownInterval)
    }
  }, [toggleOn])
  
  useEffect(() => {
    return () => clearInterval(countdownInterval);
  }, [countdownInterval])

  const handleSwitch = () => {
    if (onBreak) {
      setSeconds(sessionLength*60);
    } else {
      setSeconds(breakLength*60);
    }
    setOnBreak(!onBreak)
  }

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setSeconds(25*60);
    setOnBreak(false);
  }

  function doubleDigits(n){
    return n > 9 ? "" + n: "0" + n;
  }

  return (
    <div className="App">
      <div className="center">
        <h1 className="clock-title">25 + 5 Clock</h1>
        <div className="lengths">
          <div className="column">
            <h2>Break Length</h2>
            <div className="arrow-changer">
              <div onClick={() => handleIncrementUp("break")}><i className="fa-solid fa-arrow-up"></i></div>
              <h3>{breakLength}</h3>
              <div onClick={() =>handleDecrementUp("break")}><i className="fa-solid fa-arrow-down"></i></div>
            </div>
          </div>
          <div className="column">
            <h2>Session Length</h2>
            <div className="arrow-changer">
              <div onClick={() => handleIncrementUp("session")}><i className="fa-solid fa-arrow-up"></i></div>
              <h3>{sessionLength}</h3>
              <div onClick={() => handleDecrementUp("session")}><i className="fa-solid fa-arrow-down"></i></div>
            </div>
          </div>
        </div>
        <div className="session">
          <h2>{onBreak ? "Break" : "Session"}</h2>
          <p id="session-timer">{doubleDigits(Math.floor(seconds / 60))}:{doubleDigits(seconds - (Math.floor(seconds / 60)*60))}</p>
        </div>
        <div className="playback-icons">
          <i onClick={handleToggleOn} className="fa-solid fa-play fa-2x"></i>
          <i className="fa-solid fa-pause fa-2x"></i>
          <i onClick={handleReset} className="fa-solid fa-arrows-rotate fa-2x"></i>
        </div>
        <p>Designed and Coded by Alex Aney</p>
      </div>
    </div>
  );
}

export default App;
