"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export const ReactPlayerComponent = ({ source }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muteState, setMuteStatus] = useState(true);
  const [playedState, setPlayedState] = useState(0);
  const [seeking, setSeek] = useState(false);
  const [durationState, durationSetState] = useState(null);

  const videoRef = useRef(null);

  const handle = useFullScreenHandle();
  // useEffect(() => {
  //   console.log(videoRef.current);
  //   var duration = videoRef.current.getDuration();
  //   console.log(duration);
  // }, [videoRef.current]);

  //

  function volumeChange(e) {
    var rangeValue = e.target.value;
    var valueForVolumeControl = rangeValue / 100;
    setVolume(valueForVolumeControl);
  }

  function progressFunc(progress) {
    var videoProgress = progress.playedSeconds;
    console.log(videoProgress);
    if (!seeking) {
      setPlayedState(videoProgress);
    }
  }

  function handleSeekChange(e) {
    setPlayedState(e.target.value);
  }

  function mouseDownSeek(e) {
    setSeek(true);
  }

  function mouseUpSeek(e) {
    setSeek(false);
    videoRef.current.seekTo(e.target.value);
  }

  return (
    <>
      {/* <video autoPlay>
        <source src={source.url} type="video/mp4" />
      </video> */}
      <div className="">
        <div className="">
          <div className="">
            <FullScreen handle={handle}>
              <ReactPlayer
                ref={videoRef}
                className="player"
                playing={playing}
                muted={muteState}
                loop={true}
                volume={volume}
                // controls={true}
                width="100%"
                height="100%"
                onProgress={progressFunc}
                url={source}
                onReady={(reactPlayer) => {
                  console.log(reactPlayer.getDuration());
                  durationSetState(reactPlayer.getDuration());
                }}
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
              <div className="">{playedState};</div>
              <div
                className="absolute bottom-[50px] right-[10px] z-[10] text-red-800"
                onClick={handle.enter}
              >
                Full Screen
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
              <div
                className=""
                type="range"
                min="0"
                max="100"
                onChange={volumeChange}
              ></div>
              <div
                className=""
                type="range"
                min={0}
                max={durationState}
                step="any"
                value={playedState}
                onChange={handleSeekChange}
                onMouseDown={mouseDownSeek}
                onMouseUp={mouseUpSeek}
              ></div>
            </FullScreen>
          </div>
        </div>
      </div>
    </>
  );
};
