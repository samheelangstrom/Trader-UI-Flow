"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFixturesState } from "@/features/fixtures/hooks/useFixturesState"
import { FixtureFilters } from "@/features/fixtures/components/FixtureFilters"
import { FixtureTable } from "@/features/fixtures/components/FixtureTable"
import { FixtureSummary } from "@/features/fixtures/components/FixtureSummary"
import { SuspensionView } from "@/features/fixtures/components/SuspensionView"
import { AlertingView } from "@/features/fixtures/components/AlertingView"

export default function FixturesPage() {
  const { fixtures, filteredFixtures, filters, isLoading, setFilters, togglePinFixture, refreshFixtures } =
    useFixturesState()

  const [activeTab, setActiveTab] = useState("fixtures")

  // Calculate active filter count
  const activeFilterCount =
    filters.sport.length +
    filters.league.length +
    filters.status.length +
    (filters.dateRange.start ? 1 : 0) +
    (filters.dateRange.end ? 1 : 0) +
    (filters.search ? 1 : 0)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Fixtures</h1>
        <p className="text-gray-500">Manage and monitor all fixtures across different sports and leagues</p>
      </div>

      <FixtureSummary fixtures={fixtures} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="fixtures">Fixtures</TabsTrigger>
          <TabsTrigger value="suspensions">Suspensions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="fixtures" className="space-y-4">
          <FixtureFilters filters={filters} onFilterChange={setFilters} activeFilterCount={activeFilterCount} />
          <FixtureTable
            fixtures={filteredFixtures}
            isLoading={isLoading}
            onTogglePin={togglePinFixture}
            onRefresh={refreshFixtures}
          />
        </TabsContent>

        <TabsContent value="suspensions">
          <SuspensionView />
        </TabsContent>

        <TabsContent value="alerts">
          <AlertingView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
