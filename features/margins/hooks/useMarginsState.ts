"use client"

import { useState, useEffect, useMemo } from "react"
import type { MarginConfiguration, MarginPreset, MarginHistory, MarginFilters, MarginsState } from "../types"

// Mock data for margin configurations
const mockConfigurations: MarginConfiguration[] = [
  {
    id: "1",
    name: "Global Default",
    sportId: "all",
    sportName: "All Sports",
    value: 0.05,
    isInherited: false,
    overrideParent: false,
    createdAt: "2023-10-01T00:00:00Z",
    updatedAt: "2023-10-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Basketball Default",
    sportId: "basketball",
    sportName: "Basketball",
    value: 0.06,
    isInherited: true,
    inheritedFrom: "Global Default",
    overrideParent: true,
    createdAt: "2023-10-02T00:00:00Z",
    updatedAt: "2023-10-02T00:00:00Z",
  },
  {
    id: "3",
    name: "NBA Default",
    sportId: "basketball",
    sportName: "Basketball",
    leagueId: "nba",
    leagueName: "NBA",
    value: 0.07,
    isInherited: true,
    inheritedFrom: "Basketball Default",
    overrideParent: true,
    createdAt: "2023-10-03T00:00:00Z",
    updatedAt: "2023-10-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Los Angeles Lakers",
    sportId: "basketball",
    sportName: "Basketball",
    leagueId: "nba",
    leagueName: "NBA",
    teamId: "lakers",
    teamName: "Los Angeles Lakers",
    value: 0.08,
    isInherited: true,
    inheritedFrom: "NBA Default",
    overrideParent: true,
    createdAt: "2023-10-04T00:00:00Z",
    updatedAt: "2023-10-04T00:00:00Z",
  },
  {
    id: "5",
    name: "Money Line - Basketball",
    sportId: "basketball",
    sportName: "Basketball",
    marketTypeId: "moneyline",
    marketTypeName: "Money Line",
    value: 0.04,
    isInherited: true,
    inheritedFrom: "Basketball Default",
    overrideParent: true,
    createdAt: "2023-10-05T00:00:00Z",
    updatedAt: "2023-10-05T00:00:00Z",
  },
]

// Mock data for margin presets
const mockPresets: MarginPreset[] = [
  {
    id: "1",
    name: "Conservative",
    description: "Lower margins for competitive markets",
    value: 0.03,
    isDefault: false,
    createdAt: "2023-09-01T00:00:00Z",
    updatedAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Standard",
    description: "Balanced margins for most markets",
    value: 0.05,
    isDefault: true,
    createdAt: "2023-09-02T00:00:00Z",
    updatedAt: "2023-09-02T00:00:00Z",
  },
  {
    id: "3",
    name: "Aggressive",
    description: "Higher margins for less competitive markets",
    value: 0.08,
    isDefault: false,
    createdAt: "2023-09-03T00:00:00Z",
    updatedAt: "2023-09-03T00:00:00Z",
  },
]

// Mock data for margin history
const mockHistory: MarginHistory[] = [
  {
    id: "1",
    marketId: "4",
    marketName: "Los Angeles Lakers",
    previousValue: 0.07,
    newValue: 0.08,
    changedBy: "John Doe",
    changedAt: "2023-10-04T10:30:00Z",
    reason: "Adjusted for increased liability",
  },
  {
    id: "2",
    marketId: "3",
    marketName: "NBA Default",
    previousValue: 0.06,
    newValue: 0.07,
    changedBy: "Jane Smith",
    changedAt: "2023-10-03T14:15:00Z",
    reason: "Seasonal adjustment",
  },
  {
    id: "3",
    marketId: "5",
    marketName: "Money Line - Basketball",
    previousValue: 0.05,
    newValue: 0.04,
    changedBy: "John Doe",
    changedAt: "2023-10-05T09:45:00Z",
    reason: "Competitive adjustment",
  },
]

const initialFilters: MarginFilters = {
  sport: [],
  league: [],
  team: [],
  marketType: [],
  search: "",
  showInherited: true,
}

