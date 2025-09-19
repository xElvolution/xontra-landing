"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, ExternalLink } from "lucide-react"

const wallets = [
  {
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using browser extension",
    connector: "metamask",
  },
  {
    name: "Coinbase Wallet",
    icon: "🔵",
    description: "Connect using Coinbase Wallet",
    connector: "coinbase",
  },
  {
    name: "WalletConnect",
    icon: "🔗",
    description: "Connect using WalletConnect",
    connector: "walletconnect",
  },
  {
    name: "Rabby Wallet",
    icon: "🐰",
    description: "Connect using Rabby Wallet",
    connector: "rabby",
  },
  {
    name: "OKX Wallet",
    icon: "⭕",
    description: "Connect using OKX Wallet",
    connector: "okx",
  },
  {
    name: "Trust Wallet",
    icon: "🛡️",
    description: "Connect using Trust Wallet",
    connector: "trust",
  },
]

export function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null)

  const handleConnect = async (connector: string, walletName: string) => {
    setIsConnecting(connector)

    try {
      // Simulate connection process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Here you would implement actual wallet connection logic
      console.log(`Connecting to ${connector}...`)

      setIsConnected(true)
      setConnectedWallet(walletName)
      setIsOpen(false)
    } catch (error) {
      console.error("Connection failed:", error)
    } finally {
      setIsConnecting(null)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setConnectedWallet(null)
  }

  if (isConnected && connectedWallet) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="bg-transparent border-border/50 hover:bg-background/50">
          Somnia
        </Button>
        <Button
          onClick={handleDisconnect}
          className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:opacity-90 text-white rounded-full px-6"
        >
          {connectedWallet} Connected
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:opacity-90 text-white rounded-full px-6">
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-foreground">Connect Wallet</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your preferred wallet to connect to Xontra
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 mt-4">
          {wallets.map((wallet) => (
            <Card
              key={wallet.name}
              className="group cursor-pointer bg-background/50 border-border/50 hover:bg-background/80 hover:border-primary/30 transition-all duration-200"
              onClick={() => handleConnect(wallet.connector, wallet.name)}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="text-2xl">{wallet.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {wallet.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{wallet.description}</p>
                </div>
                {isConnecting === wallet.connector ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            By connecting a wallet, you agree to Xontra's{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
