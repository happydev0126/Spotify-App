'use client';

import { createContext, useEffect, useState } from 'react';
import { CurrentUser } from './types/spotify'


interface PlayerContextState {
  player: Spotify.Player | undefined;
  is_active: boolean;
  is_paused: boolean;
  current_track: Spotify.Track | undefined;
}

interface DeviceContext {
  deviceId?: string;
  user?: CurrentUser;
}

export const DeviceContext = createContext<DeviceContext>({ deviceId: undefined, user: undefined });
export const PlayerContext = createContext<PlayerContextState>({ player: undefined, is_active: false, is_paused: true, current_track: undefined });

export default function Providers({ children, token, user }: { children: React.ReactNode, token: string, user: CurrentUser }) {

  const [player, setPlayer] = useState<Spotify.Player>();
  const [currentUser] = useState<CurrentUser>(user)
  const [deviceId, setDeviceId] = useState<string | undefined>(undefined)
  const [current_track, setTrack] = useState<Spotify.Track>();
  const [is_paused, setPaused] = useState(true);
  const [is_active, setActive] = useState(false);
  current_track?.album.images[0]

  useEffect(() => {
    if (currentUser && currentUser.product !== 'premium') {
      return
    }

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
        // console.log("Device ID has gone online", device_id);
      });

      player.addListener("not_ready", ({ device_id }: { device_id: string }) => {
        // console.log("Device ID has gone offline", device_id);
      });

      player.addListener('player_state_changed', (state => {
        (!state) ? setActive(false) : setActive(true)
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        console.log({ state })

      }));

      player.addListener("account_error", () => {
        console.log("account error ");
      });

      player.addListener("authentication_error", () => {
        console.log("authentication_error ");
      });

      player.addListener("autoplay_failed", () => {
        console.log("autoplay_failed ");
      });

      player.addListener("initialization_error", () => {
        console.log("initialization_error ");
      });

      player.addListener("playback_error", () => {
        console.log("playback_error ");
      });

      player.connect();
    };
  }, []);

  return (
    <DeviceContext.Provider value={{ deviceId: deviceId, user: currentUser }}>
      <PlayerContext.Provider value={{ player, is_active, is_paused, current_track }}>
        {children}
      </PlayerContext.Provider>
    </DeviceContext.Provider >
  );
}
