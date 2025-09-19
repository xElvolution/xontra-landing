import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Activity } from "lucide-react"

export function TradingChart() {
  return (
    <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                B
              </div>
              BTC/USDT
            </CardTitle>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.34%
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-purple-700/50 text-purple-600 bg-transparent">
              1H
            </Button>
            <Button variant="outline" size="sm" className="border-purple-700/50 text-purple-600 bg-purple-700/10">
              4H
            </Button>
            <Button variant="outline" size="sm" className="border-purple-700/50 text-purple-600 bg-transparent">
              1D
            </Button>
            <Button variant="outline" size="sm" className="border-purple-700/50 text-purple-600 bg-transparent">
              1W
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <div>
            <span className="text-slate-400">Price: </span>
            <span className="text-white font-mono text-lg">$43,247.82</span>
          </div>
          <div>
            <span className="text-slate-400">24h High: </span>
            <span className="text-purple-400 font-mono">$43,891.23</span>
          </div>
          <div>
            <span className="text-slate-400">24h Low: </span>
            <span className="text-red-400 font-mono">$42,156.78</span>
          </div>
          <div>
            <span className="text-slate-400">Volume: </span>
            <span className="text-purple-600 font-mono">1.2M BTC</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-96 bg-slate-950/50 rounded-lg border border-purple-700/20 flex items-center justify-center relative overflow-hidden">
          {/* Simulated Chart Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full bg-gradient-to-t from-purple-700/20 via-transparent to-transparent"></div>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
              <path
                d="M0,150 Q50,120 100,130 T200,110 T300,90 T400,85"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="text-center z-10">
            <Activity className="w-12 h-12 text-purple-600 mx-auto mb-4 animate-pulse" />
            <p className="text-slate-400">Advanced Trading Chart</p>
            <p className="text-xs text-slate-500 mt-2">Real-time market data visualization</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
