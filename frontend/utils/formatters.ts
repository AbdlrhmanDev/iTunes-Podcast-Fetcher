export const formatDuration = (milliseconds: number): string => {
  const minutes = Math.floor(milliseconds / 60000)
  return `${minutes}m`
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export const transformPodcastData = (podcast: any) => ({
  ...podcast,
  artworkUrl600: podcast.artworkUrl100.replace('100x100', '600x600'),
  trackCount: Math.floor(Math.random() * 200) + 50,
  artistViewUrl: podcast.artistViewUrl || `https://podcasts.apple.com/search?term=${encodeURIComponent(podcast.artistName)}`,
  collectionViewUrl: podcast.collectionViewUrl || `https://podcasts.apple.com/podcast/id${podcast.collectionId}`
}) 