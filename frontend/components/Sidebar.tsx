import { Button } from "@/components/ui/button"
import { X, Settings } from "lucide-react"
import Image from "next/image"
import { Podcast } from "@/types/podcast"
import { SIDEBAR_ITEMS, USER_STUFF_ITEMS } from "@/constants/podcast"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  recentPodcasts: Podcast[]
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen, recentPodcasts }: SidebarProps) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold text-lg">Podchaser</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  item.active ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Your Stuff Section */}
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Your Stuff</h3>
            <nav className="space-y-1">
              {USER_STUFF_ITEMS.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          {/* Recently Played */}
          <div className="mt-8">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recently Played</h3>
            <div className="space-y-2">
              {recentPodcasts.map((podcast) => (
                <div
                  key={podcast.collectionId}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 cursor-pointer group"
                >
                  <Image
                    src={podcast.artworkUrl100 || "/placeholder.svg?height=40&width=40"}
                    alt={podcast.collectionName}
                    width={40}
                    height={40}
                    className="rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-cyan-400">
                      {podcast.collectionName}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{podcast.artistName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 border-t border-slate-800">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Settings className="w-4 h-4" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  )
} 