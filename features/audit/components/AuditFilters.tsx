"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search, X, Filter } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { AuditFilters as AuditFiltersType } from "../types"

interface AuditFiltersProps {
  filters: AuditFiltersType
  onFilterChange: (filters: Partial<AuditFiltersType>) => void
  onReset: () => void
}

export function AuditFilters({ filters, onFilterChange, onReset }: AuditFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchTerm: e.target.value })
  }

  const handleStartDateChange = (date: Date | undefined) => {
    onFilterChange({ startDate: date })
  }

  const handleEndDateChange = (date: Date | undefined) => {
    onFilterChange({ endDate: date })
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search audit logs..."
                className="pl-8"
                value={filters.searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" onClick={onReset}>
              <X className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="start-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.startDate ? format(filters.startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={filters.startDate}
                      onSelect={handleStartDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="end-date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !filters.endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {filters.endDate ? format(filters.endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={filters.endDate} onSelect={handleEndDateChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Additional filters can be added here */}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
