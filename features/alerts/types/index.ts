export type AlertSeverity = "high" | "medium" | "low"

export type Alert = {
  id: number
  market: string
  fixture: string
  date: string
  type: string
  time: string
  taken: string
  current: string
  marketAv: string
  comp: string
  sf: string
  liability: string
  recommendation: string
  severity: AlertSeverity
  status?: string
}

export type AlertFilters = {
  severity: string[]
  type: string[]
  sport: string[]
  dateRange: {
    start: string | null
    end: string | null
  }
  search: string
}
