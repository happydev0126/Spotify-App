import Dashboard from "./components/dashboard";
import TopTracks from "./topTracks";
import LibraryList from "./components/library";

export default async function Home() {

  const user_id = '12153643569'
  const token = 'BQAEVO_0MFQu2V7_qCCzkRv8aXVTTyNraru7NEk893PrAJK2Q6GV7-WuTRzlDYJ_QNCSNx23tcY0ZyRt3rBll-SWJyk5-DoXZDP07rp84U_A6NaidMqV_epSmEZslSMms_DCE9zXWXQ4dgLQbHacdJgeX66hU0SC-ZMTgkQWpS8H7EHXSxwJIJHR8TLCLWDWr3M';
  async function fetchWebApi(endpoint: string, method: string, body?: string) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body)
    });
    return await res.json();
  }

  async function getUser() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
      'v1/me', 'GET'
    ));
  }

  async function getLibraries() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
      `v1/users/${user_id}/playlists`, 'GET'
    )).items;
  }

  async function getTopTracks() {
    console.log('inside')
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
      'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
    ));
  }

  const libraries = await getLibraries()
  console.log({ libraries })
  // const topTracks = await getTopTracks();
  // console.log(
  //   topTracks?.map(
  //     ({ name, artists }: { name: string[], artists: string[] }) =>
  //       `${name} by ${artists.map(artist => artist.name).join(', ')}`
  //   )
  // );

  const user = await getUser();
  console.log(user.display_name)

  return (
    <main className="flex min-h-screen flex-row justify-between w-full bg-background gap-2 p-2">
      <Dashboard libraries={libraries} />
      {/* <TopTracks topTracks={topTracks} /> */}
      <span>{user.display_name}</span>
    </main>
  );
}
