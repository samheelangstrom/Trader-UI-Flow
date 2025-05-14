"use client"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, BeerIcon as Baseball, ShoppingBasketIcon as Basketball, ClubIcon as Football } from "lucide-react"
import TopNavigation from "@/components/top-navigation"
import Sidebar from "@/components/sidebar"

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
      <Sidebar pinnedFixtures={pinnedFixtures} addFixture={addFixture} removeFixture={removeFixture} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <TopNavigation />

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
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Atlanta Braves @ Houston Astros</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">St. Louis Cardinals @ San Francisco Giants</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
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
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Boston Celtics @ Washington Wizards</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Brooklyn Nets @ Toronto Raptors</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
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
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Boston Celtics @ Washington Wizards</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Brooklyn Nets @ Toronto Raptors</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
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
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Dallas Cowboys @ New York Giants</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="w-16 text-sm bg-[#62c11e] text-white text-center rounded-full">13 - 69</div>
                <div className="flex-1 text-sm ml-2">Philadelphia Eagles @ Washington Commanders</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <Link href="/game" className="flex items-center p-3 hover:bg-[#f9f9f9]">
                <div className="w-8 text-[#62c11e] text-sm">IP</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
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
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="flex-1 text-sm">Atlanta Braves @ Houston Astros</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-16 text-sm">10 Oct</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
                <div className="flex-1 text-sm">St. Louis Cardinals @ San Francisco Giants</div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">+ Add</button>
                  <button className="px-2 py-1 text-xs border border-[#dcdddf] rounded">Suspend</button>
                </div>
              </div>

              <div className="flex items-center p-3">
                <div className="w-16 text-sm">10 Oct</div>
                <div className="w-16 text-sm flex items-center justify-center">
                  <div className="relative w-5 h-5 mr-1 rounded-full border border-[#5f6368] flex items-center justify-center">
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[3px] bg-[#5f6368] origin-bottom transform rotate-0"></div>
                    <div className="absolute top-[7px] left-[9px] w-[1px] h-[5px] bg-[#5f6368] origin-bottom transform rotate-90"></div>
                  </div>
                  <span>11:00</span>
                </div>
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
