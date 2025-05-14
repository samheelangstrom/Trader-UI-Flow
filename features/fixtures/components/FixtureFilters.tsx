"use client"

import type React from "react"

import { useState } from "react"
import { Filter, X, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { FixtureFilters } from "../types"

// Mock data for filter options
const sportOptions = [
  { value: "basketball", label: "Basketball" },
  { value: "football", label: "Football" },
  { value: "baseball", label: "Baseball" },
  { value: "hockey", label: "Hockey" },
  { value: "soccer", label: "Soccer" },
]

const leagueOptions = [
  { value: "NBA", label: "NBA" },
  { value: "NFL", label: "NFL" },
  { value: "MLB", label: "MLB" },
  { value: "NHL", label: "NHL" },
  { value: "Premier League", label: "Premier League" },
  { value: "La Liga", label: "La Liga" },
  { value: "Bundesliga", label: "Bundesliga" },
]

const statusOptions = [
  { value: "scheduled", label: "Scheduled" },
  { value: "in_play", label: "In Play" },
  { value: "suspended", label: "Suspended" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

interface FixtureFiltersProps {
  filters: FixtureFilters
  onFilterChange: (filters: Partial<FixtureFilters>) => void
  activeFilterCount: number
}

export function FixtureFilters({ filters, onFilterChange, activeFilterCount }: FixtureFiltersProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleSportChange = (value: string) => {
    const currentSports = [...filters.sport]
    const index = currentSports.indexOf(value)

    if (index === -1) {
      currentSports.push(value)
    } else {
      currentSports.splice(index, 1)
    }

    onFilterChange({ sport: currentSports })
  }

  const handleLeagueChange = (value: string) => {
    const currentLeagues = [...filters.league]
    const index = currentLeagues.indexOf(value)

    if (index === -1) {
      currentLeagues.push(value)
    } else {
      currentLeagues.splice(index, 1)
    }

    onFilterChange({ league: currentLeagues })
  }

  const handleStatusChange = (value: string) => {
    const currentStatuses = [...filters.status]
    const index = currentStatuses.indexOf(value)

    if (index === -1) {
      currentStatuses.push(value)
    } else {
      currentStatuses.splice(index, 1)
    }

    onFilterChange({ status: currentStatuses })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value })
  }

  const handleStartDateChange = (date: Date | undefined) => {
    onFilterChange({
      dateRange: {
        ...filters.dateRange,
        start: date ? date.toISOString() : null,
      },
    })
  }

  const handleEndDateChange = (date: Date | undefined) => {
    onFilterChange({
      dateRange: {
        ...filters.dateRange,
        end: date ? date.toISOString() : null,
      },
    })
  }

  const clearFilters = () => {
    onFilterChange({
      sport: [],
      league: [],
      status: [],
      dateRange: {
        start: null,
        end: null,
      },
      search: "",
    })
  }

  const removeFilter = (type: keyof FixtureFilters, value?: string) => {
    if (type === "sport" && value) {
      onFilterChange({
        sport: filters.sport.filter((s) => s !== value),
      })
    } else if (type === "league" && value) {
      onFilterChange({
        league: filters.league.filter((l) => l !== value),
      })
    } else if (type === "status" && value) {
      onFilterChange({
        status: filters.status.filter((s) => s !== value),
      })
    } else if (type === "dateRange") {
      onFilterChange({
        dateRange: {
          start: null,
          end: null,
        },
      })
    } else if (type === "search") {
      onFilterChange({ search: "" })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Search fixtures..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-8"
          />
          <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          {filters.search && (
            <button className="absolute right-2.5 top-2.5" onClick={() => removeFilter("search")}>
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-between">
              Sport
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
              <CommandInput placeholder="Search sports..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {sportOptions.map((sport) => (
                    <CommandItem
                      key={sport.value}
                      onSelect={() => handleSportChange(sport.value)}
                      className="flex items-center"
                    >
                      <div
                        className={`mr-2 h-4 w-4 rounded-sm border ${
                          filters.sport.includes(sport.value) ? "bg-primary border-primary" : "border-gray-300"
                        }`}
                      >
                        {filters.sport.includes(sport.value) && <X className="h-3 w-3 text-white" />}
                      </div>
                      {sport.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-between">
              League
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
              <CommandInput placeholder="Search leagues..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {leagueOptions.map((league) => (
                    <CommandItem
                      key={league.value}
                      onSelect={() => handleLeagueChange(league.value)}
                      className="flex items-center"
                    >
                      <div
                        className={`mr-2 h-4 w-4 rounded-sm border ${
                          filters.league.includes(league.value) ? "bg-primary border-primary" : "border-gray-300"
                        }`}
                      >
                        {filters.league.includes(league.value) && <X className="h-3 w-3 text-white" />}
                      </div>
                      {league.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-between">
              Status
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="end">
            <Command>
              <CommandInput placeholder="Search statuses..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {statusOptions.map((status) => (
                    <CommandItem
                      key={status.value}
                      onSelect={() => handleStatusChange(status.value)}
                      className="flex items-center"
                    >
                      <div
                        className={`mr-2 h-4 w-4 rounded-sm border ${
                          filters.status.includes(status.value) ? "bg-primary border-primary" : "border-gray-300"
                        }`}
                      >
                        {filters.status.includes(status.value) && <X className="h-3 w-3 text-white" />}
                      </div>
                      {status.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[150px] justify-between">
              Date Range
              <Calendar className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Start Date</h4>
                <CalendarComponent
                  mode="single"
                  selected={filters.dateRange.start ? new Date(filters.dateRange.start) : undefined}
                  onSelect={handleStartDateChange}
                  initialFocus
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">End Date</h4>
                <CalendarComponent
                  mode="single"
                  selected={filters.dateRange.end ? new Date(filters.dateRange.end) : undefined}
                  onSelect={handleEndDateChange}
                  initialFocus
                />
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleStartDateChange(undefined)
                    handleEndDateChange(undefined)
                  }}
                >
                  Clear Dates
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>

          {filters.sport.map((sport) => {
            const sportLabel = sportOptions.find((s) => s.value === sport)?.label || sport
            return (
              <Badge key={sport} variant="secondary" className="flex items-center gap-1">
                Sport: {sportLabel}
                <button onClick={() => removeFilter("sport", sport)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}

          {filters.league.map((league) => {
            const leagueLabel = leagueOptions.find((l) => l.value === league)?.label || league
            return (
              <Badge key={league} variant="secondary" className="flex items-center gap-1">
                League: {leagueLabel}
                <button onClick={() => removeFilter("league", league)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}

          {filters.status.map((status) => {
            const statusLabel = statusOptions.find((s) => s.value === status)?.label || status
            return (
              <Badge key={status} variant="secondary" className="flex items-center gap-1">
                Status: {statusLabel}
                <button onClick={() => removeFilter("status", status)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          })}

          {(filters.dateRange.start || filters.dateRange.end) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Date Range: {filters.dateRange.start ? new Date(filters.dateRange.start).toLocaleDateString() : "Any"} -{" "}
              {filters.dateRange.end ? new Date(filters.dateRange.end).toLocaleDateString() : "Any"}
              <button onClick={() => removeFilter("dateRange")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.search && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {filters.search}
              <button onClick={() => removeFilter("search")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          <Button variant="ghost" size="sm" onClick={clearFilters} className="ml-auto">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
