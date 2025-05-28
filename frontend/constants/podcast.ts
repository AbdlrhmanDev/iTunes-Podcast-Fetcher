import { Genre, SidebarItem } from "@/types/podcast"
import { Home, Compass, Library, Heart, Clock } from "lucide-react"

export const GENRES: Genre[] = [
  { name: "All genres", color: "bg-gradient-to-br from-purple-500 to-pink-500" },
  { name: "Arts", color: "bg-gradient-to-br from-red-500 to-orange-500" },
  { name: "Comedy", color: "bg-gradient-to-br from-yellow-500 to-orange-500" },
  { name: "Education", color: "bg-gradient-to-br from-green-500 to-blue-500" },
  { name: "Kids & Family", color: "bg-gradient-to-br from-orange-500 to-red-500" },
  { name: "TV & Film", color: "bg-gradient-to-br from-teal-500 to-cyan-500" },
  { name: "Music", color: "bg-gradient-to-br from-blue-500 to-purple-500" },
  { name: "Religion & Spirituality", color: "bg-gradient-to-br from-purple-500 to-indigo-500" },
  { name: "Technology", color: "bg-gradient-to-br from-red-500 to-pink-500" },
]

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { icon: Home, label: "Home", active: true },
  { icon: Compass, label: "Discover", active: false },
]

export const USER_STUFF_ITEMS: SidebarItem[] = [
  { icon: Library, label: "My Queue", active: false },
  { icon: Heart, label: "My Podcasts", active: false },
  { icon: Clock, label: "Recents", active: false },
]

export const API_BASE_URL = "http://localhost:3002" 