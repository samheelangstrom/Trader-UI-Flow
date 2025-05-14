"use client"

/**
 * Feature Filters
 *
 * This component provides filtering controls for the feature.
 */

import type React from "react"
import { useFeature } from "../context/FeatureContext"
import { FeatureStatus } from "../types"
import { Input } from "@/components/ui/form-elements"
import { Button } from "@/components/ui/button"

export function FeatureFilters() {
  const { state, actions } = useFeature()
  const { filters } = state

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    actions.updateFilters({ search: e.target.value })
  }

  // Handle status filter change
  const handleStatusChange = (status: FeatureStatus) => {
    const currentStatuses = filters.status || []
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status]

    actions.updateFilters({ status: newStatuses })
  }

  // Handle date range change
  const handleDateRangeChange = (field: "start" | "end", value: string) => {
    const currentDateRange = filters.dateRange || { start: "", end: "" }
    actions.updateFilters({
      dateRange: {
        ...currentDateRange,
        [field]: value,
      },
    })
  }

  // Handle sort change
  const handleSortChange = (sortBy: string) => {
    const currentSortBy = filters.sortBy
    const currentSortDirection = filters.sortDirection || "asc"

    // If clicking the same column, toggle direction
    const newSortDirection = currentSortBy === sortBy && currentSortDirection === "asc" ? "desc" : "asc"

    actions.updateFilters({
      sortBy: sortBy as any,
      sortDirection: newSortDirection,
    })
  }

  // Reset all filters
  const handleResetFilters = () => {
    actions.updateFilters({
      search: "",
      status: [],
      dateRange: undefined,
      sortBy: undefined,
      sortDirection: undefined,
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search input */}
        <div>
          <Input type="text" placeholder="Search..." value={filters.search || ""} onChange={handleSearchChange} />
        </div>

        {/* Date range filters */}
        <div className="flex space-x-2">
          <Input
            type="date"
            placeholder="Start date"
            value={filters.dateRange?.start || ""}
            onChange={(e) => handleDateRangeChange("start", e.target.value)}
          />
          <Input
            type="date"
            placeholder="End date"
            value={filters.dateRange?.end || ""}
            onChange={(e) => handleDateRangeChange("end", e.target.value)}
          />
        </div>

        {/* Reset button */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {Object.values(FeatureStatus).map((status) => (
          <Button
            key={status}
            variant={filters.status?.includes(status) ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  )
}
