
export default async function TopTracks({ topTracks }) {

  return (
    <div className="flex flex-col">
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
    </div >
  )
}
