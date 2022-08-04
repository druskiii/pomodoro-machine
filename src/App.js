import React from 'react';
// import { ReactDOM } from 'react';
// import { useState } from 'react'
import './App.css';

const App = () => {

  const [breakLength, setBreakLength] = React.useState(5);
   const [sessionLength, setSessionLength] = React.useState(25);
   const [play, setPlay] = React.useState(false);
   const [timingType, setTimingType] = React.useState("SESSION");
   const [timeLeft, setTimeLeft] = React.useState(1500);
   
   const handleBreakIncrease = () => {
     if (breakLength < 60){
       setBreakLength(breakLength + 1)
     }
   }
   
   const handleBreakDecrease = () => {
     if (breakLength < 60 && breakLength > 1){
       setBreakLength(breakLength - 1)
     }
   }
   
   const handleSessionIncrease = () => {
     if (sessionLength < 60){
       setSessionLength(sessionLength + 1)
       setTimeLeft(timeLeft + 60)
     }
   }
   
   const handleSessionDecrease = () => {
     if (sessionLength < 60 && sessionLength > 1){
       setSessionLength(sessionLength - 1)
       setTimeLeft(timeLeft - 60)
     }
   }
   
   const timeFormatter = () => {
     const minutes = Math.floor(timeLeft / 60);
     const seconds = timeLeft - minutes * 60;
     const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
     const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
     return `${formattedMinutes}:${formattedSeconds}`;
   }
   
   const timeout = setTimeout(() => {
     if (timeLeft && play){
       setTimeLeft(timeLeft -1)
     }
   }, 1000);
   
   const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }
   
   const resetTimer = () => {
     const audio = document.getElementById("beep");
     if(!timeLeft && timingType === "SESSION"){
       setTimeLeft(breakLength * 60)
       setTimingType("BREAK")
       audio.play();
     } else if (!timeLeft && timingType === "BREAK"){
       setTimeLeft(sessionLength * 60)
       setTimingType("SESSION")
       audio.pause()
       audio.currentTime = 0;
     }
   }
   
   const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
   
   const clock = () => {
     if(play){
       // eslint-disable-next-line no-unused-expressions
       timeout
       resetTimer()
     }
   }
   
   React.useEffect(() => {
     clock()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [play, timeLeft, timeout]);
   
   const title = timingType === "SESSION" ? "Session" : "Break";
   
    return (
      <React.Fragment>
       <div className="wrapper"> 
          <h2 id="title"><strong>Pomodoro Helper</strong></h2> 
          <div className="row">
            <div className="column">
              <h3 id="break-label">BREAK</h3>
                <button id="break-increment" onClick={handleBreakIncrease} disabled={play}>Increase</button>
                <div id="break-length">{breakLength}</div>
                <button id="break-decrement" onClick={handleBreakDecrease} disabled={play}>Decrease</button>
            </div>
            <div className="column">
              <h3 id="session-label">SESSION</h3>
                <button id="session-increment" onClick={handleSessionIncrease} disabled={play}>Increase</button>
                <div id="session-length">{sessionLength}</div>
                <button id="session-decrement" onClick={handleSessionDecrease} disabled={play}>Decrease</button>
            </div>
          </div>
        </div> 
        <div className="timer-wrapper">
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{timeFormatter()}</h3>
          </div>
          <div className="row">
            <div className="column"><button id="start_stop" onClick={handlePlay}>Start/Stop</button></div>
            <div className="column"><button id="reset" onClick={handleReset}>Reset</button></div>
          </div>
        </div>
       <audio 
         id="beep"
         preload="auto"
 src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
       />
      </React.Fragment>
  );
}

// ReactDOM.render(<App />, document.getElementById("app"));
export default App;