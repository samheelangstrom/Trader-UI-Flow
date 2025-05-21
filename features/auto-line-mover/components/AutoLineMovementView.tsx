"use client"
import { Plus, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MarketToggleGrid } from "./MarketToggleGrid"

export function AutoLineMovementView() {
  return (
    <div className="space-y-4">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Auto Line Mover Configuration</h2>
            <p className="text-sm text-gray-500">
              Configure which markets should have automatic line movement based on liability
            </p>
          </div>
          <Button className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-md">
            <Plus className="h-4 w-4" />
            <span>Add Rule</span>
          </Button>
        </div>

        <Alert className="mb-4 bg-yellow-50 border-yellow-500 text-yellow-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="flex items-center">
            <span className="ml-2">
              Automatic line movement will adjust odds without human intervention. Use with caution.
            </span>
          </AlertDescription>
        </Alert>
      </div>

      <MarketToggleGrid />
    </div>
  )
}
