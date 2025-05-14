"use client"

import { useState, useCallback, useMemo } from "react"
import type { Alert, AlertFilters } from "../types"

const defaultFilters: AlertFilters = {
  severity: [],
  type: [],
  sport: [],
  dateRange: {
    start: null,
    end: null,
  },
  search: "",
}

export function useAlertsState(initialAlerts: Alert[] = []) {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [filters, setFilters] = useState<AlertFilters>(defaultFilters)

  // Filter alerts based on current filters
  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      // Filter by severity
      if (filters.severity.length > 0 && !filters.severity.includes(alert.severity)) {
        return false
      }

      // Filter by type
      if (filters.type.length > 0 && !filters.type.includes(alert.type)) {
        return false
      }

      // Filter by sport (based on fixture name)
      if (filters.sport.length > 0) {
        const sportMatches = filters.sport.some((sport) => {
          if (
            sport === "NBA" &&
            (alert.fixture.includes("Lakers") ||
              alert.fixture.includes("Celtics") ||
              alert.fixture.includes("Bulls") ||
              alert.fixture.includes("Nets"))
          ) {
            return true
          }
          if (sport === "NFL" && (alert.fixture.includes("Cowboys") || alert.fixture.includes("Eagles"))) {
            return true
          }
          if (sport === "MLB" && (alert.fixture.includes("Braves") || alert.fixture.includes("Cardinals"))) {
            return true
          }
          return false
        })

        if (!sportMatches) {
          return false
        }
      }

      // Filter by search term
      if (
        filters.search &&
        !alert.fixture.toLowerCase().includes(filters.search.toLowerCase()) &&
        !alert.market.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      return true
    })
  }, [alerts, filters])

  // Alert actions
  const dismissAlert = useCallback(
    (id: number) => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id))
      if (selectedAlert && selectedAlert.id === id) {
        setSelectedAlert(null)
      }
    },
    [selectedAlert],
  )

  const acceptAlert = useCallback(
    (id: number) => {
      // In a real app, you would update the alert status in the backend
      // For now, we'll just remove it from the list
      dismissAlert(id)
    },
    [dismissAlert],
  )

  const suspendAlert = useCallback((id: number) => {
    // In a real app, you would update the alert status in the backend
    setAlerts((prevAlerts) => prevAlerts.map((alert) => (alert.id === id ? { ...alert, status: "suspended" } : alert)))
  }, [])

  return {
    alerts,
    filteredAlerts,
    selectedAlert,
    setSelectedAlert,
    filters,
    setFilters,
    dismissAlert,
    acceptAlert,
    suspendAlert,
  }
}
