import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, Target, Zap, AlertTriangle } from "lucide-react"

export function PredictiveMarkets() {
  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-purple-900/50 border-purple-700/30 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-700 to-purple-500 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">AI Market Intelligence</h2>
                <p className="text-purple-200">Advanced predictive analytics powered by machine learning</p>
              </div>
            </div>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
              <Zap className="w-3 h-3 mr-1" />
              Live Analysis
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">BTC Prediction</CardTitle>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Bullish</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">$45,200</p>
              <p className="text-slate-400 text-sm">24h Target</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Confidence</span>
                <span className="text-purple-400">87%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Timeframe</span>
                <span className="text-white">24 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Risk Level</span>
                <span className="text-purple-400">Medium</span>
              </div>
            </div>
            <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/50">
              View Analysis
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">SOMI Prediction</CardTitle>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">Neutral</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">$2,720</p>
              <p className="text-slate-400 text-sm">24h Target</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Confidence</span>
                <span className="text-purple-400">72%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Timeframe</span>
                <span className="text-white">24 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Risk Level</span>
                <span className="text-purple-400">Low</span>
              </div>
            </div>
            <Button className="w-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/50">
              View Analysis
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-red-500/20 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-lg">SOL Prediction</CardTitle>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50">Bearish</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-400">$92.50</p>
              <p className="text-slate-400 text-sm">24h Target</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Confidence</span>
                <span className="text-red-400">79%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Timeframe</span>
                <span className="text-white">24 hours</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Risk Level</span>
                <span className="text-red-400">High</span>
              </div>
            </div>
            <Button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50">
              View Analysis
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Market Signals */}
      <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            AI Market Signals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                signal: "Strong Buy Signal",
                asset: "BTC/USDT",
                strength: "High",
                time: "2 min ago",
                type: "buy",
                description: "RSI oversold + volume spike detected",
              },
              {
                signal: "Resistance Alert",
                asset: "SOMI/USDT",
                strength: "Medium",
                time: "5 min ago",
                type: "warning",
                description: "Approaching key resistance at $2,700",
              },
              {
                signal: "Trend Reversal",
                asset: "SOL/USDT",
                strength: "High",
                time: "8 min ago",
                type: "sell",
                description: "Bearish divergence confirmed",
              },
              {
                signal: "Volume Anomaly",
                asset: "AVAX/USDT",
                strength: "Low",
                time: "12 min ago",
                type: "info",
                description: "Unusual trading volume detected",
              },
            ].map((signal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-950/30 rounded-lg border border-purple-700/10"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      signal.type === "buy"
                        ? "bg-purple-400"
                        : signal.type === "sell"
                          ? "bg-red-400"
                          : signal.type === "warning"
                            ? "bg-purple-400"
                            : "bg-purple-400"
                    } animate-pulse`}
                  />
                  <div>
                    <p className="text-white font-medium">{signal.signal}</p>
                    <p className="text-slate-400 text-sm">{signal.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-purple-600 font-medium">{signal.asset}</p>
                  <p className="text-slate-400 text-sm">{signal.time}</p>
                </div>
                <Badge
                  className={`${
                    signal.strength === "High"
                      ? "bg-red-500/20 text-red-400 border-red-500/50"
                      : signal.strength === "Medium"
                        ? "bg-purple-500/20 text-purple-400 border-purple-500/50"
                        : "bg-purple-500/20 text-purple-400 border-purple-500/50"
                  }`}
                >
                  {signal.strength}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Strategy Recommendations */}
      <Card className="bg-slate-900/50 border-purple-700/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Strategy Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Optimal Entry Points</h3>
              <div className="space-y-3">
                {[
                  { asset: "BTC", price: "$42,800", confidence: "92%", action: "Long" },
                  { asset: "SOMI", price: "$2,650", confidence: "85%", action: "Long" },
                  { asset: "SOL", price: "$95.20", confidence: "78%", action: "Short" },
                ].map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-950/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-700 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {entry.asset[0]}
                      </div>
                      <div>
                        <p className="text-white font-medium">{entry.asset}</p>
                        <p className="text-slate-400 text-sm">{entry.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          entry.action === "Long"
                            ? "bg-purple-500/20 text-purple-400 border-purple-500/50"
                            : "bg-red-500/20 text-red-400 border-red-500/50"
                        }`}
                      >
                        {entry.action}
                      </Badge>
                      <p className="text-purple-600 text-sm mt-1">{entry.confidence}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Risk Management</h3>
              <div className="space-y-3">
                <div className="p-3 bg-slate-950/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-medium">Portfolio Risk</span>
                  </div>
                  <p className="text-slate-400 text-sm">Current exposure: Medium</p>
                  <p className="text-purple-400 text-sm">Recommended: Reduce by 15%</p>
                </div>

                <div className="p-3 bg-slate-950/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-medium">Stop Loss</span>
                  </div>
                  <p className="text-slate-400 text-sm">Optimal placement: -8%</p>
                  <p className="text-purple-400 text-sm">Take profit: +12%</p>
                </div>

                <div className="p-3 bg-slate-950/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-600" />
                    <span className="text-white font-medium">Market Sentiment</span>
                  </div>
                  <p className="text-slate-400 text-sm">Overall: Cautiously Bullish</p>
                  <p className="text-purple-600 text-sm">Confidence: 76%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
