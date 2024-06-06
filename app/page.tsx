import Dashboard from "./components/dashboard";
import TopTracks from "./topTracks";

export default async function Home() {


  const token = 'BQCLu3WZZEzS8lV-wPp0rnvRIjwRjstq-g_M0g_r-7sqOqB0KLVDgecK8VOS18BzmnQGVcrR1tHQa_RrpQvqUUwgg_VjxcUfjhBZw7B8diddcxstc_nDjUkPPGTf09strwYcGHdldj6NLVxpkXVf3lu5rkYL-VU6V6uzsP2Ed36uoJ3_AES2xsfx2nLtsMyCfZiuYscLZcj36Lewe4XkVX-gYmRmhWWw9yk7u_bN0z9N_CEBEduWW2D86SYXRa_Bkl8uXQ';
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

  async function getTopTracks() {
    // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
    return (await fetchWebApi(
      'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
    )).items;
  }

  const topTracks = await getTopTracks();
  console.log(
    topTracks?.map(
      ({ name, artists }: { name: string[], artists: string[] }) =>
        `${name} by ${artists.map(artist => artist.name).join(', ')}`
    )
  );

  return (
    <main className="flex min-h-screen flex-row justify-between w-full bg-background gap-2 p-2">
      <Dashboard />
      <TopTracks topTracks={topTracks} />
    </main>
  );
}
