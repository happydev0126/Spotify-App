'use client';

import { createContext, useEffect, useState } from 'react';
import { Track } from './types/spotify';


export const DeviceContext = createContext('');
export const PlayerContext = createContext<Spotify.Player | undefined>(undefined);

export default function Providers({ children, token }: { children: React.ReactNode, token: string }) {

  const [player, setPlayer] = useState<Spotify.Player>();
  const [deviceId, setDeviceId] = useState('')
  const [current_track, setTrack] = useState<Spotify.Track>();
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [playerState, setPlayerState] = useState()
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track>()
  const [nextTrack, setNextTrack] = useState<Spotify.Track>()

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

      player.addListener('player_state_changed', (state => {
        setPlayerState(state);
        (!state) ? setActive(false) : setActive(true)
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        var current_track = state.track_window.current_track;
        setCurrentTrack(current_track)
        var next_track = state.track_window.next_tracks[0];
        setNextTrack(next_track)

        console.log('Currently Playing', current_track);
        console.log('Playing Next', next_track);

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
    <DeviceContext.Provider value={deviceId}>
      <PlayerContext.Provider value={player}>
        {children}
      </PlayerContext.Provider>
    </DeviceContext.Provider>
  );
}
