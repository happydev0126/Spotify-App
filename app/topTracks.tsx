import Card from "./components/card";

export default async function TopTracks({ topTracks }) {

  return (
    <Card>
      {topTracks.map((track) => (
        <div key={track.id} >
          {
            track.artists.map((artist) => (
              <span key={artist.name}>{artist.name}</span>
            ))
          }
        </div>
      ))
      }
    </Card >
  )
}
