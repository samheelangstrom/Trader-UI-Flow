"use client"

import { useState } from "react"
import { AuditTable, AuditFilters, AuditDetailsModal } from "@/features/audit"
import { useAuditState } from "@/features/audit"
import type { AuditEvent } from "@/features/audit"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList } from "lucide-react"

export default function AuditPage() {
  const { filteredEvents, filters, selectedEvent, isLoading, setFilters, selectEvent, refreshData } = useAuditState()

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const handleViewDetails = (event: AuditEvent) => {
    selectEvent(event)
    setIsDetailsModalOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false)
  }

  const handleResetFilters = () => {
    setFilters({
      startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      endDate: new Date(),
      users: [],
      actions: [],
      resources: [],
      searchTerm: "",
    })
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <ClipboardList className="h-8 w-8 mr-3 text-[#eb6a2e]" />
          <div>
            <h1 className="text-2xl font-bold">Audit Log</h1>
            <p className="text-gray-500">Track all changes and actions across the platform</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AuditFilters filters={filters} onFilterChange={setFilters} onReset={handleResetFilters} />
          <AuditTable
            events={filteredEvents}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
            onRefresh={refreshData}
          />
        </TabsContent>
        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Changes</CardTitle>
              <CardDescription>View all changes made to system configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <AuditTable
                events={filteredEvents.filter((event) => event.resource === "configuration")}
                isLoading={isLoading}
                onViewDetails={handleViewDetails}
                onRefresh={refreshData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="markets">
          <Card>
            <CardHeader>
              <CardTitle>Market Changes</CardTitle>
              <CardDescription>View all changes made to markets, fixtures, and players</CardDescription>
            </CardHeader>
            <CardContent>
              <AuditTable
                events={filteredEvents.filter((event) => ["market", "fixture", "player"].includes(event.resource))}
                isLoading={isLoading}
                onViewDetails={handleViewDetails}
                onRefresh={refreshData}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>View all user login, logout, and account changes</CardDescription>
            </CardHeader>
            <CardContent>
              <AuditTable
                events={filteredEvents.filter(
                  (event) => event.resource === "user" || ["login", "logout"].includes(event.action),
                )}
                isLoading={isLoading}
                onViewDetails={handleViewDetails}
                onRefresh={refreshData}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AuditDetailsModal event={selectedEvent} isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal} />
    </div>
  )
}
