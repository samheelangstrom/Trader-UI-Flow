"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Home,
  BarChart2,
  Settings,
  Bell,
  Activity,
  Users,
  Calendar,
  Search,
  DollarSign,
  ClipboardList,
} from "lucide-react"

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("global-configuration")

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
    { id: "fixtures", label: "Fixtures", icon: Calendar, href: "/fixtures" },
    { id: "game", label: "Game", icon: Activity, href: "/game" },
    { id: "alerts", label: "Alerts", icon: Bell, href: "/alerts" },
    { id: "margins", label: "Margins", icon: DollarSign, href: "/margins" },
    { id: "reports", label: "Reports", icon: BarChart2, href: "/reports" },
    { id: "global-configuration", label: "Global Configuration", icon: Settings, href: "/global-configuration" },
    { id: "users", label: "Users", icon: Users, href: "/users" },
    { id: "audit", label: "Audit Log", icon: ClipboardList, href: "/audit" },
  ]

  return (
    <div className="w-64 bg-white h-screen flex-shrink-0 border-r border-[#dcdddf]">
      <div className="p-4 border-b border-[#dcdddf] flex items-center">
        <div className="w-8 h-8 bg-[#eb6a2e] rounded-md flex items-center justify-center text-white font-bold mr-3">
          SB
        </div>
        <div className="font-bold text-lg">Sports Betting</div>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5f6368]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border border-[#dcdddf] rounded-md text-sm"
          />
        </div>
      </div>

      <div className="py-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={`flex items-center px-4 py-3 text-sm ${
              activeItem === item.id
                ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                : "text-[#5f6368] hover:bg-[#f9f9f9]"
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            <item.icon className={`h-5 w-5 mr-3 ${activeItem === item.id ? "text-[#eb6a2e]" : "text-[#5f6368]"}`} />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
