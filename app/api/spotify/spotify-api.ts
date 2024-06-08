import { fetchWebApi } from '@/app/utils/getAuthSession';

export async function getTopTracks(session, limit) {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return fetchWebApi(
    `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=${limit}`,
    session
  );
}
export async function getUser() {
  const getUserResponse = await fetchWebApi(
    'v1/me', 'GET'
  );
}

export async function getLibraries(session) {
  return fetchWebApi(
    `https://api.spotify.com/v1/me/playlists`,
    session
  );
}

export async function getTracks() {
  return (await fetchWebApi('v1/me/tracks', 'GET'));
}
