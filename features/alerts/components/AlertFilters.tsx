"use client"

import type React from "react"

import { useState } from "react"
import type { AlertFilters as AlertFiltersType } from "../types"

interface AlertFiltersProps {
  filters: AlertFiltersType
  onFilterChange: (filters: AlertFiltersType) => void
}

export function AlertFilters({ filters, onFilterChange }: AlertFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSeverityChange = (severity: string) => {
    const newSeverities = filters.severity.includes(severity)
      ? filters.severity.filter((s) => s !== severity)
      : [...filters.severity, severity]

    onFilterChange({
      ...filters,
      severity: newSeverities,
    })
  }

  const handleTypeChange = (type: string) => {
    const newTypes = filters.type.includes(type) ? filters.type.filter((t) => t !== type) : [...filters.type, type]

    onFilterChange({
      ...filters,
      type: newTypes,
    })
  }

  const handleSportChange = (sport: string) => {
    const newSports = filters.sport.includes(sport)
      ? filters.sport.filter((s) => s !== sport)
      : [...filters.sport, sport]

    onFilterChange({
      ...filters,
      sport: newSports,
    })
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      search: e.target.value,
    })
  }

  const clearFilters = () => {
    onFilterChange({
      severity: [],
      type: [],
      sport: [],
      dateRange: {
        start: null,
        end: null,
      },
      search: "",
    })
  }

  return (
    <div className="bg-white border border-[#dcdddf] rounded-md p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Filters</h2>
        <div className="flex gap-2">
          <button className="text-sm text-[#5f6368] hover:text-[#2b2c2d]" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Collapse" : "Expand"}
          </button>
          <button className="text-sm text-[#5f6368] hover:text-[#2b2c2d]" onClick={clearFilters}>
            Clear All
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-[#5f6368] mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              className="w-full px-3 py-2 border border-[#dcdddf] rounded-md"
              placeholder="Search fixtures or markets"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {isExpanded && (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-medium text-[#5f6368] mb-2">Severity</h3>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.severity.includes("high")}
                      onChange={() => handleSeverityChange("high")}
                    />
                    High
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.severity.includes("medium")}
                      onChange={() => handleSeverityChange("medium")}
                    />
                    Medium
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.severity.includes("low")}
                      onChange={() => handleSeverityChange("low")}
                    />
                    Low
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#5f6368] mb-2">Type</h3>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.type.includes("Price")}
                      onChange={() => handleTypeChange("Price")}
                    />
                    Price
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.type.includes("Liability")}
                      onChange={() => handleTypeChange("Liability")}
                    />
                    Liability
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.type.includes("Comp")}
                      onChange={() => handleTypeChange("Comp")}
                    />
                    Comp
                  </label>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#5f6368] mb-2">Sport</h3>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.sport.includes("NBA")}
                      onChange={() => handleSportChange("NBA")}
                    />
                    NBA
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.sport.includes("NFL")}
                      onChange={() => handleSportChange("NFL")}
                    />
                    NFL
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.sport.includes("MLB")}
                      onChange={() => handleSportChange("MLB")}
                    />
                    MLB
                  </label>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
