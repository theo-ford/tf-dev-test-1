"use client";

import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ReactPlayerComponent = ({ source }: any) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muteState, setMuteStatus] = useState(true);
  const [playedState, setPlayedState] = useState(0);
  const [seeking, setSeek] = useState(false);
  const [durationState, setDurationState] = useState(0);

  const videoRef = useRef<ReactPlayer>(null);

  const handle = useFullScreenHandle();
  // useEffect(() => {
  //   console.log(videoRef.current);
  //   var duration = videoRef.current.getDuration();
  //   console.log(duration);
  // }, [videoRef.current]);

  //

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function volumeChange(e: any) {
    const rangeValue = e.target.value;
    const valueForVolumeControl = rangeValue / 100;
    setVolume(valueForVolumeControl);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function progressFunc(progress: any) {
    const videoProgress = progress.playedSeconds;
    console.log(videoProgress);
    if (!seeking) {
      setPlayedState(videoProgress);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleDuration(duration: any) {
    setDurationState(duration);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function handleSeekChange(e: any) {
    setPlayedState(e.target.value);
    // setSeekValue(e.target.value);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function mouseDownSeek() {
    setSeek(true);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  function mouseUpSeek(e: any) {
    setSeek(false);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    // videoRef.current?.seekTo(e.target.value);
    videoRef.current?.seekTo(e.target.value);
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
                onDuration={handleDuration}
                // onReady={(reactPlayer) => {
                //   console.log(reactPlayer.getDuration());
                //   durationSetState(reactPlayer.getDuration());
                // }}
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
