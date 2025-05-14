export interface User {
  id: string
  name: string
  email: string
  role: string
}

export interface AuditEventDetails {
  before?: Record<string, any>
  after?: Record<string, any>
  reason?: string
  notes?: string
  [key: string]: any
}

export interface AuditEvent {
  id: string
  timestamp: string
  user: User
  action: string
  resource: string
  resourceId: string
  resourceName: string
  details: AuditEventDetails
}

export interface AuditFilters {
  startDate: Date
  endDate: Date
  users: string[]
  actions: string[]
  resources: string[]
  searchTerm: string
}

export interface AuditState {
  events: AuditEvent[]
  filteredEvents: AuditEvent[]
  filters: AuditFilters
  selectedEvent: AuditEvent | null
  isLoading: boolean
  error: string | null
}
