export default function isCurrentlyPlaying(
  currentTrackUri: string | null | undefined,
  contextUri: string,
) {
  if (currentTrackUri === contextUri) {
    return true;
  }
  return false;
}
