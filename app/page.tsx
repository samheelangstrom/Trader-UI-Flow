"use client"
import Link from "next/link"
import { useState } from "react"
import {
  ChevronDown,
  Search,
  Bell,
  User,
  Moon,
  Plus,
  Home,
  BeerIcon as Baseball,
  ShoppingBasketIcon as Basketball,
  ClubIcon as Football,
} from "lucide-react"

export default function LandingPage() {
  const [pinnedFixtures, setPinnedFixtures] = useState([
    { id: 1, homeTeam: "CHI", awayTeam: "GB", status: "In Play", score: "13 - 69" },
  ])

  const addFixture = (fixture) => {
    setPinnedFixtures([...pinnedFixtures, fixture])
  }

  const removeFixture = (id) => {
    setPinnedFixtures(pinnedFixtures.filter((fixture) => fixture.id !== id))
  }

  return (
    <div className="bg-[#fafafa] min-h-screen text-[#2b2c2d] flex">
      {/* Sidebar */}
      <div className="w-[180px] border-r border-[#dcdddf] flex-shrink-0">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
            <div className="ml-auto">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 4H14M2 8H14M2 12H14"
                  stroke="#5F6368"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Pinned Section */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <ChevronDown className="h-4 w-4 mr-1" />
              <div className="text-xs text-[#5f6368]">PINNED</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>CHI @ GB</div>
                <div className="bg-[#62c11e] text-white text-xs px-1.5 py-0.5 rounded-full">13 - 69</div>
              </div>
            </div>
          </div>

          {/* In Play Section */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <ChevronDown className="h-4 w-4 mr-1" />
              <div className="text-xs text-[#5f6368]">IN PLAY</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>NYG @ DAL</div>
                <div className="bg-[#62c11e] text-white text-xs px-1.5 py-0.5 rounded-full">13 - 69</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>LAL @ BOS</div>
                <div className="bg-[#62c11e] text-white text-xs px-1.5 py-0.5 rounded-full">13 - 70</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div>CHI @ GB</div>
                <div className="bg-[#62c11e] text-white text-xs px-1.5 py-0.5 rounded-full">13 - 69</div>
              </div>
            </div>
          </div>

          {/* Upcoming Section */}
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <ChevronDown className="h-4 w-4 mr-1" />
              <div className="text-xs text-[#5f6368]">UPCOMING</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>NYG @ DAL</div>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-1 text-sm text-[#5f6368] hover:text-[#2b2c2d] mt-4">
            <Plus className="h-4 w-4" />
            <span>Add fixture</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <div className="flex items-center justify-between border-b border-[#dcdddf] px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center gap-1">
              <Baseball className="h-4 w-4" />
              <div className="font-medium">MLB</div>
              <div className="absolute -top-1 -right-3 bg-[#eb6a2e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Basketball className="h-4 w-4" />
              <div className="font-medium">NBA</div>
            </div>
            <div className="flex items-center gap-1">
              <Football className="h-4 w-4" />
              <div className="font-medium">NFL</div>
            </div>
            <div className="font-medium">NCAAB</div>
            <div className="relative flex items-center gap-1">
              <div className="font-medium">NCAAF</div>
              <div className="absolute -top-1 -right-3 bg-[#eb6a2e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                1
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm">Global Tools</div>
            <Link href="/alerts" className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 bg-[#eb6a2e] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                5
              </div>
            </Link>
            <Search className="h-5 w-5" />
            <Moon className="h-5 w-5" />
            <User className="h-5 w-5" />
          </div>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Welcome to APT</h1>
          <div className="px-3 py-1.5 bg-[#4CAF50] text-white rounded text-sm">Open</div>
        </div>

        {/* In Play Section */}
        <div className="mx-4 mb-6 bg-white border border-[#dcdddf] rounded-md overflow-hidden">
          <div className="flex items-center p-3 border-b border-[#dcdddf] bg-[#f1f2f3]">
            <ChevronDown className="h-5 w-5 mr-2" />
            <div className="text-[#62c11e] font-medium">In Play</div>
          </div>

          <div className="p-3 border-b border-[#dcdddf]">
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1 px-3 py-1 bg-[#f1f2f3] rounded-full text-sm">
                <span>All</span>
                <span className="text-xs text-[#5f6368]">9</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm">
                <Baseball className="h-4 w-4 mr-1" />
                <span>MLB</span>
                <span className="text-xs text-[#5f6368]">3</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm">
                <Basketball className="h-4 w-4 mr-1" />
                <span>NBA</span>
                <span className="text-xs text-[#5f6368]">3</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm">
                <Football className="h-4 w-4 mr-1" />
                <span>NFL</span>
                <span className="text-xs text-[#5f6368]">3</span>
              </div>
            </div>
          </div>

          {/* MLB Section */}
          <div className="border-b border-[#dcdddf]">
            <div className="flex items-center justify-between p-3 bg-[#f1f2f3]">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-5 w-5" />
                <Baseball className="h-4 w-4" />
                <span className="font-medium">MLB</span>
                <span className="text-xs text-[#5f6368]">3</span>
                <span className="text-xs px-1.5 py-0.5 bg-[#4CAF50] text-white rounded">Open</span>
              </div>
              <button className="text-sm text-[#5f6368]">Suspend All MLB</button>
            </div>

            <div className="divide-y divide-[#dcdddf]">
              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Atlanta Braves @ Houston Astros</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">St. Louis Cardinals @ San Francisco Giants</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Minnesota Twins @ Oakland Athletics</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>
            </div>
          </div>

          {/* NBA Section */}
          <div className="border-b border-[#dcdddf]">
            <div className="flex items-center justify-between p-3 bg-[#f1f2f3]">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-5 w-5" />
                <Basketball className="h-4 w-4" />
                <span className="font-medium">NBA</span>
                <span className="text-xs text-[#5f6368]">3</span>
                <span className="text-xs px-1.5 py-0.5 bg-[#4CAF50] text-white rounded">Open</span>
              </div>
              <button className="text-sm text-[#5f6368]">Suspend All NBA</button>
            </div>

            <div className="divide-y divide-[#dcdddf]">
              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Boston Celtics @ Washington Wizards</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Brooklyn Nets @ Toronto Raptors</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Chicago Bulls @ Philadelphia 76ers</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>
            </div>
          </div>

          {/* NBA Section (Duplicate as shown in the image) */}
          <div className="border-b border-[#dcdddf]">
            <div className="flex items-center justify-between p-3 bg-[#f1f2f3]">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-5 w-5" />
                <Basketball className="h-4 w-4" />
                <span className="font-medium">NBA</span>
                <span className="text-xs text-[#5f6368]">3</span>
                <span className="text-xs px-1.5 py-0.5 bg-[#4CAF50] text-white rounded">Open</span>
              </div>
              <button className="text-sm text-[#5f6368]">Suspend All NBA</button>
            </div>

            <div className="divide-y divide-[#dcdddf]">
              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Boston Celtics @ Washington Wizards</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Brooklyn Nets @ Toronto Raptors</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Chicago Bulls @ Philadelphia 76ers</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>
            </div>
          </div>

          {/* NFL Section */}
          <div>
            <div className="flex items-center justify-between p-3 bg-[#f1f2f3]">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-5 w-5" />
                <Football className="h-4 w-4" />
                <span className="font-medium">NFL</span>
                <span className="text-xs text-[#5f6368]">3</span>
                <span className="text-xs px-1.5 py-0.5 bg-[#4CAF50] text-white rounded">Open</span>
              </div>
              <button className="text-sm text-[#5f6368]">Suspend All NFL</button>
            </div>

            <div className="divide-y divide-[#dcdddf]">
              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Dallas Cowboys @ New York Giants</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Philadelphia Eagles @ Washington Commanders</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <Link href="/game" className="flex items-center p-3 hover:bg-[#f9f9f9]">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Chicago Bears @ Detroit Lions</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Section */}
        <div className="mx-4 mb-6 bg-white border border-[#dcdddf] rounded-md overflow-hidden">
          <div className="flex items-center p-3 border-b border-[#dcdddf] bg-[#f1f2f3]">
            <ChevronDown className="h-5 w-5 mr-2" />
            <div className="font-medium">Upcoming</div>
          </div>

          <div className="p-3 border-b border-[#dcdddf]">
            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1 px-3 py-1 bg-[#f1f2f3] rounded-full text-sm">
                <span>All</span>
                <span className="text-xs text-[#5f6368]">9</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm">
                <Baseball className="h-4 w-4 mr-1" />
                <span>MLB</span>
                <span className="text-xs text-[#5f6368]">3</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm">
                <Basketball className="h-4 w-4 mr-1" />
                <span>NBA</span>
                <span className="text-xs text-[#5f6368]">1</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-1 rounded-full text-sm">
                <Football className="h-4 w-4 mr-1" />
                <span>NFL</span>
                <span className="text-xs text-[#5f6368]">2</span>
              </div>
            </div>
          </div>

          {/* MLB Upcoming Section */}
          <div className="border-b border-[#dcdddf]">
            <div className="flex items-center justify-between p-3 bg-[#f1f2f3]">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-5 w-5" />
                <Baseball className="h-4 w-4" />
                <span className="font-medium">MLB</span>
                <span className="text-xs text-[#5f6368]">3</span>
                <span className="text-xs px-1.5 py-0.5 bg-[#4CAF50] text-white rounded">Open</span>
              </div>
              <button className="text-sm text-[#5f6368]">Suspend All MLB</button>
            </div>

            <div className="divide-y divide-[#dcdddf]">
              <div className="flex items-center p-3">
                <div className="w-16 text-sm">10 Oct</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="flex-1 text-sm">Atlanta Braves @ Houston Astros</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-16 text-sm">10 Oct</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="flex-1 text-sm">St. Louis Cardinals @ San Francisco Giants</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-16 text-sm">10 Oct</div>
                <div className="w-16 text-sm">11:00</div>
                <div className="flex-1 text-sm">Minnesota Twins @ Oakland Athletics</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>
            </div>
          </div>

          {/* NBA Upcoming Section */}
          <div>
            <div className="flex items-center justify-between p-3 bg-[#f1f2f3]">
              <div className="flex items-center gap-2">
                <ChevronDown className="h-5 w-5" />
                <Basketball className="h-4 w-4" />
                <span className="font-medium">NBA</span>
                <span className="text-xs text-[#5f6368]">1</span>
                <span className="text-xs px-1.5 py-0.5 bg-[#4CAF50] text-white rounded">Open</span>
              </div>
              <button className="text-sm text-[#5f6368]">Suspend All NBA</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
