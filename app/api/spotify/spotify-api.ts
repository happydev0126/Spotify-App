import { CurrentUserPlaylists, Playlist, RecentlyPlayed, User } from "@/app/types/spotify";
export const fetchWebApi = async (url: string, token: string) => {
  if (!token) {
    return null;
  }
  const requestOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  const res = await fetch(url, requestOptions).then((res) => res.json());

  return res;
};

export const fetchWebApi2 = async (url: string, token: string) => {
  if (!token) {
    return null;
  }
  const requestOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  const res = await fetch(url, requestOptions)
  console.log('hello', res)
  return res
};

export const fetchPlayerApi = async (url: string, token: string, context_uri: string, track_number: number) => {
  if (!token) {
    return null
  }
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "context_uri": `${context_uri}`,
      "offset": {
        "position": track_number
      },
      "position_ms": 0
    })
  };

  const res = await fetch(url, requestOptions)
  return res
}
export const pausePlayerApi = async (url: string, token: string) => {
  if (!token) {
    return null
  }
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(url, requestOptions)
  return res
}

export async function getDevice(token: string) {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return fetchWebApi2(
    `https://api.spotify.com/v1/me/player?market=ES`,
    token
  );
}

export async function resumePlayback(token: string, deviceId: string, context_uri: string, track_number: number) {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return fetchPlayerApi(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    token,
    context_uri,
    track_number
  );
}

export async function pausePlayback(token: string, deviceId: string) {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return pausePlayerApi(
    `https://api.spotify.com/v1/me/player/pause?${deviceId}`,
    token
  );
}

export async function getTopTracks(token: string, limit: number) {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return fetchWebApi(
    `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${limit}`,
    token
  );
}

export async function getUser(token: string, user_id: string): Promise<User> {
  return fetchWebApi(
    `https://api.spotify.com/v1/users/${user_id}`,
    token
  );
}

export async function getCurrentUserPlaylists(token: string): Promise<CurrentUserPlaylists> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/playlists`,
    token
  );
}

export async function getPlaylist(token: string, playlist_id: string): Promise<Playlist> {
  return fetchWebApi(
    `https://api.spotify.com/v1/playlists/${playlist_id}`,
    token
  );
}

export async function getTracks() {
  return (await fetchWebApi('https://api.spotify.com/v1/me/tracks', 'GET'));
}

export async function getRecentlyPlayed(token: string, limit: number): Promise<RecentlyPlayed> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    token
  )
}
