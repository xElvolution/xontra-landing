import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const recentTrades = [
  { price: 43247.82, amount: 0.234, time: "14:32:15", type: "buy" },
  { price: 43245.67, amount: 0.156, time: "14:32:12", type: "sell" },
  { price: 43248.91, amount: 0.089, time: "14:32:08", type: "buy" },
  { price: 43244.23, amount: 0.345, time: "14:32:05", type: "sell" },
  { price: 43249.56, amount: 0.123, time: "14:32:01", type: "buy" },
  { price: 43243.78, amount: 0.267, time: "14:31:58", type: "sell" },
  { price: 43250.12, amount: 0.198, time: "14:31:55", type: "buy" },
]

export function RecentTrades() {
  return (
    <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Recent Trades
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {/* Headers */}
          <div className="grid grid-cols-4 gap-4 text-xs text-slate-400 font-medium">
            <div>Price (USDT)</div>
            <div className="text-right">Amount (BTC)</div>
            <div className="text-right">Time</div>
            <div className="text-right">Type</div>
          </div>

          {/* Trades */}
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {recentTrades.map((trade, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 text-xs hover:bg-slate-800/30 p-2 rounded">
                <div className={`font-mono ${trade.type === "buy" ? "text-purple-400" : "text-red-400"}`}>
                  {trade.price.toFixed(2)}
                </div>
                <div className="text-slate-300 text-right font-mono">{trade.amount.toFixed(3)}</div>
                <div className="text-slate-400 text-right font-mono">{trade.time}</div>
                <div className="text-right">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      trade.type === "buy"
                        ? "border-purple-500/50 text-purple-400 bg-purple-500/10"
                        : "border-red-500/50 text-red-400 bg-red-500/10"
                    }`}
                  >
                    {trade.type.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
