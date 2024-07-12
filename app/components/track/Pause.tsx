
import { useContext } from "react"
import { DeviceContext } from "../../context/appContext"
import { pausePlayback } from "../../api/spotify/spotify-api"

export default function PauseTrackButton({ token }: { token: string }) {
  const { deviceId } = useContext(DeviceContext)

  const handlePauseTrack = () => {
    deviceId && pausePlayback(token, deviceId)
  }

  return (
    <div onClick={handlePauseTrack}>
      <img src="/icons/track/pause.svg" alt="Pause" />
    </div>
  )
}
