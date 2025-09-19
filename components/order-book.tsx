import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen } from "lucide-react"

const buyOrders = [
  { price: 43240.12, amount: 0.234, total: 10118.23 },
  { price: 43235.45, amount: 0.156, total: 6744.73 },
  { price: 43230.78, amount: 0.089, total: 3847.54 },
  { price: 43225.91, amount: 0.345, total: 14912.94 },
  { price: 43220.34, amount: 0.123, total: 5316.1 },
]

const sellOrders = [
  { price: 43252.67, amount: 0.187, total: 8088.25 },
  { price: 43257.23, amount: 0.298, total: 12890.65 },
  { price: 43261.89, amount: 0.145, total: 6272.97 },
  { price: 43266.45, amount: 0.234, total: 10124.35 },
  { price: 43271.12, amount: 0.167, total: 7222.28 },
]

export function OrderBook() {
  return (
    <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-600" />
          Order Book
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Headers */}
        <div className="grid grid-cols-3 gap-2 text-xs text-slate-400 font-medium">
          <div>Price (USDT)</div>
          <div className="text-right">Amount (BTC)</div>
          <div className="text-right">Total</div>
        </div>

        {/* Sell Orders */}
        <div className="space-y-1">
          {sellOrders.reverse().map((order, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 text-xs hover:bg-red-500/5 p-1 rounded">
              <div className="text-red-400 font-mono">{order.price.toFixed(2)}</div>
              <div className="text-slate-300 text-right font-mono">{order.amount.toFixed(3)}</div>
              <div className="text-slate-400 text-right font-mono">{order.total.toFixed(0)}</div>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="flex items-center justify-center py-2 border-y border-purple-700/20">
          <Badge className="bg-purple-700/20 text-purple-600 border-purple-700/50 font-mono">43,247.82 USDT</Badge>
        </div>

        {/* Buy Orders */}
        <div className="space-y-1">
          {buyOrders.map((order, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 text-xs hover:bg-purple-500/5 p-1 rounded">
              <div className="text-purple-400 font-mono">{order.price.toFixed(2)}</div>
              <div className="text-slate-300 text-right font-mono">{order.amount.toFixed(3)}</div>
              <div className="text-slate-400 text-right font-mono">{order.total.toFixed(0)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
