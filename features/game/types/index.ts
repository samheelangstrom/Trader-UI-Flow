export type Team = {
  id: string
  name: string
  abbreviation: string
  logo: string
  score?: number
}

export type GameStatus = "scheduled" | "in_progress" | "finished" | "postponed" | "cancelled"

export type GamePeriod = "Q1" | "Q2" | "Q3" | "Q4" | "OT" | "Half" | "Final"

export type GameStats = {
  timeoutsLeft: number[]
  fouls: number[]
  twoPoints: number[]
  threePoints: number[]
  freeThrows: string[]
  quarterScores: {
    period: string
    scores: number[]
  }[]
}

export type Market = {
  id: string
  name: string
  type: string
  selections: {
    id: string
    name: string
    price: string
    status: "open" | "suspended" | "settled"
  }[]
  status: "open" | "suspended" | "settled"
}

export type Alert = {
  id: number
  market: string
  homeTeam: string
  awayTeam: string
  date: string
  badge: string
  time: string
  taken: string
  current: string
  marketAv: string
  comp: string
  recommendation: string
  severity: "high" | "medium" | "low"
  details: {
    marketId: string
    timestamp: string
    triggerReason: string
    liability: string
    stakeFactor: string
    riskLevel: string
    previousAlerts: number
  }
}

export type Game = {
  id: string
  homeTeam: Team
  awayTeam: Team
  date: string
  time: string
  status: GameStatus
  period?: GamePeriod
  timeRemaining?: string
  stats?: GameStats
  markets?: Market[]
  alerts?: Alert[]
}
