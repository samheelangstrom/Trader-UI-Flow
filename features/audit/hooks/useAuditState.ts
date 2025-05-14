"use client"

import { useState, useEffect, useCallback } from "react"
import type { AuditEvent, AuditFilters, AuditState } from "../types"

// Mock data for development
const mockAuditEvents: AuditEvent[] = [
  {
    id: "audit-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    user: {
      id: "user-1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Trader",
    },
    action: "margin_change",
    resource: "margin",
    resourceId: "market-123",
    resourceName: "NBA - Lakers vs Celtics - Moneyline",
    details: {
      before: { value: 0.05 },
      after: { value: 0.07 },
      reason: "Adjusting for increased volume",
    },
  },
  {
    id: "audit-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    user: {
      id: "user-2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      role: "Admin",
    },
    action: "suspend",
    resource: "market",
    resourceId: "market-456",
    resourceName: "NFL - Chiefs vs Eagles - Total Points",
    details: {
      reason: "Suspicious betting pattern detected",
      notes: "Multiple large bets placed within 2 minutes",
    },
  },
  {
    id: "audit-3",
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    user: {
      id: "user-3",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "Risk Manager",
    },
    action: "configuration_change",
    resource: "configuration",
    resourceId: "config-789",
    resourceName: "Global Risk Limits",
    details: {
      before: { maxBet: 1000 },
      after: { maxBet: 1500 },
      reason: "Seasonal adjustment for playoffs",
    },
  },
  {
    id: "audit-4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    user: {
      id: "user-1",
      name: "John Smith",
      email: "john.smith@example.com",
      role: "Trader",
    },
    action: "update",
    resource: "player",
    resourceId: "player-101",
    resourceName: "LeBron James - Points",
    details: {
      before: { line: 25.5, odds: -110 },
      after: { line: 26.5, odds: -110 },
      reason: "Injury report update",
    },
  },
  {
    id: "audit-5",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    user: {
      id: "user-4",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "System Admin",
    },
    action: "create",
    resource: "fixture",
    resourceId: "fixture-202",
    resourceName: "NBA - Warriors vs Nets",
    details: {
      notes: "Added to schedule for next week",
    },
  },
]

const defaultFilters: AuditFilters = {
  startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
  endDate: new Date(),
  users: [],
  actions: [],
  resources: [],
  searchTerm: "",
}

export function useAuditState(): AuditState & {
  setFilters: (filters: Partial<AuditFilters>) => void
  selectEvent: (event: AuditEvent | null) => void
  refreshData: () => void
} {
  const [state, setState] = useState<AuditState>({
    events: mockAuditEvents, // Initialize with mock data immediately
    filteredEvents: mockAuditEvents, // Initialize filtered events with all events
    filters: defaultFilters,
    selectedEvent: null,
    isLoading: false, // Set to false since we're using mock data
    error: null,
  })

  const fetchAuditEvents = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }))

    try {
      // In a real app, this would be an API call
      // For now, we'll use mock data with a simulated delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      setState((prev) => ({
        ...prev,
        events: mockAuditEvents,
        filteredEvents: mockAuditEvents, // Make sure to set filteredEvents too
        isLoading: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: "Failed to load audit events",
        isLoading: false,
      }))
    }
  }, [])

  const applyFilters = useCallback(() => {
    const { events, filters } = state

    let filtered = [...events]

    // Apply date filters
    if (filters.startDate) {
      filtered = filtered.filter((event) => new Date(event.timestamp) >= filters.startDate!)
    }

    if (filters.endDate) {
      filtered = filtered.filter((event) => new Date(event.timestamp) <= filters.endDate!)
    }

    // Apply user filters
    if (filters.users.length > 0) {
      filtered = filtered.filter((event) => filters.users.includes(event.user.id))
    }

    // Apply action filters
    if (filters.actions.length > 0) {
      filtered = filtered.filter((event) => filters.actions.includes(event.action))
    }

    // Apply resource filters
    if (filters.resources.length > 0) {
      filtered = filtered.filter((event) => filters.resources.includes(event.resource))
    }

    // Apply search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.resourceName.toLowerCase().includes(term) ||
          event.user.name.toLowerCase().includes(term) ||
          event.user.email.toLowerCase().includes(term) ||
          (event.details.reason && event.details.reason.toLowerCase().includes(term)) ||
          (event.details.notes && event.details.notes.toLowerCase().includes(term)),
      )
    }

    setState((prev) => ({
      ...prev,
      filteredEvents: filtered,
    }))
  }, [state])

  // Initial data fetch
  useEffect(() => {
    fetchAuditEvents()
  }, [fetchAuditEvents])

  // Apply filters whenever events or filters change
  useEffect(() => {
    applyFilters()
  }, [state.events, state.filters, applyFilters])

  const setFilters = useCallback((newFilters: Partial<AuditFilters>) => {
    setState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...newFilters,
      },
    }))
  }, [])

  const selectEvent = useCallback((event: AuditEvent | null) => {
    setState((prev) => ({
      ...prev,
      selectedEvent: event,
    }))
  }, [])

  const refreshData = useCallback(() => {
    fetchAuditEvents()
  }, [fetchAuditEvents])

  return {
    ...state,
    setFilters,
    selectEvent,
    refreshData,
  }
}
