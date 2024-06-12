'use client';

import { createContext, useEffect, useState } from 'react';

export const DeviceContext = createContext('');
export const PlayerContext = createContext(null);

const track = {
  name: "",
  album: {
    images: [
      { url: "" }
    ]
  },
  artists: [
    { name: "" }
  ]
}
export default function Providers({ children, token }: { children: React.ReactNode, token: string }) {

  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState('')

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }: { device_id: string }) => {
        setDeviceId(device_id)
        console.log("Device ID has gone online", device_id);
      });

      player.addListener("not_ready", ({ device_id }: { device_id: string }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("account_error", ({ device_id }: { device_id: string }) => {
        console.log("account error ", device_id);
      });

      player.addListener("authentication_error", ({ device_id }: { device_id: string }) => {
        console.log("authentication_error ", device_id);
      });

      player.addListener("autoplay_failed", ({ device_id }: { device_id: string }) => {
        console.log("autoplay_failed ", device_id);
      });

      player.addListener("initialization_error", ({ device_id }: { device_id: string }) => {
        console.log("initialization_error ", device_id);
      });

      player.addListener("playback_error", ({ device_id }: { device_id: string }) => {
        console.log("playback_error ", device_id);
      });

      player.connect();
    };
  }, []);

  return (
    <DeviceContext.Provider value={deviceId}>
      <PlayerContext.Provider value={player}>
        {children}
      </PlayerContext.Provider>
    </DeviceContext.Provider>
  );
}
