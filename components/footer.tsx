"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, MessageCircle, Github, ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-background border-t border-border/50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-700/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-700/10 to-purple-700/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-2xl font-bold text-foreground">Xontra</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The future of AI-powered decentralized trading. One prompt, infinite on-chain power.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Platform</h3>
            <div className="space-y-3">
              {[
                { name: "Beta App", href: "/beta" },
                { name: "Staking", href: "/staking" },
                { name: "Waitlist", href: "/waitlist" },
                { name: "Documentation", href: "/" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Community</h3>
            <div className="space-y-3">
              {[
                { name: "Discord", href: "/community" },
                { name: "Twitter/X", href: "/community" },
                { name: "Blog", href: "/community" },
                { name: "Support", href: "/community" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest updates on Xontra development and AI trading insights.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-background/50 border-border/50 focus:border-primary"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-purple-600 hover:opacity-90 text-white px-4">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">No spam, unsubscribe anytime.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">© 2025 Xontra. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
