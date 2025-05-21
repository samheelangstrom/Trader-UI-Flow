"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import type { AutoLineMovementFiltersProps } from "../types"

export function AutoLineMovementFilters({ onFilterChange }: AutoLineMovementFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState({
    search: "",
    sport: "",
    marketClass: "",
    mode: "",
  })

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      search: "",
      sport: "",
      marketClass: "",
      mode: "",
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white border-b border-[#dcdddf]">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5f6368]" />
            <Input
              type="text"
              placeholder="Search rules..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <Button variant="outline" size="sm" onClick={toggleExpanded} className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          {(filters.sport || filters.marketClass || filters.mode) && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-[#5f6368]">
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sport</label>
            <Select value={filters.sport} onValueChange={(value) => handleFilterChange("sport", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="Basketball">Basketball</SelectItem>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Baseball">Baseball</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Market Class</label>
            <Select value={filters.marketClass} onValueChange={(value) => handleFilterChange("marketClass", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Market Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Market Classes</SelectItem>
                <SelectItem value="Player Props">Player Props</SelectItem>
                <SelectItem value="Moneyline">Moneyline</SelectItem>
                <SelectItem value="Spread">Spread</SelectItem>
                <SelectItem value="Team Totals">Team Totals</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mode</label>
            <Select value={filters.mode} onValueChange={(value) => handleFilterChange("mode", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Modes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="Automatic">Automatic</SelectItem>
                <SelectItem value="Recommendation">Recommendation</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
