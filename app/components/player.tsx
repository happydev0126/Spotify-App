'use client'
import { useEffect, useState } from "react";
import { playTrack } from "../api/spotify/spotify-api";

export default function Player(props) {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(props.token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id)
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
    };
  }, [props.token]);

  return (
    <div className={`flex h-16 w-full justify-center ${props.className}`} >
      <button onClick={() => playTrack(props.token, deviceId)}>PLAY</button>
    </div >
  )
}

