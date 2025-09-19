import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Settings, Zap } from "lucide-react"

export function SwapInterface() {
  return (
    <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Instant Swap
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">From</label>
          <div className="relative">
            <Input
              placeholder="0.0"
              className="bg-slate-950/50 border-purple-700/30 text-white text-right pr-20 font-mono text-lg"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                B
              </div>
              <span className="text-white font-medium">BTC</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 text-right">Balance: 0.0234 BTC</div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button variant="ghost" size="sm" className="rounded-full border border-purple-700/30 hover:bg-purple-700/10">
            <ArrowUpDown className="w-4 h-4 text-purple-600" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="text-sm text-slate-400">To</label>
          <div className="relative">
            <Input
              placeholder="0.0"
              className="bg-slate-950/50 border-purple-700/30 text-white text-right pr-24 font-mono text-lg"
              readOnly
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                U
              </div>
              <span className="text-white font-medium">USDT</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 text-right">Balance: 12,847.32 USDT</div>
        </div>

        {/* Swap Details */}
        <div className="space-y-2 p-3 bg-slate-950/30 rounded-lg border border-purple-700/20">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Rate</span>
            <span className="text-white font-mono">1 BTC = 43,247.82 USDT</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Slippage</span>
            <span className="text-purple-600">0.5%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Network Fee</span>
            <span className="text-slate-300">~$12.34</span>
          </div>
        </div>

        <Button className="w-full bg-gradient-to-r from-purple-700 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-medium">
          Swap Tokens
        </Button>
      </CardContent>
    </Card>
  )
}
