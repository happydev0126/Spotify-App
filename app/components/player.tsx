'use client'
import { useContext, useEffect, useState } from "react";
import { pausePlayback, resumePlayback } from "../api/spotify/spotify-api";
import { DeviceContext, PlayerContext } from "../deviceContext";

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
export default function Player(props) {
  const player = useContext(PlayerContext)
  const deviceId = useContext(DeviceContext)
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    if (!player) {
      return
    }
    player.addListener('player_state_changed', (state => {

      if (!state) {
        return;
      }

      setTrack(state.track_window.current_track);
      setPaused(state.paused);


      player.getCurrentState().then(state => {
        (!state) ? setActive(false) : setActive(true)
      });

    }));
  }, [player, deviceId])

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://sdk.scdn.co/spotify-player.js";
  //   script.async = true;
  //
  //   document.body.appendChild(script);
  //
  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     const player = new window.Spotify.Player({
  //       name: "Web Playback SDK",
  //       getOAuthToken: (cb) => {
  //         cb(props.token);
  //       },
  //       volume: 0.5,
  //     });
  //
  //     setPlayer(player);
  //
  //     player.addListener("ready", ({ device_id }) => {
  //       console.log("Device ID has gone online", device_id);
  //     });
  //
  //     player.addListener("not_ready", ({ device_id }) => {
  //       console.log("Device ID has gone offline", device_id);
  //     });
  //
  //     player.addListener('player_state_changed', (state => {
  //
  //       if (!state) {
  //         return;
  //       }
  //
  //       setTrack(state.track_window.current_track);
  //       setPaused(state.paused);
  //
  //
  //       player.getCurrentState().then(state => {
  //         (!state) ? setActive(false) : setActive(true)
  //       });
  //
  //     }));
  //
  //     player.addListener("account_error", ({ device_id }) => {
  //       console.log("account error ", device_id);
  //     });
  //
  //     player.addListener("authentication_error", ({ device_id }) => {
  //       console.log("authentication_error ", device_id);
  //     });
  //
  //     player.addListener("autoplay_failed", ({ device_id }) => {
  //       console.log("autoplay_failed ", device_id);
  //     });
  //
  //     player.addListener("initialization_error", ({ device_id }) => {
  //       console.log("initialization_error ", device_id);
  //     });
  //
  //     player.addListener("playback_error", ({ device_id }) => {
  //       console.log("playback_error ", device_id);
  //     });
  //
  //     player.connect();
  //   };
  // }, []);


  return (
    <div className={`flex h-16 w-full items-center justify-between ${props.className}`} >
      <div className="flex gap-2 items-center">
        {current_track.album.images[0].url &&
          <>
            <img src={current_track.album.images[0].url} className="now-playing__cover size-12" alt="" />

            <div className="now-playing__side">
              <div className="now-playing__name">
                {current_track.name}
              </div>

              <div className="now-playing__artist text-xs text-gray-400">
                {current_track.artists[0].name}
              </div>
            </div>
          </>
        }
      </div>
      <div className="flex items-center justify-center gap-4">
        <>
          <button className="btn-spotify" disabled onClick={() => { player.shuffle() }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" data-icon="SvgShuffle" aria-hidden="true"><path d="M21 18h-2.969a6 6 0 01-3.585-1.181M9.341 6.965a6.006 6.006 0 00-3.372-1.03H3m0 12.1h2.969A6.031 6.031 0 0012 12h0a6.031 6.031 0 016.031-6.031H21M18 9l3-3-3-3m.107 18.031l3-3-3-3"></path></svg>
          </button>
          <button className="btn-spotify" onClick={() => { player.previousTrack() }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" data-icon="SvgSkipBack" aria-hidden="true"><path d="M17.767 19.664a1 1 0 001.633-.774V5.11a1 1 0 00-1.633-.774L13.9 7.5l-4.554 3.726a1 1 0 000 1.548L13.9 16.5zM4.6 21V3"></path></svg>
          </button>

          <button className="btn-spotify" onClick={() => { player.togglePlay() }} >
            {is_paused ?
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" data-icon="SvgPlayCircle" aria-hidden="true"><path d="M15.149 12.418a.582.582 0 000-.9L12.5 9.351l-2.247-1.839a.581.581 0 00-.949.45v8.012a.581.581 0 00.949.449l2.247-1.839zM21 12a9 9 0 11-9-9 9 9 0 019 9z"></path></svg> :
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="#0a0a0a" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" data-icon="SvgPauseCircle" aria-hidden="true"><path d="M21 12a9 9 0 11-9-9 9 9 0 019 9zm-6.955 3.409V8.864m-3.818 6.545V8.864"></path></svg>
            }
          </button>
          <button className="btn-spotify" onClick={() => { player.nextTrack() }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" data-icon="SvgSkipForward" aria-hidden="true"><path d="M14.4 12.524a1 1 0 000-1.548L9.85 7.25 5.983 4.086a1 1 0 00-1.633.774v13.78a1 1 0 001.633.774L9.85 16.25zm4.75-9.774v18"></path></svg>
          </button>

          <button className="btn-spotify" disabled onClick={() => { player.repeat() }} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" data-icon="SvgRepeat" aria-hidden="true"><path d="M17.251 3L21 6.752 17.251 10.5M21 6.759H5.805A2.807 2.807 0 003 9.566v1.628m3.751 2.35L3 17.3 6.7 21M3 17.289h15.2a2.807 2.807 0 002.8-2.808v-1.628"></path></svg>
          </button>
        </>
      </div>
      <div></div>
    </div >
  )
}

