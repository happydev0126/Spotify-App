import { Artist, CurrentUser, CurrentUserArtist, CurrentUserItems, FeaturedPlaylists, Playlist, RecentlyPlayed, Track, Tracks, User } from "@/app/types/spotify";
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
  return res
};

export const fetchPlayerApi = async (url: string, token: string, track_number: number, context_uri?: string, uris?: string[]) => {
  if (!token) {
    return null
  }
  let requestOptions = {}
  if (context_uri !== undefined) {
    requestOptions = {
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
  }

  if (uris !== undefined) {

    requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "uris": [`${uris}`],
        "position_ms": 0
      })
    };
  }

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

export async function resumePlayback(token: string, deviceId: string, track_number: number, context_uri?: string, uris?: string[]) {
  return fetchPlayerApi(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    token,
    track_number,
    context_uri,
    uris
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

export async function getCurrentUserPlaylists(token: string): Promise<CurrentUserItems> {
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

export async function getUsersSavedTracks(token: string, limit?: number): Promise<RecentlyPlayed> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/tracks?${limit}`,
    token
  )
}

export async function getUsersTopItems(token: string, type: string, limit?: number): Promise<CurrentUserArtist> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/top/${type}?limit=${limit}`,
    token
  )
}

export async function getFeaturedPlaylists(token: string, limit?: number): Promise<FeaturedPlaylists> {
  return fetchWebApi(
    `https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}`,
    token
  )
}

export async function getCurrentUser(token: string): Promise<CurrentUser | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me`,
    token
  )
}

export async function getArtist(token: string, id: string): Promise<Artist | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/artists/${id}`,
    token
  )
}

interface artistsTopTracks {
  tracks: Track[]
}

export async function getArtistTopTracks(token: string, id: string): Promise<artistsTopTracks | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    token
  )
}
