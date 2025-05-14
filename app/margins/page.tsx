"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  useMarginsState,
  MarginFilters,
  MarginConfigurationsTable,
  MarginPresets,
  MarginHistory,
  MarginConfigurationModal,
  MarginVisualization,
  type MarginConfiguration,
} from "@/features/margins"

// Mock options for filters
const sportOptions = [
  { id: "basketball", name: "Basketball" },
  { id: "football", name: "Football" },
  { id: "baseball", name: "Baseball" },
]

const leagueOptions = [
  { id: "basketball-nba", name: "NBA" },
  { id: "basketball-ncaa", name: "NCAA" },
  { id: "football-nfl", name: "NFL" },
  { id: "baseball-mlb", name: "MLB" },
]

const teamOptions = [
  { id: "basketball-nba-lakers", name: "Los Angeles Lakers" },
  { id: "basketball-nba-celtics", name: "Boston Celtics" },
  { id: "football-nfl-chiefs", name: "Kansas City Chiefs" },
  { id: "baseball-mlb-yankees", name: "New York Yankees" },
]

const marketTypeOptions = [
  { id: "moneyline", name: "Money Line" },
  { id: "spread", name: "Spread" },
  { id: "total", name: "Total" },
  { id: "player-props", name: "Player Props" },
]

export default function MarginsPage() {
  const {
    configurations,
    filteredConfigurations,
    presets,
    history,
    selectedConfiguration,
    filters,
    isLoading,
    setFilters,
    selectConfiguration,
    updateConfiguration,
    createConfiguration,
    deleteConfiguration,
    applyPreset,
  } = useMarginsState()

  const [activeTab, setActiveTab] = useState("configurations")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingConfiguration, setEditingConfiguration] = useState<MarginConfiguration | undefined>(undefined)

  // Handle edit configuration
  const handleEditConfiguration = (configuration: MarginConfiguration) => {
    setEditingConfiguration(configuration)
    setIsModalOpen(true)
  }

  // Handle create configuration
  const handleCreateConfiguration = () => {
    setEditingConfiguration(undefined)
    setIsModalOpen(true)
  }

  // Handle save configuration
  const handleSaveConfiguration = (configuration: Partial<MarginConfiguration>) => {
    if (editingConfiguration) {
      updateConfiguration(
        editingConfiguration.id,
        configuration.value || editingConfiguration.value,
        "Updated configuration",
      )
    } else {
      createConfiguration(configuration)
    }
  }

  // Handle reset filters
  const handleResetFilters = () => {
    setFilters({
      sport: [],
      league: [],
      team: [],
      marketType: [],
      search: "",
      showInherited: true,
    })
  }

  // Handle set default preset
  const handleSetDefaultPreset = (id: string) => {
    // In a real app, this would update the preset in the backend
    console.log(`Setting preset ${id} as default`)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Margins</h1>
        <p className="text-gray-500">Configure and manage margin settings across different sports and markets</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="configurations">Configurations</TabsTrigger>
          <TabsTrigger value="presets">Presets</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="configurations" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">Margin Configurations</h2>
              <p className="text-sm text-gray-500">
                Manage margin configurations for different sports, leagues, teams, and market types
              </p>
            </div>
            <Button onClick={handleCreateConfiguration}>
              <Plus className="mr-2 h-4 w-4" />
              New Configuration
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <MarginFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
                sportOptions={sportOptions}
                leagueOptions={leagueOptions}
                teamOptions={teamOptions}
                marketTypeOptions={marketTypeOptions}
              />

              <MarginConfigurationsTable
                configurations={filteredConfigurations}
                presets={presets}
                onEdit={handleEditConfiguration}
                onDelete={deleteConfiguration}
                onApplyPreset={applyPreset}
                onUpdateValue={(id, value, reason) => updateConfiguration(id, value, reason)}
              />
            </div>

            <div>
              <MarginVisualization configurations={configurations} onSelectConfiguration={selectConfiguration} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="presets" className="space-y-4">
          <MarginPresets
            presets={presets}
            onCreatePreset={(preset) => createConfiguration({ ...preset, name: preset.name || "" })}
            onUpdatePreset={(id, preset) => {
              if (preset.value !== undefined) {
                updateConfiguration(id, preset.value, `Updated preset: ${preset.name}`)
              }
            }}
            onDeletePreset={deleteConfiguration}
            onSetDefaultPreset={handleSetDefaultPreset}
          />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <MarginHistory history={history} />
        </TabsContent>
      </Tabs>

      <MarginConfigurationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveConfiguration}
        configuration={editingConfiguration}
        sportOptions={sportOptions}
        leagueOptions={leagueOptions}
        teamOptions={teamOptions}
        marketTypeOptions={marketTypeOptions}
      />
    </div>
  )
}
