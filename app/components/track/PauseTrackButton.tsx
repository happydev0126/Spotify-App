
import { MouseEvent, useContext } from "react"
import { DeviceContext } from "../../context/appContext"
import { pausePlayback } from "../../api/spotify/spotify-api"

type Variant = 'green'

export default function PauseTrackButton({ token, variant }: { token: string, variant: Variant }) {
  const { deviceId } = useContext(DeviceContext)

  const handlePauseTrack = (e: MouseEvent) => {
    e.preventDefault()
    if (deviceId) {
      pausePlayback(token, deviceId)
    }
  }

  return (
    <button className={variant === 'green' ? 'flex items-center justify-center w-8 h-8 absolute bg-green z-50 bottom-2 right-2 rounded-full text-black shadow' : ''} onClick={e => handlePauseTrack(e)}>
      <img src="/icons/track/pause.svg" alt="Pause" />
    </button>
  )
}
