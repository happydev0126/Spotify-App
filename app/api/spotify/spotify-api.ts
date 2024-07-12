import { Artist, Albums, CurrentUser, Artists, Playlist, RecentlyPlayed, SearchType, User, Search, Album, TopTracks, SavedAlbums, CurrentUserPlaylists, FeaturedPlaylist, GetCurrentlyPlayingTrackResponse } from "@/app/types/spotify";
import { getToken } from "../clerk/getToken";
import { getAuth } from "@clerk/nextjs/server";

export const fetchWebApi = async (url: string) => {
  const token = await getToken()
  if (!token) {
    return null;
  }
  const requestOptions = {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  try {
    const res = await fetch(url, requestOptions).then((res) => res.json());

    return res;
  } catch (err) {
    console.error(err)
    return err
  }
};

export const fetchWebApi2 = async (url: string) => {
  const token = await getToken()

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


export const fetchPlayerApi = async (url: string, token: string, track_number?: number, context_uri?: string, uris?: string[]) => {
  if (!token) {
    return null
  }
  let requestOptions = {}
  if (context_uri === undefined && uris === undefined) {
    requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "position_ms": 0
      })
    }
  }
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

export const seekPlayerApi = async (url: string) => {
  const token = await getToken()
  if (!token) {
    return null;
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

export async function getDevice() {
  return fetchWebApi2(
    `https://api.spotify.com/v1/me/player?market=ES`,
  );
}

export async function resumePlayback(token: string, deviceId: string, track_number?: number, context_uri?: string, uris?: string[]) {

  return fetchPlayerApi(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    token,
    track_number,
    context_uri,
    uris
  );
}

export async function pausePlayback(token: string, deviceId: string) {
  return pausePlayerApi(
    `https://api.spotify.com/v1/me/player/pause?${deviceId}`,
    token
  );
}

export async function getTopTracks(limit: number) {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${limit}`,
  );
}

export async function getUser(user_id: string): Promise<User> {
  return fetchWebApi(
    `https://api.spotify.com/v1/users/${user_id}`,
  );
}

export async function getCurrentUserPlaylists(): Promise<CurrentUserPlaylists> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/playlists`,
  );
}

export async function getPlaylist(playlist_id: string): Promise<Playlist> {
  return fetchWebApi(
    `https://api.spotify.com/v1/playlists/${playlist_id}`,
  );
}

export async function getTracks() {
  return (await fetchWebApi('https://api.spotify.com/v1/me/tracks'));
}

export async function getRecentlyPlayed(limit: number): Promise<RecentlyPlayed> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
  )
}

export async function getUsersSavedTracks(limit?: number): Promise<RecentlyPlayed> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/tracks?${limit}`,
  )
}

export async function getUsersTopItems(type: string, limit?: number): Promise<Artists> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/top/${type}?limit=${limit}`,
  )
}

export async function getFeaturedPlaylists(limit?: number): Promise<FeaturedPlaylist> {
  return fetchWebApi(
    `https://api.spotify.com/v1/browse/featured-playlists?limit=${limit}`,
  )
}

export async function getCurrentUser(): Promise<CurrentUser | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me`,
  )
}

export async function getArtist(id: string): Promise<Artist | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/artists/${id}`,
  )
}
export async function getArtistAlbums(id: string): Promise<Albums | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/artists/${id}/albums`,
  )
}

export async function getArtistTopTracks(id: string): Promise<TopTracks> {
  return fetchWebApi(
    `https://api.spotify.com/v1/artists/${id}/top-tracks`,
  )
}

export async function getAlbum(id: string): Promise<Album | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/albums/${id}`,
  )
}

export async function getUsersAlbums(): Promise<SavedAlbums | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/albums`,
  )
}

export async function getCurrentlyPlayingTrack(): Promise<GetCurrentlyPlayingTrackResponse> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/player/currently-playing`,
  )
}

export async function search(query: string, type?: SearchType[], limit?: number, offset?: number): Promise<Search> {
  if (type === undefined) {
    type = ['playlist', 'track', 'album', 'artist']
  }
  return fetchWebApi(
    `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`,
  )
}

export async function setPlaybackVolume(volume_percent: number) {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume_percent}`
  )
}

export async function setPlaybackPosition(position_ms: number) {
  return seekPlayerApi(
    `https://api.spotify.com/v1/me/player/seek?position_ms=${position_ms}`
  )
}
