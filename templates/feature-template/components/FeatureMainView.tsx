"use client"

/**
 * Feature Main View
 *
 * This is the main component for the feature.
 * It combines the filters, table, and other UI elements.
 */

import { useEffect } from "react"
import { FeatureFilters } from "./FeatureFilters"
import { FeatureTable } from "./FeatureTable"
import { FeatureDetailsModal } from "./FeatureDetailsModal"
import { useFeature } from "../context/FeatureContext"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function FeatureMainView() {
  const { state, actions } = useFeature()
  const { isLoading, error, selectedItem } = state

  // Fetch items on component mount
  useEffect(() => {
    actions.fetchItems()
  }, [actions])

  // Handle creating a new item
  const handleCreateNew = () => {
    // Create an empty item and select it
    actions.selectItem({
      id: "",
      name: "",
      description: "",
      status: "inactive",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {},
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Feature Management</h1>
        <Button onClick={handleCreateNew}>Create New</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <FeatureFilters />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Items</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-4">Loading...</div>
          ) : error ? (
            <div className="text-red-500 p-4">{error}</div>
          ) : (
            <FeatureTable />
          )}
        </CardContent>
      </Card>

      {selectedItem && <FeatureDetailsModal />}
    </div>
  )
}
