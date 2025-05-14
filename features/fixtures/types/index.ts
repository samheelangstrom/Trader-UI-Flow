export interface Fixture {
  id: string
  homeTeam: string
  homeTeamLogo?: string
  awayTeam: string
  awayTeamLogo?: string
  sport: "basketball" | "football" | "baseball" | "hockey" | "soccer"
  league: string
  startTime: string
  status: "scheduled" | "in_play" | "suspended" | "completed" | "cancelled"
  score?: {
    home: number
    away: number
  }
  period?: string
  timeRemaining?: string
  markets: number
  openMarkets: number
  suspendedMarkets: number
  liability: number
  isPinned: boolean
}

export interface FixtureFilters {
  sport: string[]
  league: string[]
  status: string[]
  dateRange: {
    start: string | null
    end: string | null
  }
  search: string
}

export interface FixturesState {
  fixtures: Fixture[]
  filteredFixtures: Fixture[]
  selectedFixture: Fixture | null
  filters: FixtureFilters
  isLoading: boolean
  error: string | null
}
