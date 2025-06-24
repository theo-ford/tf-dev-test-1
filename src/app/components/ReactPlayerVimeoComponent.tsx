"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export const ReactPlayerVimeoComponent = ({ source }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muteState, setMuteStatus] = useState(true);
  const [playedState, setPlayedState] = useState(0);
  const [seeking, setSeek] = useState(false);
  const [durationState, setDurationState] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);
  // const [seekValue, setSeekValue] = useState(0);
  const videoRef = useRef(null);

  const handle = useFullScreenHandle();

  function volumeChange(e) {
    const rangeValue = e.target.value;
    const valueForVolumeControl = rangeValue / 100;
    setVolume(valueForVolumeControl);
  }

  function progressFunc(progress) {
    const videoProgress = progress.playedSeconds;
    console.log(videoProgress);
    if (!seeking) {
      setPlayedState(videoProgress);
    }
  }

  function handleDuration(duration) {
    setDurationState(duration);
  }

  // ORIGINAL FUNCTIONS FOR SEEK

  function handleSeekChange(e) {
    setPlayedState(e.target.value);
    // setSeekValue(e.target.value);
  }

  function mouseDownSeek(e) {
    setSeek(true);
  }

  function mouseUpSeek(e) {
    setSeek(false);
    videoRef.current?.seekTo(e.target.value);
  }

  function handleEnded() {
    setPlayedState(0);
    setPlaying(false);
  }

  function fullScreenFunc(e) {
    if (fullScreen === false) {
      handle.enter();
      setFullScreen(true);
    } else {
      handle.exit();
      setFullScreen(false);
    }
  }
  return (
    <>
      <div className="">
        <div className="">
          <div className="w-[100vw] h-[100vh]">
            <FullScreen handle={handle}>
              <ReactPlayer
                ref={videoRef}
                className="player"
                playing={playing}
                muted={muteState}
                volume={volume}
                width="100vw"
                height="100vh"
                style={{
                  width: "100vw",
                  height: "100vh",
                }}
                onProgress={progressFunc}
                onDuration={handleDuration}
                onEnded={handleEnded}
                url={source}
              ></ReactPlayer>
              {playing ? (
                <div
                  className="absolute bottom-[50px] left-[10px] z-[10] text-red-800"
                  onClick={() => setPlaying(false)}
                >
                  Pause
                </div>
              ) : (
                <div
                  className="absolute bottom-[50px] left-[10px] z-[10] text-red-800"
                  onClick={() => setPlaying(true)}
                >
                  Play
                </div>
              )}
              <div
                className="absolute bottom-[50px] right-[10px] z-[10] text-red-800"
                onClick={() => fullScreenFunc()}
              >
                {fullScreen ? "Exit Full Screen" : "Full Screen"}
              </div>
              {muteState ? (
                <div
                  className="absolute bottom-[50px] right-[150px] z-[10] text-red-800"
                  onClick={() => setMuteStatus(false)}
                >
                  Un Mute
                </div>
              ) : (
                <div
                  className="absolute bottom-[50px] right-[150px] z-[10] text-red-800"
                  onClick={() => setMuteStatus(true)}
                >
                  Mute
                </div>
              )}
              <input
                className="absolute bottom-[0px] right-[25px] z-[10] text-red-800 w-[5vw]"
                type="range"
                min="0"
                max="100"
                onChange={volumeChange}
              ></input>

              <input
                type="range"
                className="absolute bottom-0 left-0 w-[90vw] h-[20px] bg-gray-700"
                min={0}
                max={durationState}
                value={playedState}
                onChange={handleSeekChange}
                onMouseDown={mouseDownSeek}
                onMouseUp={mouseUpSeek}
              />
              <p>
                {playedState} : {durationState}
              </p>
            </FullScreen>
          </div>
        </div>
      </div>
    </>
  );
};
