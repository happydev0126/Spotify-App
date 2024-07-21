"use client";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/appContext";
import {
  setPlaybackPosition,
  setPlaybackVolume,
} from "../api/spotify/spotify-api";
import { BottomScreenPlayer } from "./player/BottomScreenPlayer";
import { FullscreenPlayer } from "./player/FullscreenPlayer";

export default function Player({ token }: { token: string }) {
  const { is_paused, current_track, position } = useContext(PlayerContext);
  const [volume, setVolume] = useState(50);
  const [prevVolume, setPrevVolume] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [trackPositionInMs, setTrackPositionInMs] = useState(position);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (current_track !== undefined) {
        setFullScreen(window.innerWidth <= 768);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [current_track]);

  useEffect(() => {
    const timeout = setInterval(() => {
      setTrackPositionInMs((prev) => prev + 1000);
    }, 1000);

    if (is_paused) {
      clearInterval(timeout);
    }

    return () => {
      clearInterval(timeout);
    };
  }, [is_paused]);

  useEffect(() => {
    setTrackPositionInMs(position);
  }, [position, current_track]);

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setIsMuted(false);
    setVolume(() => +e.target.value);
    setPlaybackVolume(+e.target.value, token);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setPrevVolume(volume);
      setVolume(0);
      setPlaybackVolume(0, token);
    } else {
      setVolume(prevVolume);
      setPlaybackVolume(prevVolume, token);
    }
  };

  const handleMouseUp = () => {
    setPlaybackPosition(trackPositionInMs, token);
  };

  const handleFullScreen = () => {
    if (current_track === undefined) return;
    if (!isMobile) return;
    setFullScreen(true);
    if (!fullScreen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleTrackPosition = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackPositionInMs(+e.currentTarget.value);
  };

  if (!fullScreen)
    return (
      <BottomScreenPlayer
        handleMouseUp={handleMouseUp}
        handleMute={handleMute}
        handleVolume={handleVolume}
        fullScreen={fullScreen}
        trackPositionInMs={trackPositionInMs}
        isMobile={isMobile}
        handleFullScreen={handleFullScreen}
        volume={volume}
        token={token}
        isMuted={isMuted}
      />
    );

  return (
    <FullscreenPlayer
      setFullScreen={setFullScreen}
      handleFullScreen={handleFullScreen}
      fullScreen={fullScreen}
      token={token}
      handleMouseUp={handleMouseUp}
      trackPositionInMs={trackPositionInMs}
      handleTrackPosition={handleTrackPosition}
      isMuted={isMuted}
      volume={volume}
      isMobile={isMobile}
      setTrackPositionInMs={setTrackPositionInMs}
      handleVolume={handleVolume}
      handleMute={handleMute}
    />
  );
}
