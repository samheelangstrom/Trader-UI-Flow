"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ConfigurationFiltersProps } from "../types"

export function ConfigurationFilters({ onFilterChange }: ConfigurationFiltersProps) {
  return (
    <div className="p-4 border-b border-[#dcdddf] grid grid-cols-4 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Sport</label>
        <Select defaultValue="Basketball" onValueChange={(value) => onFilterChange({ sport: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Basketball">Basketball</SelectItem>
            <SelectItem value="Football">Football</SelectItem>
            <SelectItem value="Baseball">Baseball</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Market Class</label>
        <Select defaultValue="Moneyline" onValueChange={(value) => onFilterChange({ marketClass: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select market class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Moneyline">Moneyline</SelectItem>
            <SelectItem value="Player Props">Player Props</SelectItem>
            <SelectItem value="Spread">Spread</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Market</label>
        <Select defaultValue="Player Moneyline" onValueChange={(value) => onFilterChange({ market: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select market" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Player Moneyline">Player Moneyline</SelectItem>
            <SelectItem value="Points">Points</SelectItem>
            <SelectItem value="Rebounds">Rebounds</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Player</label>
        <Select defaultValue="LeBron James" onValueChange={(value) => onFilterChange({ player: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select player" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="LeBron James">LeBron James</SelectItem>
            <SelectItem value="Stephen Curry">Stephen Curry</SelectItem>
            <SelectItem value="Kevin Durant">Kevin Durant</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
