"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Moon, Sun } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Beta", href: "/beta" },
  { name: "Waitlist", href: "/waitlist" },
  { name: "Docs", href: "https://docs.xontra.xyz", external: true },
  { name: "Community", href: "/community" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Xontra Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold text-foreground">Xontra</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                >
                  {item.name}
                </Link>
              ),
            )}
          </div>

          {/* Desktop CTA and Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 h-9 p-0">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link href="https://app.xontra.xyz" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:opacity-90 text-white">
                Beta App
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-xl border-border/50">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Image
                    src="/logo.png"
                    alt="Xontra Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <span className="text-xl font-bold text-foreground">Xontra</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-col gap-6">
                {navigation.map((item) =>
                  item.external ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary text-muted-foreground"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary text-muted-foreground"
                    >
                      {item.name}
                    </Link>
                  ),
                )}

                <div className="flex flex-col gap-3 pt-6 border-t border-border/50">
                  <Button variant="outline" onClick={toggleTheme} className="w-full justify-start gap-2 bg-transparent">
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-4 h-4" />
                        Switch to Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4" />
                        Switch to Dark Mode
                      </>
                    )}
                  </Button>
                  <Link href="https://app.xontra.xyz" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 via-purple-600 to-purple-700 hover:opacity-90 text-white">
                      Beta App
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
