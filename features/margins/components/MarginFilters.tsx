"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import type { MarginFilters } from "../types"

interface MarginFiltersProps {
  filters: MarginFilters
  onFilterChange: (filters: Partial<MarginFilters>) => void
  onReset: () => void
  sportOptions: { id: string; name: string }[]
  leagueOptions: { id: string; name: string }[]
  teamOptions: { id: string; name: string }[]
  marketTypeOptions: { id: string; name: string }[]
}

export function MarginFilters({
  filters,
  onFilterChange,
  onReset,
  sportOptions,
  leagueOptions,
  teamOptions,
  marketTypeOptions,
}: MarginFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Count active filters (excluding search and showInherited)
  const activeFilterCount =
    filters.sport.length + filters.league.length + filters.team.length + filters.marketType.length

  // Handle sport selection
  const handleSportChange = (value: string) => {
    if (value === "all") {
      onFilterChange({ sport: [] })
    } else {
      onFilterChange({ sport: [value] })
    }
  }

  // Handle league selection
  const handleLeagueChange = (value: string) => {
    if (value === "all") {
      onFilterChange({ league: [] })
    } else {
      onFilterChange({ league: [value] })
    }
  }

  // Handle team selection
  const handleTeamChange = (value: string) => {
    if (value === "all") {
      onFilterChange({ team: [] })
    } else {
      onFilterChange({ team: [value] })
    }
  }

  // Handle market type selection
  const handleMarketTypeChange = (value: string) => {
    if (value === "all") {
      onFilterChange({ marketType: [] })
    } else {
      onFilterChange({ marketType: [value] })
    }
  }

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value })
  }

  // Handle inherited checkbox
  const handleInheritedChange = (checked: boolean) => {
    onFilterChange({ showInherited: checked })
  }

  return (
    <div className="bg-white p-4 rounded-md shadow space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Filters</h2>
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="px-2 py-1">
              {activeFilterCount} active filters
            </Badge>
          )}
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-medium">
            {isExpanded ? "Less filters" : "More filters"}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-64">
            <Input
              placeholder="Search margins..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>

          <div className="w-full md:w-48">
            <Select value={filters.sport.length > 0 ? filters.sport[0] : "all"} onValueChange={handleSportChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                {sportOptions.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="showInherited" checked={filters.showInherited} onCheckedChange={handleInheritedChange} />
            <Label htmlFor="showInherited">Show inherited margins</Label>
          </div>
        </div>

        {isExpanded && (
          <div className="flex flex-wrap gap-4 pt-2 border-t">
            <div className="w-full md:w-48">
              <Select value={filters.league.length > 0 ? filters.league[0] : "all"} onValueChange={handleLeagueChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Leagues" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Leagues</SelectItem>
                  {leagueOptions.map((league) => (
                    <SelectItem key={league.id} value={league.id}>
                      {league.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <Select value={filters.team.length > 0 ? filters.team[0] : "all"} onValueChange={handleTeamChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All Teams" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  {teamOptions.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <Select
                value={filters.marketType.length > 0 ? filters.marketType[0] : "all"}
                onValueChange={handleMarketTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Market Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Market Types</SelectItem>
                  {marketTypeOptions.map((marketType) => (
                    <SelectItem key={marketType.id} value={marketType.id}>
                      {marketType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Active filter badges */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filters.sport.map((sportId) => {
              const sport = sportOptions.find((s) => s.id === sportId)
              return (
                <Badge key={sportId} variant="outline" className="px-2 py-1">
                  Sport: {sport?.name || sportId}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => onFilterChange({ sport: filters.sport.filter((id) => id !== sportId) })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
            {filters.league.map((leagueId) => {
              const league = leagueOptions.find((l) => l.id === leagueId)
              return (
                <Badge key={leagueId} variant="outline" className="px-2 py-1">
                  League: {league?.name || leagueId}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => onFilterChange({ league: filters.league.filter((id) => id !== leagueId) })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
            {filters.team.map((teamId) => {
              const team = teamOptions.find((t) => t.id === teamId)
              return (
                <Badge key={teamId} variant="outline" className="px-2 py-1">
                  Team: {team?.name || teamId}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => onFilterChange({ team: filters.team.filter((id) => id !== teamId) })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
            {filters.marketType.map((marketTypeId) => {
              const marketType = marketTypeOptions.find((m) => m.id === marketTypeId)
              return (
                <Badge key={marketTypeId} variant="outline" className="px-2 py-1">
                  Market Type: {marketType?.name || marketTypeId}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() =>
                      onFilterChange({ marketType: filters.marketType.filter((id) => id !== marketTypeId) })
                    }
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
