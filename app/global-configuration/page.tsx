"use client"

import Link from "next/link"
import { useState } from "react"
import Sidebar from "@/components/sidebar"
import TopNavigation from "@/components/top-navigation"
import { ConfigurationModal, type Configuration } from "@/components/ConfigurationModal"
import { ConfigurationDetails } from "@/features/configuration/components/ConfigurationDetails"
import { useConfigurationState } from "@/features/configuration/hooks/useConfigurationState"
import { AutoLineMovementView } from "@/features/auto-line-mover/components/AutoLineMovementView"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  const [activeTab, setActiveTab] = useState("configured-markets")
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

  // Filter configurations based on search query and filters
  const filteredConfigurations = configurations.filter(
    (config) =>
      config.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.marketClass.toLowerCase().includes(searchQuery.toLowerCase()) ||
      config.market.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (config.player && config.player.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="bg-[#f2f2f2] min-h-screen text-[#2b2c2d] flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        <TopNavigation activeTab="MLB" />

        <div className="max-w-7xl mx-auto p-4">
          {/* Breadcrumb Navigation */}
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

          {/* Page Header */}
          <h1 className="text-2xl font-bold mb-6 pb-4 border-b border-[#dcdddf]">Global Configuration</h1>

          {/* Main Content */}
          <div className="flex gap-4">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0 mr-4">
              <div className="bg-white rounded-md overflow-hidden">
                <div className="p-3 bg-[#f1f2f3] font-medium">Settings</div>
                <div className="divide-y divide-[#dcdddf]">
                  {/* <div
                    className={`p-3 hover:bg-[#f9f9f9] cursor-pointer ${activeTab === "configured-markets" ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2" : ""}`}
                    onClick={() => setActiveTab("configured-markets")}
                  >
                    Manual Adjustment Threshold
                  </div>
                  <div
                    className={`p-3 hover:bg-[#f9f9f9] cursor-pointer ${
                      activeTab === "alerting"
                        ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                        : ""
                    }`}
                    onClick={() => setActiveTab("alerting")}
                  >
                    <div className="flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Alerting
                    </div>
                  </div>
                  <div
                    className={`p-3 hover:bg-[#f9f9f9] cursor-pointer ${
                      activeTab === "auto-line-mover"
                        ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                        : ""
                    }`}
                    onClick={() => setActiveTab("auto-line-mover")}
                  >
                    Auto Line Mover
                  </div>
                  <div
                    className={`p-3 hover:bg-[#f9f9f9] cursor-pointer ${
                      activeTab === "suspension-settings"
                        ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                        : ""
                    }`}
                    onClick={() => setActiveTab("suspension-settings")}
                  >
                    Suspension Settings
                  </div>
                  <div
                    className={`p-3 hover:bg-[#f9f9f9] cursor-pointer ${
                      activeTab === "security-settings"
                        ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                        : ""
                    }`}
                    onClick={() => setActiveTab("security-settings")}
                  >
                    Security Settings
                  </div>
                  <div
                    className={`p-3 hover:bg-[#f9f9f9] cursor-pointer ${
                      activeTab === "audit-log"
                        ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                        : ""
                    }`}
                    onClick={() => setActiveTab("audit-log")}
                  >
                    <div className="flex items-center">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Audit Log
                    </div>
                  </div>
                  <div
                    className={`p-3 hover:bg-[#f9f9f9] cursor-pointer ${
                      activeTab === "margin"
                        ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                        : ""
                    }`}
                    onClick={() => setActiveTab("margin")}
                  >
                    Margin
                  </div> */}
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-md overflow-hidden">
                <div className="container mx-auto p-4">
                  {/* <h1 className="text-2xl font-bold mb-6">Global Configuration</h1> */}

                  <Tabs defaultValue="auto-line-mover" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="auto-line-mover">Auto Line Mover</TabsTrigger>
                      <TabsTrigger value="alerting">Alerting</TabsTrigger>
                      <TabsTrigger value="margins">Margins</TabsTrigger>
                      <TabsTrigger value="suspensions">Suspensions</TabsTrigger>
                    </TabsList>

                    <TabsContent value="auto-line-mover">
                      <AutoLineMovementView />
                    </TabsContent>

                    <TabsContent value="alerting">
                      <div className="p-4 border rounded-md">
                        <h2 className="text-xl font-bold mb-2">Alerting Configuration</h2>
                        <p className="text-gray-500">Configure global alerting settings</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="margins">
                      <div className="p-4 border rounded-md">
                        <h2 className="text-xl font-bold mb-2">Margins Configuration</h2>
                        <p className="text-gray-500">Configure global margin settings</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="suspensions">
                      <div className="p-4 border rounded-md">
                        <h2 className="text-xl font-bold mb-2">Suspensions Configuration</h2>
                        <p className="text-gray-500">Configure global suspension settings</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                {/* Configured Markets Content */}
                {/* {activeTab === "configured-markets" && (
                  <>
                    {/* Filter Section */}
                {/* <ConfigurationFilters onFilterChange={setFilters} /> */}

                {/* Action Bar */}
                {/* <div className="p-4 flex justify-between items-center">
                      <div className="flex gap-4">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="All Fixtures" />
                          </SelectTrigger>
                          <SelectContent className="w-[300px]">
                            <SelectItem value="all">All Fixtures</SelectItem>
                            <div className="border-t border-[#dcdddf] my-1"></div>
                            <div className="py-2">
                              <div className="px-2 py-1.5 text-sm font-medium text-[#5f6368]">IN PLAY</div>
                              <SelectItem value="pho-cho">PHO @ CHO</SelectItem>
                              <SelectItem value="hou-was-1">HOU @ WAS</SelectItem>
                              <SelectItem value="hou-was-2">HOU @ WAS</SelectItem>
                              <SelectItem value="hou-was-3">HOU @ WAS</SelectItem>
                            </div>
                            <div className="border-t border-[#dcdddf] my-1"></div>
                            <div className="py-2">
                              <div className="px-2 py-1.5 text-sm font-medium text-[#5f6368]">UPCOMING</div>
                              <SelectItem value="lal-dal">
                                <span className="flex justify-between w-full">
                                  <span>LAL @ DAL</span>
                                  <span className="text-[#5f6368] text-sm">10 May</span>
                                </span>
                              </SelectItem>
                              <SelectItem value="min-nop">
                                <span className="flex justify-between w-full">
                                  <span>MIN @ NOP</span>
                                  <span className="text-[#5f6368] text-sm">10 May</span>
                                </span>
                              </SelectItem>
                              <SelectItem value="bos-den">
                                <span className="flex justify-between w-full">
                                  <span>BOS @ DEN</span>
                                  <span className="text-[#5f6368] text-sm">10 May</span>
                                </span>
                              </SelectItem>
                            </div>
                          </SelectContent>
                        </Select>
                      </div>

                      <button
                        className="flex items-center gap-2 px-3 py-2 bg-[#2b2c2d] text-white rounded-md"
                        onClick={handleAddConfig}
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Configuration</span>
                      </button>
                    </div> */}

                {/* Table */}
                {/* <ConfigurationTable
                      configurations={filteredConfigurations}
                      onEdit={handleEditConfig}
                      onViewDetails={handleViewDetails}
                    />
                  </>
                )} */}

                {/* Alerting Content */}
                {/* {activeTab === "alerting" && <AlertingView />} */}

                {/* {activeTab === "auto-line-mover" && <AutoLineMovementView />} */}

                {/* Other tabs content would go here */}
                {/* {activeTab === "audit-log" && (
                  <div className="p-4">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold">Audit Log</h2>
                      <p className="text-sm text-[#5f6368] mt-1">Complete history of system changes and user actions</p>
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search audit events..."
                        className="w-full p-2 border border-[#dcdddf] rounded-md"
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="rounded-md border">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-y border-[#dcdddf] bg-[#f1f2f3]">
                              <th className="py-3 px-4 text-left font-medium">Timestamp</th>
                              <th className="py-3 px-4 text-left font-medium">User</th>
                              <th className="py-3 px-4 text-left font-medium">Action</th>
                              <th className="py-3 px-4 text-left font-medium">Resource</th>
                              <th className="py-3 px-4 text-left font-medium">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                              <td className="py-3 px-4">May 13, 2025 10:45 AM</td>
                              <td className="py-3 px-4">John Smith (Trader)</td>
                              <td className="py-3 px-4">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Update</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                                  Market
                                </span>
                              </td>
                              <td className="py-3 px-4">Updated NBA - Lakers vs Celtics - Moneyline</td>
                            </tr>
                            <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                              <td className="py-3 px-4">May 13, 2025 09:30 AM</td>
                              <td className="py-3 px-4">Jane Doe (Admin)</td>
                              <td className="py-3 px-4">
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                                  Suspend
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                                  Market
                                </span>
                              </td>
                              <td className="py-3 px-4">Suspended NFL - Chiefs vs Eagles - Total Points</td>
                            </tr>
                            <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                              <td className="py-3 px-4">May 12, 2025 04:15 PM</td>
                              <td className="py-3 px-4">Mike Johnson (Risk Manager)</td>
                              <td className="py-3 px-4">
                                <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">
                                  Configuration
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs">
                                  Configuration
                                </span>
                              </td>
                              <td className="py-3 px-4">Updated Global Risk Limits</td>
                            </tr>
                            <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                              <td className="py-3 px-4">May 12, 2025 02:30 PM</td>
                              <td className="py-3 px-4">John Smith (Trader)</td>
                              <td className="py-3 px-4">
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Update</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">Player</span>
                              </td>
                              <td className="py-3 px-4">Updated LeBron James - Points</td>
                            </tr>
                            <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                              <td className="py-3 px-4">May 11, 2025 11:20 AM</td>
                              <td className="py-3 px-4">Sarah Williams (System Admin)</td>
                              <td className="py-3 px-4">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                  Create
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full text-xs">
                                  Fixture
                                </span>
                              </td>
                              <td className="py-3 px-4">Created NBA - Warriors vs Nets</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="p-4 border-t border-[#dcdddf] text-right">
                        <Link href="/audit" className="text-[#eb6a2e] hover:underline text-sm">
                          View All Audit Events
                        </Link>
                      </div>
                    </div>
                  </div>
                )} */}

                {/* {activeTab === "suspension-settings" && (
                  <div className="p-8 text-center">
                    <h2 className="text-xl font-bold mb-4">Suspension Settings</h2>
                    <p className="text-[#5f6368]">Suspension settings content will be displayed here.</p>
                  </div>
                )} */}

                {/* {activeTab === "security-settings" && (
                  <div className="p-8 text-center">
                    <h2 className="text-xl font-bold mb-4">Security Settings</h2>
                    <p className="text-[#5f6368]">Security settings content will be displayed here.</p>
                  </div>
                )} */}

                {/* {activeTab === "margin" && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Margin Configuration</h2>
                      <Link
                        href="/margins"
                        className="px-4 py-2 bg-[#eb6a2e] text-white rounded-md hover:bg-[#d55a20] transition-colors"
                      >
                        Go to Full Margin Management
                      </Link>
                    </div>

                    <div className="bg-[#f9f9f9] border border-[#dcdddf] rounded-md p-4 mb-6">
                      <h3 className="font-medium mb-2">Margin Configuration Levels</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Configure margins at multiple levels with inheritance and overrides:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="text-sm font-medium">Sport Level</div>
                          <div className="text-xs text-[#5f6368]">Base margins for all sports</div>
                        </div>
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="text-sm font-medium">Fixture Level</div>
                          <div className="text-xs text-[#5f6368]">Specific game margins</div>
                        </div>
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="text-sm font-medium">Market Class</div>
                          <div className="text-xs text-[#5f6368]">Category-wide margins</div>
                        </div>
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="text-sm font-medium">Market Level</div>
                          <div className="text-xs text-[#5f6368]">Specific market margins</div>
                        </div>
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="text-sm font-medium">Player Level</div>
                          <div className="text-xs text-[#5f6368]">Individual player margins</div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Recent Margin Changes</h3>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-y border-[#dcdddf] bg-[#f1f2f3]">
                            <th className="py-3 px-4 text-left font-medium">Configuration</th>
                            <th className="py-3 px-4 text-left font-medium">Level</th>
                            <th className="py-3 px-4 text-left font-medium">Previous</th>
                            <th className="py-3 px-4 text-left font-medium">New</th>
                            <th className="py-3 px-4 text-left font-medium">Changed By</th>
                            <th className="py-3 px-4 text-left font-medium">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                            <td className="py-3 px-4">Los Angeles Lakers</td>
                            <td className="py-3 px-4">Team</td>
                            <td className="py-3 px-4">0.07</td>
                            <td className="py-3 px-4">0.08</td>
                            <td className="py-3 px-4">John Doe</td>
                            <td className="py-3 px-4">Apr 23, 2025</td>
                          </tr>
                          <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                            <td className="py-3 px-4">NBA Default</td>
                            <td className="py-3 px-4">League</td>
                            <td className="py-3 px-4">0.06</td>
                            <td className="py-3 px-4">0.07</td>
                            <td className="py-3 px-4">Jane Smith</td>
                            <td className="py-3 px-4">Apr 22, 2025</td>
                          </tr>
                          <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                            <td className="py-3 px-4">LeBron James - Points</td>
                            <td className="py-3 px-4">Player Market</td>
                            <td className="py-3 px-4">0.05</td>
                            <td className="py-3 px-4">0.04</td>
                            <td className="py-3 px-4">John Doe</td>
                            <td className="py-3 px-4">Apr 21, 2025</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="mt-3 text-right">
                        <Link href="/margins?tab=history" className="text-[#eb6a2e] hover:underline text-sm">
                          View All Changes
                        </Link>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Active Margin Presets</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="font-medium">Conservative</div>
                          <div className="text-sm text-[#5f6368] mb-2">Lower margins for competitive markets</div>
                          <div className="text-xl font-bold">0.03</div>
                        </div>
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf] border-[#eb6a2e]">
                          <div className="font-medium">Standard</div>
                          <div className="text-sm text-[#5f6368] mb-2">Balanced margins for most markets</div>
                          <div className="text-xl font-bold">0.05</div>
                          <div className="mt-1 text-xs bg-[#eb6a2e] text-white px-2 py-0.5 rounded inline-block">
                            Default
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="font-medium">Aggressive</div>
                          <div className="text-sm text-[#5f6368] mb-2">Higher margins for less competitive markets</div>
                          <div className="text-xl font-bold">0.08</div>
                        </div>
                      </div>
                      <div className="mt-3 text-right">
                        <Link href="/margins?tab=presets" className="text-[#eb6a2e] hover:underline text-sm">
                          Manage Presets
                        </Link>
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
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
