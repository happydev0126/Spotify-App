"use client";

import ResumePausePlaybackButton from "./track/ResumePausePlaybackButton";

export default function ListTopBar({
  playlistUri,
  token,
}: {
  playlistUri: string;
  token: string;
}) {
  return (
    <div className="flex justify-between items-center py-4">
      <ResumePausePlaybackButton
        token={token}
        pagePlaylistURI={playlistUri}
        variant="GREEN"
      />
    </div>
  );
}
