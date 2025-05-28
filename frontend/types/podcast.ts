export interface Podcast {
  collectionId: number
  collectionName: string
  artistName: string
  artworkUrl100: string
  feedUrl: string
  genres: string
  primaryGenreName: string
  description: string
  releaseDate: string
  artistViewUrl: string
  collectionViewUrl: string
  createdAt: string
  artworkUrl600?: string
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

export interface Genre {
  name: string
  color: string
}

export interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active?: boolean
} 