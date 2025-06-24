"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import styles from "./ReactPlayerComponent.module.css";

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
      <p> React Player</p>
      {/* <video autoPlay>
        <source src={source.url} type="video/mp4" />
      </video> */}
      <div className={styles.videoGrid}>
        <div className={styles.videoRow}>
          <div className={styles.playerWrapper}>
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
                url={source.url}
                onReady={(reactPlayer) => {
                  console.log(reactPlayer.getDuration());
                  durationSetState(reactPlayer.getDuration());
                }}
              ></ReactPlayer>

              {playing ? (
                <div
                  className={styles.reactPlayerButton}
                  onClick={() => setPlaying(false)}
                >
                  Pause
                </div>
              ) : (
                <div
                  className={styles.reactPlayerButton}
                  onClick={() => setPlaying(true)}
                >
                  Play
                </div>
              )}
              <div className={styles.videoProgressTime}>{playedState};</div>
              <div className={styles.fullScreenButton} onClick={handle.enter}>
                Full Screen
              </div>
              {muteState ? (
                <div
                  className={styles.muteButton}
                  onClick={() => setMuteStatus(false)}
                >
                  Un Mute
                </div>
              ) : (
                <div
                  className={styles.muteButton}
                  onClick={() => setMuteStatus(true)}
                >
                  Mute
                </div>
              )}
              <div
                className={styles.volumeSlider}
                type="range"
                min="0"
                max="100"
                onChange={volumeChange}
              ></div>
              <div
                className={styles.progressBar}
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
