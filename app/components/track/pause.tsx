
import { useContext } from "react"
import { DeviceContext } from "../../context/appContext"
import { pausePlayback } from "../../api/spotify/spotify-api"

export default function PauseTrackButton({ token }: { token: string }) {
  const { deviceId } = useContext(DeviceContext)

  const handlePauseTrack = () => {
    deviceId && pausePlayback(token, deviceId)
  }

  return (
    <svg onClick={handlePauseTrack} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M8 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H8Zm7 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1Z" clipRule="evenodd" />
    </svg>
  )
}