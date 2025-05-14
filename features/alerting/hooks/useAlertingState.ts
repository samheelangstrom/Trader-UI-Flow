"use client"

import { useState } from "react"
import type { AlertingConfiguration } from "../types"

export function useAlertingState(initialConfigurations: AlertingConfiguration[] = []) {
  const [configurations, setConfigurations] = useState<AlertingConfiguration[]>(initialConfigurations)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingConfig, setEditingConfig] = useState<AlertingConfiguration | null>(null)
  const [filters, setFilters] = useState<Record<string, any>>({})

  const handleAddConfig = () => {
    setEditingConfig(null)
    setIsModalOpen(true)
  }

  const handleEditConfig = (config: AlertingConfiguration) => {
    setEditingConfig(config)
    setIsModalOpen(true)
  }

  const handleToggleConfig = (id: number, enabled: boolean) => {
    setConfigurations(configurations.map((config) => (config.id === id ? { ...config, enabled } : config)))
  }

  const handleDeleteConfig = (id: number) => {
    setConfigurations(configurations.filter((config) => config.id !== id))
  }

  const handleSaveConfig = (newConfig: AlertingConfiguration) => {
    if (editingConfig) {
      // Update existing config
      setConfigurations(configurations.map((config) => (config.id === newConfig.id ? newConfig : config)))
    } else {
      // Add new config
      setConfigurations([
        ...configurations,
        {
          ...newConfig,
          id: Math.floor(Math.random() * 1000),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: "Current User",
          updatedBy: "Current User",
        },
      ])
    }
    setIsModalOpen(false)
  }

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters({ ...filters, ...newFilters })
  }

  const filteredConfigurations = configurations.filter((config) => {
    // Apply filters
    if (filters.sport && config.sport !== filters.sport && filters.sport !== "all") return false
    if (filters.enabled !== undefined && config.enabled !== filters.enabled) return false
    return true
  })

  return {
    configurations: filteredConfigurations,
    editingConfig,
    isModalOpen,
    handleAddConfig,
    handleEditConfig,
    handleToggleConfig,
    handleDeleteConfig,
    handleSaveConfig,
    setIsModalOpen,
    handleFilterChange,
  }
}
