import { CurrentUserPlaylists, Playlist, RecentlyPlayed, User } from "@/app/types/spotify";
export const fetchWebApi = async (url: string, token: string) => {
  if (!token) {
    return null;
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());

  return res;
};

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
