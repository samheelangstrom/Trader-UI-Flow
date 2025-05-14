export interface MarginPreset {
  id: string
  name: string
  description: string
  value: number
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface MarginHistory {
  id: string
  marketId: string
  marketName: string
  previousValue: number
  newValue: number
  changedBy: string
  changedAt: string
  reason: string
}

export interface MarginConfiguration {
  id: string
  name: string
  sportId: string
  sportName: string
  leagueId?: string
  leagueName?: string
  teamId?: string
  teamName?: string
  marketTypeId?: string
  marketTypeName?: string
  value: number
  isInherited: boolean
  inheritedFrom?: string
  overrideParent: boolean
  createdAt: string
  updatedAt: string
}

export interface MarginFilters {
  sport: string[]
  league: string[]
  team: string[]
  marketType: string[]
  search: string
  showInherited: boolean
}

export interface MarginsState {
  configurations: MarginConfiguration[]
  filteredConfigurations: MarginConfiguration[]
  presets: MarginPreset[]
  history: MarginHistory[]
  selectedConfiguration: MarginConfiguration | null
  filters: MarginFilters
  isLoading: boolean
  error: string | null
}
