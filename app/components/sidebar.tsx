"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, HomeIcon, Plus, Star, Calendar, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Sidebar({ pinnedFixtures = [], addFixture = () => {}, removeFixture = () => {} }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div
      className={`border-r border-[#dcdddf] flex-shrink-0 transition-all duration-300 ${isSidebarCollapsed ? "w-[60px]" : "w-[220px]"}`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <HomeIcon className="h-5 w-5" />
            {!isSidebarCollapsed && <span className="font-medium">Home</span>}
          </div>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-[#5f6368] hover:text-[#2b2c2d]"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {!isSidebarCollapsed && (
          <>
            <div className="mb-4">
              <div className="text-xs text-[#5f6368] mb-2">PINNED</div>
              <div className="space-y-2">
                {pinnedFixtures.map((fixture, index) => {
                  // Rotate through the three alert types for demonstration
                  const alertType = index % 3
                  let alertSymbol

                  if (alertType === 0) {
                    alertSymbol = (
                      <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center text-white text-[10px] font-bold">
                        MA
                      </div>
                    )
                  } else if (alertType === 1) {
                    alertSymbol = (
                      <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                        MO
                      </div>
                    )
                  } else {
                    alertSymbol = (
                      <div
                        className="flex-shrink-0 w-5 h-5 bg-red-500 flex items-center justify-center text-white"
                        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                      >
                        <span className="text-[10px] font-bold translate-y-1">!</span>
                      </div>
                    )
                  }

                  return (
                    <div key={fixture.id} className="flex items-center justify-between text-sm group">
                      <div className="flex items-center gap-1">
                        {alertSymbol}
                        <div>
                          {fixture.homeTeam} @ {fixture.awayTeam}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-[#62c11e] text-xs">{fixture.status}</div>
                        <button
                          onClick={() => removeFixture(fixture.id)}
                          className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3 text-[#5f6368]" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-[#5f6368] mb-2">ALL FIXTURES</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-sm flex items-center justify-center text-white text-[10px] font-bold">
                      MA
                    </div>
                    <div>NYG @ DAL</div>
                  </div>
                  <div className="text-[#62c11e] text-xs">In Play</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                      MO
                    </div>
                    <div>LAL @ BOS</div>
                  </div>
                  <div className="text-[#62c11e] text-xs">In Play</div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <div
                      className="flex-shrink-0 w-5 h-5 bg-red-500 flex items-center justify-center text-white"
                      style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
                    >
                      <span className="text-[10px] font-bold translate-y-1">!</span>
                    </div>
                    <div>CHI @ GB</div>
                  </div>
                  <div className="text-[#62c11e] text-xs">In Play</div>
                </div>
              </div>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-1 text-sm text-[#5f6368] hover:text-[#2b2c2d]">
                  <Plus className="h-4 w-4" />
                  <span>Add fixture</span>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Fixture</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="sport">Sport</Label>
                    <Select>
                      <SelectTrigger id="sport">
                        <SelectValue placeholder="Select sport" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mlb">MLB</SelectItem>
                        <SelectItem value="nba">NBA</SelectItem>
                        <SelectItem value="nfl">NFL</SelectItem>
                        <SelectItem value="ncaab">NCAAB</SelectItem>
                        <SelectItem value="ncaaf">NCAAF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="home-team">Home Team</Label>
                    <Select>
                      <SelectTrigger id="home-team">
                        <SelectValue placeholder="Select home team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lakers">Los Angeles Lakers</SelectItem>
                        <SelectItem value="celtics">Boston Celtics</SelectItem>
                        <SelectItem value="warriors">Golden State Warriors</SelectItem>
                        <SelectItem value="bulls">Chicago Bulls</SelectItem>
                        <SelectItem value="heat">Miami Heat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="away-team">Away Team</Label>
                    <Select>
                      <SelectTrigger id="away-team">
                        <SelectValue placeholder="Select away team" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lakers">Los Angeles Lakers</SelectItem>
                        <SelectItem value="celtics">Boston Celtics</SelectItem>
                        <SelectItem value="warriors">Golden State Warriors</SelectItem>
                        <SelectItem value="bulls">Chicago Bulls</SelectItem>
                        <SelectItem value="heat">Miami Heat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Status</Label>
                    <RadioGroup defaultValue="upcoming">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upcoming" id="upcoming" />
                        <Label htmlFor="upcoming">Upcoming</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-play" id="in-play" />
                        <Label htmlFor="in-play">In Play</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <input
                      type="date"
                      id="date"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <input
                      type="time"
                      id="time"
                      defaultValue="11:00"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <Button
                    onClick={() => {
                      addFixture({
                        id: Date.now(),
                        homeTeam: "NEW",
                        awayTeam: "TEAM",
                        status: "In Play",
                      })
                    }}
                  >
                    Add to Pinned
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}

        {isSidebarCollapsed && (
          <div className="flex flex-col items-center gap-4">
            <button className="p-2 rounded-full hover:bg-[#f1f2f3]">
              <Star className="h-5 w-5 text-[#5f6368]" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#f1f2f3]">
              <Calendar className="h-5 w-5 text-[#5f6368]" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#f1f2f3]">
              <Plus className="h-5 w-5 text-[#5f6368]" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
