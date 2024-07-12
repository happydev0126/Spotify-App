
import { useContext } from "react"
import { DeviceContext, PlayerContext } from "../../context/appContext"
import { pausePlayback } from "../../api/spotify/spotify-api"

export default function PauseTrackButton({ token }: { token: string }) {
  const { deviceId } = useContext(DeviceContext)

  const handlePauseTrack = () => {
    if (deviceId) {
      pausePlayback(token, deviceId)
    }
  }

  return (
    <button className="" onClick={handlePauseTrack}>
      <img src="/icons/track/pause.svg" alt="Pause" />
    </button>
  )
}