export function useMarginsState(): MarginsState & {
  setFilters: (filters: Partial<MarginFilters>) => void
  selectConfiguration: (configuration: MarginConfiguration | null) => void
  updateConfiguration: (id: string, value: number, reason: string) => void
  createConfiguration: (configuration: Partial<MarginConfiguration>) => void
  deleteConfiguration: (id: string) => void
  applyPreset: (configId: string, presetId: string) => void
} {
  const [configurations, setConfigurations] = useState<MarginConfiguration[]>([])
  const [presets, setPresets] = useState<MarginPreset[]>([])
  const [history, setHistory] = useState<MarginHistory[]>([])
  const [selectedConfiguration, setSelectedConfiguration] = useState<MarginConfiguration | null>(null)
  const [filters, setFilters] = useState<MarginFilters>(initialFilters)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch configurations (simulated)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setConfigurations(mockConfigurations)
        setPresets(mockPresets)
        setHistory(mockHistory)
        setError(null)
      } catch (err) {
        setError("Failed to fetch margin configurations")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Apply filters to configurations
  const filteredConfigurations = useMemo(() => {
    return configurations.filter((config) => {
      // Filter by sport
      if (filters.sport.length > 0 && !filters.sport.includes(config.sportId)) {
        return false
      }

      // Filter by league
      if (filters.league.length > 0 && config.leagueId && !filters.league.includes(config.leagueId)) {
        return false
      }

      // Filter by team
      if (filters.team.length > 0 && config.teamId && !filters.team.includes(config.teamId)) {
        return false
      }

      // Filter by market type
      if (filters.marketType.length > 0 && config.marketTypeId && !filters.marketType.includes(config.marketTypeId)) {
        return false
      }

      // Filter by inherited status
      if (!filters.showInherited && config.isInherited) {
        return false
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        return (
          config.name.toLowerCase().includes(searchTerm) ||
          config.sportName.toLowerCase().includes(searchTerm) ||
          (config.leagueName && config.leagueName.toLowerCase().includes(searchTerm)) ||
          (config.teamName && config.teamName.toLowerCase().includes(searchTerm)) ||
          (config.marketTypeName && config.marketTypeName.toLowerCase().includes(searchTerm))
        )
      }

      return true
    })
  }, [configurations, filters])

  // Update filters
  const updateFilters = (newFilters: Partial<MarginFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Select a configuration
  const selectConfiguration = (configuration: MarginConfiguration | null) => {
    setSelectedConfiguration(configuration)
  }

  // Update a configuration
  const updateConfiguration = (id: string, value: number, reason: string) => {
    const configToUpdate = configurations.find((config) => config.id === id)
    if (!configToUpdate) return

    const updatedConfigurations = configurations.map((config) =>
      config.id === id
        ? {
            ...config,
            value,
            updatedAt: new Date().toISOString(),
          }
        : config,
    )

    const newHistoryEntry: MarginHistory = {
      id: Date.now().toString(),
      marketId: id,
      marketName: configToUpdate.name,
      previousValue: configToUpdate.value,
      newValue: value,
      changedBy: "Current User",
      changedAt: new Date().toISOString(),
      reason,
    }

    setConfigurations(updatedConfigurations)
    setHistory([newHistoryEntry, ...history])
  }

  // Create a new configuration
  const createConfiguration = (configuration: Partial<MarginConfiguration>) => {
    const newConfiguration: MarginConfiguration = {
      id: Date.now().toString(),
      name: configuration.name || "New Configuration",
      sportId: configuration.sportId || "all",
      sportName: configuration.sportName || "All Sports",
      leagueId: configuration.leagueId,
      leagueName: configuration.leagueName,
      teamId: configuration.teamId,
      teamName: configuration.teamName,
      marketTypeId: configuration.marketTypeId,
      marketTypeName: configuration.marketTypeName,
      value: configuration.value || 0.05,
      isInherited: configuration.isInherited || false,
      inheritedFrom: configuration.inheritedFrom,
      overrideParent: configuration.overrideParent || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setConfigurations([...configurations, newConfiguration])
  }

  // Delete a configuration
  const deleteConfiguration = (id: string) => {
    setConfigurations(configurations.filter((config) => config.id !== id))
  }

  // Apply a preset to a configuration
  const applyPreset = (configId: string, presetId: string) => {
    const preset = presets.find((p) => p.id === presetId)
    if (!preset) return

    const configToUpdate = configurations.find((config) => config.id === configId)
    if (!configToUpdate) return

    updateConfiguration(configId, preset.value, `Applied preset: ${preset.name}`)
  }

  return {
    configurations,
    filteredConfigurations,
    presets,
    history,
    selectedConfiguration,
    filters,
    isLoading,
    error,
    setFilters: updateFilters,
    selectConfiguration,
    updateConfiguration,
    createConfiguration,
    deleteConfiguration,
    applyPreset,
  }
}
