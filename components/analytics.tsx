import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, DollarSign, Activity, Target } from "lucide-react"

export function Analytics() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Volume</p>
                <p className="text-2xl font-bold text-white">$2.4B</p>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 mt-2">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5%
                </Badge>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Traders</p>
                <p className="text-2xl font-bold text-white">45.2K</p>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 mt-2">
                  <Activity className="w-3 h-3 mr-1" />
                  +8.3%
                </Badge>
              </div>
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">TVL</p>
                <p className="text-2xl font-bold text-white">$847M</p>
                <Badge className="bg-purple-700/20 text-purple-600 border-purple-700/50 mt-2">
                  <DollarSign className="w-3 h-3 mr-1" />
                  +15.7%
                </Badge>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-white">94.2%</p>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50 mt-2">
                  <Target className="w-3 h-3 mr-1" />
                  Optimal
                </Badge>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Volume Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-950/50 rounded-lg border border-purple-700/20 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <p className="text-slate-400">Volume Distribution Chart</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-950/50 rounded-lg border border-purple-700/20 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-slate-400">Performance Analytics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { symbol: "BTC", name: "Bitcoin", change: "+5.67%", volume: "$1.2B", price: "$43,247" },
              { symbol: "SOMI", name: "Somnia", change: "+3.45%", volume: "$890M", price: "$2,678" },
              { symbol: "SOL", name: "Solana", change: "+8.91%", volume: "$234M", price: "$98.45" },
              { symbol: "AVAX", name: "Avalanche", change: "+2.34%", volume: "$156M", price: "$34.67" },
            ].map((asset, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-950/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {asset.symbol[0]}
                  </div>
                  <div>
                    <p className="text-white font-medium">{asset.name}</p>
                    <p className="text-slate-400 text-sm">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-mono">{asset.price}</p>
                  <p className="text-purple-400 text-sm">{asset.change}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-300 text-sm">Volume</p>
                  <p className="text-purple-600 text-sm font-mono">{asset.volume}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
