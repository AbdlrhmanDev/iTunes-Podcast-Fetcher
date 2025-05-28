"use client"

import { useState } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { usePodcasts } from "@/hooks/usePodcasts"
import { GENRES } from "@/constants/podcast"
import { formatDate, formatDuration } from "@/utils/formatters"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MoreHorizontal, Play } from "lucide-react"
import Image from "next/image"

export default function PodcastDiscovery() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {
    searchTerm,
    setSearchTerm,
    trendingPodcasts,
    trendingEpisodes,
    searchResults,
    loading,
    searchLoading,
    connectionError,
    handleSearch,
  } = usePodcasts()

  const recentPodcasts = trendingPodcasts.slice(0, 5)

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        recentPodcasts={recentPodcasts}
      />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value)
            handleSearch(value)
          }}
        />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            {/* Connection Status */}
            {connectionError && (
              <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-700 rounded-lg">
                <p className="text-yellow-200 text-sm">⚠️ {connectionError}</p>
              </div>
            )}

            {/* Search Results */}
            {searchTerm && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Search Results</h2>
                {searchLoading ? (
                  <div className="text-slate-400">Searching...</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((podcast) => (
                      <a
                        key={podcast.collectionId}
                        href={podcast.collectionViewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <Image
                                src={podcast.artworkUrl100 || "/placeholder.svg?height=60&width=60"}
                                alt={podcast.collectionName}
                                width={60}
                                height={60}
                                className="rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-white truncate">{podcast.collectionName}</h3>
                                <p className="text-sm text-slate-400 truncate">{podcast.artistName}</p>
                                <Badge variant="secondary" className="mt-1 text-xs">
                                  {podcast.primaryGenreName}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    ))}
                    {searchResults.length === 0 && !searchLoading && (
                      <div className="text-slate-400 col-span-full text-center py-8">
                        No podcasts found for "{searchTerm}"
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* Trending Podcasts */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Trending podcasts in all genres</h2>
                  <p className="text-sm text-slate-400">
                    The most popular podcasts right now. Last updated 24 minutes ago
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {loading ? (
                <div className="text-slate-400">Loading trending podcasts...</div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {trendingPodcasts.map((podcast, index) => (
                    <a
                      key={podcast.collectionId}
                      href={podcast.collectionViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-48"
                    >
                      <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
                        <CardContent className="p-0">
                          <div className="relative">
                            <Image
                              src={podcast.artworkUrl600 || podcast.artworkUrl100.replace('100x100', '600x600')}
                              alt={podcast.collectionName}
                              width={192}
                              height={192}
                              className="w-full aspect-square object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              #{index + 1}
                            </div>
                            <Button
                              size="icon"
                              className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 rounded-full w-8 h-8"
                            >
                              <Play className="w-4 h-4 fill-current" />
                            </Button>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-white text-sm truncate">{podcast.collectionName}</h3>
                            <p className="text-xs text-slate-400 truncate">{podcast.artistName}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              )}
            </section>

            {/* Browse by Genre */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Browse by genre</h2>
                  <p className="text-sm text-slate-400">
                    The most popular podcasts and episodes now categorized by genre. Last updated 24 minutes ago
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-9 gap-4">
                {GENRES.map((genre) => (
                  <Card
                    key={genre.name}
                    className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-0">
                      <div className={`${genre.color} h-24 rounded-t-lg relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="grid grid-cols-2 gap-1">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="w-6 h-6 bg-white/20 rounded-sm"></div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-white text-sm">{genre.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Promoted Podcasts */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Promoted Podcasts</h2>
                  <p className="text-sm text-slate-400">
                    These podcasts are promoted by podcasters, listeners, and the Podchaser team.{" "}
                    <span className="text-blue-400 cursor-pointer">Promote yours here.</span>
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {Array.from({ length: 16 }, (_, i) => (
                  <Card
                    key={i}
                    className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-3 text-center">
                      <div className="w-full aspect-square bg-slate-700 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-xs text-slate-500">Your Podcast Here</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Trending Episodes */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Trending episodes in all genres</h2>
                  <p className="text-sm text-slate-400">
                    The most popular podcast episodes overall now. Last updated 24 minutes ago
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-400">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {trendingEpisodes.map((episode, index) => (
                  <Card
                    key={episode.trackId}
                    className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Image
                          src={episode.artworkUrl100 || "/placeholder.svg?height=60&width=60"}
                          alt={episode.collectionName}
                          width={60}
                          height={60}
                          className="rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white text-sm line-clamp-2 mb-1">{episode.trackName}</h3>
                          <p className="text-xs text-slate-400 mb-1">{episode.collectionName}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>#{index + 1}</span>
                            <span>{formatDate(episode.releaseDate)}</span>
                            <span>{formatDuration(episode.trackTimeMillis)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
