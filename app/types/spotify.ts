export type SearchType = "album" | "artist" | "playlist" | "track" | "show" | "episode" | "audiobook"

export interface CurrentUser {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
  followers: Followers;
  country: string;
  product: string;
  explicit_content: ExplicitContent;
  email: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}


export interface RecentlyPlayed {
  href: string;
  limit: number;
  next: string;
  cursors: Cursors;
  total: number;
  items: Item[];
}

export interface Cursors {
  after: string;
  before: string;
}

export interface Item {
  added_at: string;
  added_by: Owner;
  is_local: boolean;
  track: Track;
}

export interface Context {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Track {
  album: Album;
  artists: TrackArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: LinkedFrom;
  restrictions: Restrictions;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  artists: AlbumArtist[];
}

type AlbumTracks = Omit<Tracks, 'items'>

export interface AlbumFull extends Album {
  tracks: AlbumTracks & {
    items: Track[]
  }
  copyright: {
    text: string
    type: string
  }
  external_ids: ExternalIDS
  genres: string[]
  label: string
  popularity: number
}

export interface AlbumArtist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions {
  reason: string;
}

export interface TrackArtist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface ExternalIDS {
  isrc: string;
  ean: string;
  upc: string;
}

export interface LinkedFrom {
}

export interface CurrentUserItems {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: CurrentUserItem[];
}

export interface CurrentUserItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface Owner {
  external_urls: ExternalUrls;
  followers: Tracks;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item[]
}


export interface User {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ArtistAlbums extends Omit<CurrentUserArtist, 'items'> {
  items: Album[]
}

export interface UsersAlbums extends Omit<CurrentUserArtist, 'items'> {
  items: [
    {
      added_at: string;
      album: AlbumFull;
    }
  ]
}

export interface CurrentUserArtist {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Artist[];
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks;
  type: string;
  uri: string;
}

export interface FeaturedPlaylist {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Playlist[];
}

export interface FeaturedPlaylists {
  message: string;
  playlists: FeaturedPlaylist
}
