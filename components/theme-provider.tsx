"use client"

import * as React from "react"

type ThemeProviderProps = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light")
    root.classList.add("dark")
  }, [])

  return <>{children}</>
}
