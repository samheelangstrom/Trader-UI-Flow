"use client"

import Link from "next/link"
import { useState } from "react"
import Sidebar from "@/components/sidebar"
import TopNavigation from "@/components/top-navigation"
import { ConfigurationModal, type Configuration } from "@/components/ConfigurationModal"
import { ConfigurationDetails } from "@/features/configuration/components/ConfigurationDetails"
import { useConfigurationState } from "@/features/configuration/hooks/useConfigurationState"
import { AutoLineMovementView } from "@/features/auto-line-mover/components/AutoLineMovementView"

// Sample data
const sampleConfigurations: Configuration[] = [
  {
    id: 1,
    sport: "Basketball",
    marketClass: "Player Props",
    market: "Points",
    player: "LeBron James",
    threshold: "0.05",
    lastUpdated: "Apr 23, 2025",
    status: "Active",
    history: [
      {
        date: "Apr 23, 2025",
        threshold: "0.05",
        reason: "Adjusted for playoff performance",
      },
      {
        date: "Mar 15, 2025",
        threshold: "0.03",
        reason: "Initial threshold setting",
      },
    ],
  },
  {
    id: 2,
    sport: "Basketball",
    marketClass: "Moneyline",
    market: "Player Moneyline",
    player: "LeBron James",
    threshold: "0.05",
    lastUpdated: "Apr 23, 2025",
    status: "Inactive",
    history: [
      {
        date: "Apr 23, 2025",
        threshold: "0.05",
        reason: "Adjusted for market conditions",
        movedFrom: "0.04",
        movedTo: "0.05",
      },
      {
        date: "Feb 10, 2025",
        threshold: "0.04",
        reason: "Initial threshold setting",
        movedFrom: "N/A",
        movedTo: "0.04",
      },
    ],
  },
  {
    id: 3,
    sport: "Baseball",
    marketClass: "Moneyline",
    market: "Player Moneyline",
    player: "LeBron James",
    threshold: "0.05",
    lastUpdated: "Apr 23, 2025",
    status: "Active",
    history: [
      {
        date: "Apr 23, 2025",
        threshold: "0.05",
        reason: "Standardizing across sports",
        movedFrom: "0.06",
        movedTo: "0.05",
      },
      {
        date: "Jan 5, 2025",
        threshold: "0.06",
        reason: "Initial threshold setting",
        movedFrom: "N/A",
        movedTo: "0.06",
      },
    ],
  },
]

export default function GlobalConfigurationPage() {
  const [activeTab, setActiveTab] = useState("auto-line-mover")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({})

  const {
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
  } = useConfigurationState(sampleConfigurations)

  return (
    <div className="bg-[#f2f2f2] min-h-screen text-[#2b2c2d] flex">
      <Sidebar />

      <div className="flex-1">
        <TopNavigation activeTab="MLB" />

        <div className="max-w-7xl mx-auto p-4">
          <div className="mb-2">
            <div className="flex items-center text-sm text-[#5f6368]">
              <Link href="/" className="hover:text-[#2b2c2d]">
                All Products
              </Link>
              <span className="mx-2">›</span>
              <Link href="/settings" className="hover:text-[#2b2c2d]">
                Settings
              </Link>
              <span className="mx-2">›</span>
              <span className="text-[#2b2c2d]">Global Configuration</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-6 pb-4 border-b border-[#dcdddf]">Global Configuration</h1>

          <div className="flex gap-4">
            <div className="w-64 flex-shrink-0 mr-4">
              <div className="bg-white rounded-md overflow-hidden">
                <div className="p-3 bg-[#f1f2f3] font-medium">Settings</div>
                <div className="divide-y divide-[#dcdddf]">
                  <div
                    className="p-3 hover:bg-[#f9f9f9] cursor-pointer bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                    onClick={() => setActiveTab("auto-line-mover")}
                  >
                    Auto Line Mover
                  </div>
                  <div className="p-3 hover:bg-[#f9f9f9] cursor-pointer" onClick={() => setActiveTab("alerting")}>
                    Alerting
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-md overflow-hidden">
                {activeTab === "auto-line-mover" && <AutoLineMovementView />}

                {activeTab === "alerting" && (
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">Alerting Configuration</h2>
                    <p className="text-gray-500">Configure global alerting settings</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfigurationDetails
        config={viewingConfig}
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
      />

      <ConfigurationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveConfig}
        editingConfig={editingConfig}
      />
    </div>
  )
}
