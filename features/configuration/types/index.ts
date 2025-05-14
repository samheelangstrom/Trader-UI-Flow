export interface Configuration {
  id: number
  sport: string
  marketClass: string
  market: string
  player: string
  threshold: string
  lastUpdated: string
  status: string
  notes?: string
  history?: {
    date: string
    threshold: string
    reason?: string
    movedFrom?: string
    movedTo?: string
  }[]
}

export interface ConfigurationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (config: Configuration) => void
  editingConfig: Configuration | null
}

export interface ConfigurationDetailsProps {
  config: Configuration | null
  isOpen: boolean
  onClose: () => void
}

export interface ConfigurationTableProps {
  configurations: Configuration[]
  onEdit: (config: Configuration) => void
  onViewDetails: (config: Configuration) => void
}

export interface ConfigurationFiltersProps {
  onFilterChange: (filters: any) => void
}
