export interface Podcast {
  collectionId: number
  collectionName: string
  artistName: string
  artworkUrl100: string
  artworkUrl600?: string
  feedUrl: string
  genres: string
  primaryGenreName: string
  description: string
  releaseDate: string
  trackCount?: number
}

export interface Episode {
  trackId: number
  trackName: string
  description: string
  releaseDate: string
  trackTimeMillis: number
  collectionName: string
  artistName: string
  artworkUrl100: string
} 