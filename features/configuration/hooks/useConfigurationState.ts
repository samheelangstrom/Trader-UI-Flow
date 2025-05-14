"use client"

import { useState } from "react"
import type { Configuration } from "../types"

export function useConfigurationState(initialConfigurations: Configuration[] = []) {
  const [configurations, setConfigurations] = useState<Configuration[]>(initialConfigurations)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [editingConfig, setEditingConfig] = useState<Configuration | null>(null)
  const [viewingConfig, setViewingConfig] = useState<Configuration | null>(null)

  const handleAddConfig = () => {
    setEditingConfig(null)
    setIsModalOpen(true)
  }

  const handleEditConfig = (config: Configuration) => {
    setEditingConfig(config)
    setIsModalOpen(true)
  }

  const handleViewDetails = (config: Configuration) => {
    setViewingConfig(config)
    setIsDetailsModalOpen(true)
  }

  const handleSaveConfig = (newConfig: Configuration) => {
    if (editingConfig) {
      // Update existing config
      setConfigurations(configurations.map((config) => (config.id === newConfig.id ? newConfig : config)))
    } else {
      // Add new config
      setConfigurations([...configurations, newConfig])
    }
    setIsModalOpen(false)
  }

  return {
    configurations,
    editingConfig,
    viewingConfig,
    isModalOpen,
    isDetailsModalOpen,
    handleAddConfig,
    handleEditConfig,
    handleViewDetails,
    handleSaveConfig,
    setIsModalOpen,
    setIsDetailsModalOpen,
  }
}
