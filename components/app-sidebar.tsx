"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { TrendingUp, BarChart3, Brain, Wallet, Settings, Zap } from "lucide-react"

const menuItems = [
  { title: "Trading", icon: TrendingUp, id: "trading" },
  { title: "Analytics", icon: BarChart3, id: "analytics" },
  { title: "AI Predictions", icon: Brain, id: "predictive" },
  { title: "Portfolio", icon: Wallet, id: "portfolio" },
  { title: "Settings", icon: Settings, id: "settings" },
]

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-purple-700/20 bg-slate-950/50 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-700 to-purple-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              Xontra
            </h1>
            <p className="text-xs text-slate-400">Next-Gen DEX</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.id)}
                    isActive={activeView === item.id}
                    className="w-full justify-start gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-purple-700/10 data-[active=true]:bg-gradient-to-r data-[active=true]:from-purple-700/20 data-[active=true]:to-purple-500/20 data-[active=true]:text-white data-[active=true]:border-r-2 data-[active=true]:border-purple-600"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-slate-500 text-center">Powered by AI & Blockchain</div>
      </SidebarFooter>
    </Sidebar>
  )
}
