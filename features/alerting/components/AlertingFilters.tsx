"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import type { AlertingFiltersProps } from "../types"

export function AlertingFilters({ onFilterChange }: AlertingFiltersProps) {
  return (
    <div className="p-4 border-b border-[#dcdddf] grid grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Sport</label>
        <Select defaultValue="all" onValueChange={(value) => onFilterChange({ sport: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="basketball">Basketball</SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="baseball">Baseball</SelectItem>
            <SelectItem value="hockey">Hockey</SelectItem>
            <SelectItem value="soccer">Soccer</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <Select
          defaultValue="all"
          onValueChange={(value) => onFilterChange({ enabled: value === "all" ? undefined : value === "enabled" })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2 pt-6">
        <Switch id="show-default-range" onCheckedChange={(checked) => onFilterChange({ hasDefaultRange: checked })} />
        <Label htmlFor="show-default-range">Has Default Range</Label>
      </div>
    </div>
  )
}
