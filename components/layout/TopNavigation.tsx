"use client"

import { useState } from "react"
import { Search, Bell, User, ChevronDown } from "lucide-react"

interface TopNavigationProps {
  activeTab?: string
}

export default function TopNavigation({ activeTab = "MLB" }: TopNavigationProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  const tabs = ["MLB", "NBA", "NFL", "NHL", "Soccer", "Tennis", "Golf", "MMA"]

  return (
    <div className="bg-white border-b border-[#dcdddf] px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Tabs */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-3 py-2 text-sm rounded-md ${
                  activeTab === tab
                    ? "bg-[#eb6a2e] bg-opacity-10 text-[#eb6a2e] font-medium"
                    : "text-[#5f6368] hover:bg-[#f9f9f9]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border border-[#dcdddf] rounded-md text-sm"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5f6368]" />
              </div>
            ) : (
              <button className="p-2 text-[#5f6368] hover:bg-[#f9f9f9] rounded-md" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 text-[#5f6368] hover:bg-[#f9f9f9] rounded-md relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#eb6a2e] rounded-full"></span>
          </button>

          {/* User */}
          <button className="flex items-center space-x-2 p-2 text-[#5f6368] hover:bg-[#f9f9f9] rounded-md">
            <div className="w-8 h-8 bg-[#f1f2f3] rounded-full flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">John Doe</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
