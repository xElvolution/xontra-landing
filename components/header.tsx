import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Bell, User, Wifi } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-purple-700/20 bg-slate-950/50 backdrop-blur-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10">
            <Wifi className="w-3 h-3 mr-1" />
            Connected
          </Badge>
          <div className="text-sm text-slate-400">
            Network: <span className="text-purple-600">Somnia</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-sm">
            <div className="text-slate-300">Balance</div>
            <div className="text-purple-600 font-mono">$12,847.32</div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="border-purple-700/50 text-purple-600 hover:bg-purple-700/10 bg-transparent"
          >
            <Bell className="w-4 h-4 mr-2" />
            Alerts
          </Button>

          <Button className="bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>

          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
