export type SportType = "basketball" | "football" | "baseball" | "hockey" | "soccer" | "all"
export type SelectionType = "all" | "single" | "multiple"
export type AlertType = "custom" | "arb" | "sharp" | "value" | "alm"
export type TimeWindowUnit = "seconds" | "minutes" | "hours"

export interface TimeRange {
  id: string
  name: string
  startMinutes: number
  endMinutes: number
  threshold: number
  enabled: boolean
  // New fields for bet frequency and volume
  betCountThreshold: number
  timeWindowValue: number
  timeWindowUnit: TimeWindowUnit
}

export interface AlertingConfiguration {
  id: number
  name: string
  description?: string
  alertType: AlertType
  sport: SportType
  leagues: {
    selectionType: SelectionType
    selected: string[]
  }
  marketClasses: {
    selectionType: SelectionType
    selected: string[]
  }
  markets: {
    selectionType: SelectionType
    selected: string[]
  }
  players: {
    selectionType: SelectionType
    selected: string[]
  }
  customerFactorRange: {
    min: number
    max: number
  }
  timeRanges: TimeRange[]
  defaultRange: {
    threshold: number
    enabled: boolean
    // New fields for default range
    betCountThreshold: number
    timeWindowValue: number
    timeWindowUnit: TimeWindowUnit
  }
  expirationSettings: {
    timeToExpire: number // in seconds, 0 means never expire
    neverExpire: boolean
    dropBetsAfterExpiration: boolean
    expireOldAlerts: boolean
  }
  enabled: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface AlertingConfigurationTableProps {
  configurations: AlertingConfiguration[]
  onEdit: (config: AlertingConfiguration) => void
  onToggle: (id: number, enabled: boolean) => void
  onDelete: (id: number) => void
}

export interface AlertingConfigurationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (config: AlertingConfiguration) => void
  editingConfig: AlertingConfiguration | null
}

export interface AlertingFiltersProps {
  onFilterChange: (filters: any) => void
}
