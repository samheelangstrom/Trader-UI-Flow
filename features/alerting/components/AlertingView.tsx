"use client"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlertingFilters } from "./AlertingFilters"
import { AlertingConfigurationTable } from "./AlertingConfigurationTable"
import { AlertingConfigurationModal } from "./AlertingConfigurationModal"
import { useAlertingState } from "../hooks/useAlertingState"
import type { AlertingConfiguration } from "../types"

// Sample data
const sampleAlertingConfigurations: AlertingConfiguration[] = [
  {
    id: 1,
    name: "Basketball Pre-Game Alert",
    description: "Monitors pre-game betting activity for basketball games",
    sport: "basketball",
    leagues: {
      selectionType: "multiple",
      selected: ["NBA", "NCAA"],
    },
    marketClasses: {
      selectionType: "all",
      selected: [],
    },
    markets: {
      selectionType: "multiple",
      selected: ["Point Spread", "Over/Under"],
    },
    players: {
      selectionType: "all",
      selected: [],
    },
    customerFactorRange: {
      min: 20,
      max: 80,
    },
    timeRanges: [
      {
        id: "1",
        name: "24-12 Hours Before",
        startMinutes: 1440,
        endMinutes: 720,
        threshold: 10,
        enabled: true,
      },
      {
        id: "2",
        name: "12-6 Hours Before",
        startMinutes: 720,
        endMinutes: 360,
        threshold: 8,
        enabled: true,
      },
      {
        id: "3",
        name: "6-1 Hours Before",
        startMinutes: 360,
        endMinutes: 60,
        threshold: 5,
        enabled: true,
      },
    ],
    defaultRange: {
      threshold: 15,
      enabled: true,
    },
    expirationSettings: {
      timeToExpire: 3600,
      neverExpire: false,
      dropBetsAfterExpiration: true,
      expireOldAlerts: true,
    },
    enabled: true,
    createdAt: "2023-05-15T10:30:00Z",
    updatedAt: "2023-05-16T14:45:00Z",
    createdBy: "Admin User",
    updatedBy: "Admin User",
  },
  {
    id: 2,
    name: "Football Live Betting Alert",
    description: "Monitors in-play betting activity for football games",
    sport: "football",
    leagues: {
      selectionType: "all",
      selected: [],
    },
    marketClasses: {
      selectionType: "single",
      selected: ["Moneyline"],
    },
    markets: {
      selectionType: "all",
      selected: [],
    },
    players: {
      selectionType: "all",
      selected: [],
    },
    customerFactorRange: {
      min: 0,
      max: 100,
    },
    timeRanges: [
      {
        id: "1",
        name: "First Quarter",
        startMinutes: 45,
        endMinutes: 30,
        threshold: 7,
        enabled: true,
      },
      {
        id: "2",
        name: "Second Quarter",
        startMinutes: 30,
        endMinutes: 15,
        threshold: 6,
        enabled: true,
      },
    ],
    defaultRange: {
      threshold: 10,
      enabled: true,
    },
    expirationSettings: {
      timeToExpire: 0,
      neverExpire: true,
      dropBetsAfterExpiration: false,
      expireOldAlerts: false,
    },
    enabled: true,
    createdAt: "2023-06-10T08:15:00Z",
    updatedAt: "2023-06-12T11:20:00Z",
    createdBy: "Admin User",
    updatedBy: "Admin User",
  },
]

export function AlertingView() {
  const {
    configurations,
    editingConfig,
    isModalOpen,
    handleAddConfig,
    handleEditConfig,
    handleToggleConfig,
    handleDeleteConfig,
    handleSaveConfig,
    setIsModalOpen,
    handleFilterChange,
  } = useAlertingState(sampleAlertingConfigurations)

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b border-[#dcdddf]">
        <div>
          <h1 className="text-2xl font-bold">Alerting Configuration</h1>
          <p className="text-sm text-[#5f6368]">Configure alerts for betting activity monitoring</p>
        </div>
        <Button onClick={handleAddConfig} className="bg-[#2b2c2d] hover:bg-[#1a1a1a]">
          <Plus className="h-4 w-4 mr-2" />
          Add Alert
        </Button>
      </div>

      <AlertingFilters onFilterChange={handleFilterChange} />

      <div className="flex-1 overflow-auto">
        <AlertingConfigurationTable
          configurations={configurations}
          onEdit={handleEditConfig}
          onToggle={handleToggleConfig}
          onDelete={handleDeleteConfig}
        />
      </div>

      <AlertingConfigurationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveConfig}
        editingConfig={editingConfig}
      />
    </div>
  )
}
