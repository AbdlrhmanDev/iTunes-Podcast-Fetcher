import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight, LogIn, UserPlus, Menu, MoreHorizontal } from "lucide-react"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  searchTerm: string
  onSearchChange: (value: string) => void
}

export const Header = ({ sidebarOpen, setSidebarOpen, searchTerm, onSearchChange }: HeaderProps) => {
  return (
    <header className="border-b border-slate-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-400"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </Button>
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search through over 70 million podcasts and episodes..."
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
            <LogIn className="w-4 h-4 mr-2" />
            Log in
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Sign up
          </Button>
          <Button variant="ghost" size="icon" className="text-slate-400">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
} 