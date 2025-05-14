"use client"

import { useState, useEffect, useMemo } from "react"
import type { Fixture, FixtureFilters, FixturesState } from "../types"

// Mock data for fixtures
const mockFixtures: Fixture[] = [
  {
    id: "1",
    homeTeam: "Los Angeles Lakers",
    homeTeamLogo: "/los-angeles-lakers-logo.png",
    awayTeam: "Boston Celtics",
    awayTeamLogo: "/boston-celtics-logo.png",
    sport: "basketball",
    league: "NBA",
    startTime: "2023-11-15T19:30:00Z",
    status: "in_play",
    score: {
      home: 87,
      away: 92,
    },
    period: "Q4",
    timeRemaining: "4:32",
    markets: 142,
    openMarkets: 128,
    suspendedMarkets: 14,
    liability: 30202.11,
    isPinned: true,
  },
  {
    id: "2",
    homeTeam: "Golden State Warriors",
    awayTeam: "Chicago Bulls",
    sport: "basketball",
    league: "NBA",
    startTime: "2023-11-15T20:00:00Z",
    status: "scheduled",
    markets: 138,
    openMarkets: 138,
    suspendedMarkets: 0,
    liability: 18456.32,
    isPinned: false,
  },
  {
    id: "3",
    homeTeam: "Dallas Cowboys",
    awayTeam: "New York Giants",
    sport: "football",
    league: "NFL",
    startTime: "2023-11-16T18:20:00Z",
    status: "scheduled",
    markets: 156,
    openMarkets: 156,
    suspendedMarkets: 0,
    liability: 42105.87,
    isPinned: true,
  },
  {
    id: "4",
    homeTeam: "New York Yankees",
    awayTeam: "Boston Red Sox",
    sport: "baseball",
    league: "MLB",
    startTime: "2023-11-14T17:05:00Z",
    status: "completed",
    score: {
      home: 5,
      away: 3,
    },
    markets: 124,
    openMarkets: 0,
    suspendedMarkets: 0,
    liability: 0,
    isPinned: false,
  },
  {
    id: "5",
    homeTeam: "Miami Heat",
    awayTeam: "Philadelphia 76ers",
    sport: "basketball",
    league: "NBA",
    startTime: "2023-11-16T19:00:00Z",
    status: "scheduled",
    markets: 140,
    openMarkets: 140,
    suspendedMarkets: 0,
    liability: 22345.67,
    isPinned: false,
  },
]

const initialFilters: FixtureFilters = {
  sport: [],
  league: [],
  status: [],
  dateRange: {
    start: null,
    end: null,
  },
  search: "",
}

export function useFixturesState(): FixturesState & {
  setFilters: (filters: Partial<FixtureFilters>) => void
  selectFixture: (fixture: Fixture | null) => void
  togglePinFixture: (fixtureId: string) => void
  refreshFixtures: () => void
} {
  const [fixtures, setFixtures] = useState<Fixture[]>([])
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null)
  const [filters, setFilters] = useState<FixtureFilters>(initialFilters)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch fixtures (simulated)
  useEffect(() => {
    const fetchFixtures = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        setFixtures(mockFixtures)
        setError(null)
      } catch (err) {
        setError("Failed to fetch fixtures")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFixtures()
  }, [])

  // Apply filters to fixtures
  const filteredFixtures = useMemo(() => {
    return fixtures.filter((fixture) => {
      // Filter by sport
      if (filters.sport.length > 0 && !filters.sport.includes(fixture.sport)) {
        return false
      }

      // Filter by league
      if (filters.league.length > 0 && !filters.league.includes(fixture.league)) {
        return false
      }

      // Filter by status
      if (filters.status.length > 0 && !filters.status.includes(fixture.status)) {
        return false
      }

      // Filter by date range
      if (filters.dateRange.start && new Date(fixture.startTime) < new Date(filters.dateRange.start)) {
        return false
      }
      if (filters.dateRange.end && new Date(fixture.startTime) > new Date(filters.dateRange.end)) {
        return false
      }

      // Filter by search term
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        return (
          fixture.homeTeam.toLowerCase().includes(searchTerm) ||
          fixture.awayTeam.toLowerCase().includes(searchTerm) ||
          fixture.league.toLowerCase().includes(searchTerm)
        )
      }

      return true
    })
  }, [fixtures, filters])

  // Update filters
  const updateFilters = (newFilters: Partial<FixtureFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Select a fixture
  const selectFixture = (fixture: Fixture | null) => {
    setSelectedFixture(fixture)
  }

  // Toggle pin status for a fixture
  const togglePinFixture = (fixtureId: string) => {
    setFixtures((prev) =>
      prev.map((fixture) => (fixture.id === fixtureId ? { ...fixture, isPinned: !fixture.isPinned } : fixture)),
    )
  }

  // Refresh fixtures
  const refreshFixtures = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setFixtures(mockFixtures)
      setIsLoading(false)
    }, 800)
  }

  return {
    fixtures,
    filteredFixtures,
    selectedFixture,
    filters,
    isLoading,
    error,
    setFilters: updateFilters,
    selectFixture,
    togglePinFixture,
    refreshFixtures,
  }
}
