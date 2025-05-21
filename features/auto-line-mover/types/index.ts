export type AutoLineMovementMode = "Automatic" | "Recommendation" | "Disabled"

export interface AutoLineMovementRule {
  id: string
  sport: string
  marketClass?: string
  market?: string
  player?: string
  mode: AutoLineMovementMode
  maxMovement?: number // Maximum allowed movement in percentage or points
  thresholdPercentage?: number // Liability threshold percentage that triggers movement
  createdAt: string
  updatedAt: string
  createdBy: string
  priority: number // Higher priority rules override lower ones
  notes?: string
}

export interface AutoLineMovementRuleFormValues {
  sport: string
  marketClass?: string
  market?: string
  player?: string
  mode: AutoLineMovementMode
  maxMovement?: number
  thresholdPercentage?: number
  notes?: string
}

export interface AutoLineMovementRuleModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (rule: AutoLineMovementRuleFormValues) => void
  editingRule: AutoLineMovementRule | null
}

export interface AutoLineMovementRuleTableProps {
  rules: AutoLineMovementRule[]
  onEdit: (rule: AutoLineMovementRule) => void
  onDelete: (ruleId: string) => void
  onToggleMode: (ruleId: string, mode: AutoLineMovementMode) => void
}

export interface AutoLineMovementFiltersProps {
  onFilterChange: (filters: any) => void
}
