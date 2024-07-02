import { Artist, Albums, CurrentUser, Artists, Playlists, Playlist, RecentlyPlayed, SearchType, User, Search, Album, TopTracks, SavedAlbums, CurrentUserPlaylists, FeaturedPlaylist } from "@/app/types/spotify";
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
  return pausePlayerApi(
    `https://api.spotify.com/v1/me/player/pause?${deviceId}`,
    token
  );
}

export async function getTopTracks(token: string, limit: number) {
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

export async function getUsersSavedTracks(token: string, limit?: number): Promise<RecentlyPlayed> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/tracks?${limit}`,
    token
  )
}

export async function getUsersTopItems(token: string, type: string, limit?: number): Promise<Artists> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/top/${type}?limit=${limit}`,
    token
  )
}

export async function getFeaturedPlaylists(token: string, limit?: number): Promise<FeaturedPlaylist> {
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
export async function getArtistAlbums(token: string, id: string): Promise<Albums | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/artists/${id}/albums`,
    token
  )
}

export async function getArtistTopTracks(token: string, id: string): Promise<TopTracks> {
  return fetchWebApi(
    `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    token
  )
}

export async function getAlbum(token: string, id: string): Promise<Album | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/albums/${id}`,
    token
  )
}

export async function getUsersAlbums(token: string): Promise<SavedAlbums | undefined> {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/albums`,
    token
  )
}

export async function search(token: string, query: string, type?: SearchType[], limit?: number, offset?: number): Promise<Search> {
  if (type === undefined) {
    type = ['playlist', 'track', 'album', 'artist']
  }
  return fetchWebApi(
    `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`,
    token
  )
}
