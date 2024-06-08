import getAccessToken from '../lib/spotify'

async function fetchWebApi(endpoint: string, method: string, body?: string) {
  const { access_token } = await getAccessToken()
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    method,
    body: JSON.stringify(body)
  });
  return await res.json();
}

export async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  ));
}
export async function getUser() {
  const getUserResponse = await fetchWebApi(
    'v1/me', 'GET'
  );
  console.log(getUserResponse)
}

export async function getLibraries() {
  return (await fetchWebApi(
    `v1/me/playlists`, 'GET'
  )).items;
}

export async function getTracks() {
  return (await fetchWebApi('v1/me/tracks', 'GET'));
}
