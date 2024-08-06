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
      <div>
        <ResumePausePlaybackButton
          token={token}
          pagePlaylistURI={playlistUri}
        />
      </div>
      {/* <div>Right</div> */}
    </div>
  );
}
