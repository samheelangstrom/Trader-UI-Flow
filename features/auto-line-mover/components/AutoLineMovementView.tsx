"use client"
import { Plus, AlertTriangle, Info, LayoutGrid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AutoLineMovementRuleTable } from "./AutoLineMovementRuleTable"
import { AutoLineMovementRuleModal } from "./AutoLineMovementRuleModal"
import { AutoLineMovementFilters } from "./AutoLineMovementFilters"
import { MarketToggleGrid } from "./MarketToggleGrid"
import { useAutoLineMovementState } from "../hooks/useAutoLineMovementState"
import type { AutoLineMovementRule } from "../types"

// Sample data
const sampleRules: AutoLineMovementRule[] = [
  {
    id: "1",
    sport: "Basketball",
    marketClass: "Player Props",
    market: "Points",
    mode: "Automatic",
    maxMovement: 0.5,
    thresholdPercentage: 15,
    createdAt: "2025-05-01T10:00:00Z",
    updatedAt: "2025-05-01T10:00:00Z",
    createdBy: "John Doe",
    priority: 1,
    notes: "Automatic line movement for NBA player points",
  },
  {
    id: "2",
    sport: "Basketball",
    marketClass: "Moneyline",
    mode: "Recommendation",
    maxMovement: 0.3,
    thresholdPercentage: 20,
    createdAt: "2025-05-01T09:00:00Z",
    updatedAt: "2025-05-01T09:00:00Z",
    createdBy: "John Doe",
    priority: 2,
    notes: "Recommendations only for NBA moneyline",
  },
  {
    id: "3",
    sport: "Football",
    mode: "Disabled",
    createdAt: "2025-05-01T08:00:00Z",
    updatedAt: "2025-05-01T08:00:00Z",
    createdBy: "Jane Smith",
    priority: 3,
    notes: "Disabled for all football markets",
  },
  {
    id: "4",
    sport: "All Sports",
    marketClass: "Player Props",
    market: "Assists",
    mode: "Automatic",
    maxMovement: 0.2,
    thresholdPercentage: 10,
    createdAt: "2025-05-01T07:00:00Z",
    updatedAt: "2025-05-01T07:00:00Z",
    createdBy: "Jane Smith",
    priority: 4,
    notes: "Automatic line movement for assists across all sports",
  },
]

export function AutoLineMovementView() {
  const {
    rules,
    editingRule,
    isModalOpen,
    handleAddRule,
    handleEditRule,
    handleDeleteRule,
    handleToggleMode,
    handleSaveRule,
    setIsModalOpen,
    handleFilterChange,
  } = useAutoLineMovementState(sampleRules)

  return (
    <div className="space-y-4">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Auto Line Mover Configuration</h2>
            <p className="text-sm text-[#5f6368]">
              Configure which markets should have automatic line movement based on liability
            </p>
          </div>
          <Button
            className="flex items-center gap-2 px-3 py-2 bg-[#2b2c2d] text-white rounded-md"
            onClick={handleAddRule}
          >
            <Plus className="h-4 w-4" />
            <span>Add Rule</span>
          </Button>
        </div>

        <Alert className="mb-4 bg-[#fffbeb] border-[#f59e0b] text-[#92400e]">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center">
            <span className="ml-2">
              Automatic line movement will adjust odds without human intervention. Use with caution.
            </span>
          </AlertDescription>
        </Alert>

        <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-md p-4 mb-4">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-[#0284c7] mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-[#0284c7]">How Auto Line Mover Works</h3>
              <p className="text-sm text-[#0369a1] mt-1">
                The Auto Line Mover system automatically adjusts betting lines based on liability imbalances:
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm text-[#0369a1] space-y-1">
                <li>
                  <strong>Automatic mode:</strong> System will move lines without human intervention when liability
                  threshold is reached
                </li>
                <li>
                  <strong>Recommendation mode:</strong> System will suggest line movements but require trader approval
                </li>
                <li>
                  <strong>Disabled mode:</strong> No automatic line movement or recommendations for these markets
                </li>
              </ul>
              <p className="text-sm text-[#0369a1] mt-2">
                Rules are applied in order of specificity, with more specific rules taking precedence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="px-4 mb-4">
          <TabsList>
            <TabsTrigger value="grid" className="flex items-center gap-1">
              <LayoutGrid className="h-4 w-4" />
              <span>Market Grid</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-1">
              <List className="h-4 w-4" />
              <span>Rules Table</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="grid" className="mt-0">
          <MarketToggleGrid />
        </TabsContent>

        <TabsContent value="rules" className="mt-0">
          <div className="bg-white rounded-md overflow-hidden border border-[#dcdddf]">
            <AutoLineMovementFilters onFilterChange={handleFilterChange} />
            <AutoLineMovementRuleTable
              rules={rules}
              onEdit={handleEditRule}
              onDelete={handleDeleteRule}
              onToggleMode={handleToggleMode}
            />
          </div>
        </TabsContent>
      </Tabs>

      <AutoLineMovementRuleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveRule}
        editingRule={editingRule}
      />
    </div>
  )
}
