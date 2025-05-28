import { useState, useEffect } from "react"
import { Podcast, Episode } from "@/types/podcast"
import { API_BASE_URL } from "@/constants/podcast"
import { transformPodcastData } from "@/utils/formatters"

export const usePodcasts = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [trendingPodcasts, setTrendingPodcasts] = useState<Podcast[]>([])
  const [trendingEpisodes, setTrendingEpisodes] = useState<Episode[]>([])
  const [searchResults, setSearchResults] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const [backendConnected, setBackendConnected] = useState(false)
  const [connectionError, setConnectionError] = useState("")

  useEffect(() => {
    checkBackendConnection()
    fetchTrendingPodcasts()
    fetchTrendingEpisodes()
  }, [])

  const checkBackendConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        setBackendConnected(true)
        setConnectionError("")
      } else {
        throw new Error(`Backend responded with status: ${response.status}`)
      }
    } catch (error) {
      console.warn("Backend connection failed:", error)
      setBackendConnected(false)
      setConnectionError("Backend not available - using mock data")
    }
  }

  const fetchTrendingPodcasts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/trending`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.results && Array.isArray(data.results)) {
        const transformedPodcasts = data.results.map(transformPodcastData)
        setTrendingPodcasts(transformedPodcasts)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.warn("Error fetching trending podcasts:", error)
      setConnectionError("Failed to fetch trending podcasts - check if backend is running on localhost:3002")
    } finally {
      setLoading(false)
    }
  }

  const fetchTrendingEpisodes = async () => {
    try {
      // TODO: Implement actual API call for episodes
      setTrendingEpisodes([])
    } catch (error) {
      console.warn("Error fetching trending episodes:", error)
      setTrendingEpisodes([])
    }
  }

  const handleSearch = async (term: string) => {
    if (!term.trim()) {
      setSearchResults([])
      return
    }

    setSearchLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/search?term=${encodeURIComponent(term)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (data.results && Array.isArray(data.results)) {
        const transformedResults = data.results.map(transformPodcastData)
        setSearchResults(transformedResults)
      } else {
        setSearchResults([])
      }
    } catch (error) {
      console.warn("Error searching podcasts:", error)
      setSearchResults([])
    } finally {
      setSearchLoading(false)
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    trendingPodcasts,
    trendingEpisodes,
    searchResults,
    loading,
    searchLoading,
    backendConnected,
    connectionError,
    handleSearch,
  }
} 