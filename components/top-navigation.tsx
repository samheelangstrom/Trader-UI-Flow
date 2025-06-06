"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Bell, ChevronDown, Search, Moon, User, Sun } from "lucide-react"

// Make sure dark mode works with Tailwind
if (typeof window !== "undefined") {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

interface TopNavigationProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  showSearch?: boolean
  showUserControls?: boolean
}

export default function TopNavigation({
  activeTab,
  onTabChange,
  showSearch = true,
  showUserControls = true,
}: TopNavigationProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    // Check if there's a saved theme preference in localStorage
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Set theme based on saved preference or system preference
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme)
    } else if (prefersDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Add this after the existing useEffect
  useEffect(() => {
    // Listen for storage events to update the UI when theme changes
    const handleStorageChange = () => {
      // Force re-render
      setIsSettingsOpen(isSettingsOpen)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [isSettingsOpen])

  return (
    <>
      <div className="flex items-center justify-between border-b border-[#dcdddf] px-4 py-3 bg-white">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 bg-[#eb6a2e] rounded-full text-white font-bold"
          >
            A
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative font-medium cursor-pointer">
              <Link href="#" className={`${activeTab === "MLB" ? "text-[#eb6a2e]" : ""}`}>
                MLB
              </Link>
              <div className="absolute -top-1 -right-3 bg-[#eb6a2e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </div>
            </div>

            <div className="relative font-medium cursor-pointer">
              <Link href="#" className={`${activeTab === "NBA" ? "text-[#eb6a2e]" : ""}`}>
                NBA
              </Link>
            </div>

            <div className="font-medium cursor-pointer">
              <Link href="#" className={`${activeTab === "NFL" ? "text-[#eb6a2e]" : ""}`}>
                NFL
              </Link>
            </div>

            <div className="font-medium cursor-pointer">
              <Link href="#" className={`${activeTab === "NCAAB" ? "text-[#eb6a2e]" : ""}`}>
                NCAAB
              </Link>
            </div>

            <div className="relative font-medium cursor-pointer">
              <Link href="#" className={`${activeTab === "NCAAF" ? "text-[#eb6a2e]" : ""}`}>
                NCAAF
              </Link>
              <div className="absolute -top-1 -right-3 bg-[#eb6a2e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="text-sm cursor-pointer flex items-center gap-1"
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            >
              Settings
              <ChevronDown className="h-3 w-3" />
            </button>
            {isSettingsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSettingsOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                  <Link
                    href="/global-configuration"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsSettingsOpen(false)}
                  >
                    Global Configuration
                  </Link>
                  <Link
                    href="/model-configuration"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsSettingsOpen(false)}
                  >
                    Model Config
                  </Link>
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setIsSettingsOpen(false)}
                  >
                    Settings
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Dark/light mode toggle */}
          <div className="relative">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                // Toggle the class on the document element
                document.documentElement.classList.toggle("dark")

                // Save preference to localStorage
                const isDark = document.documentElement.classList.contains("dark")
                localStorage.setItem("theme", isDark ? "dark" : "light")

                // Force a re-render to update the icon
                window.dispatchEvent(new Event("storage"))
              }}
              aria-label="Toggle dark mode"
            >
              <Moon className="h-5 w-5 block dark:hidden" />
              <Sun className="h-5 w-5 hidden dark:block" />
            </button>
          </div>

          {showUserControls && (
            <>
              <Link href="/alerts" className="relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 bg-[#eb6a2e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  5
                </div>
              </Link>
              {showSearch && <Search className="h-5 w-5" />}
              <User className="h-5 w-5" />
            </>
          )}
        </div>
      </div>
    </>
  )
}
