"use client"

import Link from "next/link"
import { useState } from "react"
import { Plus, ClipboardList, Bell, ChevronRight, ChevronDown } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Sidebar from "@/components/sidebar"
import TopNavigation from "@/components/top-navigation"
import { ConfigurationModal, type Configuration } from "@/components/ConfigurationModal"
import { ConfigurationTable } from "@/features/configuration/components/ConfigurationTable"
import { ConfigurationDetails } from "@/features/configuration/components/ConfigurationDetails"
import { ConfigurationFilters } from "@/features/configuration/components/ConfigurationFilters"
import { useConfigurationState } from "@/features/configuration/hooks/useConfigurationState"
import { AlertingView } from "@/features/alerting/components/AlertingView"
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
  const [activeTab, setActiveTab] = useState("configured-markets")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({})
  const [expandedSections, setExpandedSections] = useState<string[]>(["player-markets"])
  const [editingMargin, setEditingMargin] = useState<string | null>(null)
  const [showAdvancedMarginModal, setShowAdvancedMarginModal] = useState(false)
  const [margins, setMargins] = useState({
    // Market class defaults
    "fixture-markets": 5.0,
    "player-markets": 6.0,
    "player-matchups": 7.0,
    // Individual markets
    "fixture-moneyline": 4.5,
    "fixture-spread": 5.0,
    "fixture-total": 5.0,
    "fixture-quarter": 6.0,
    "fixture-half": 5.5,
    "player-points": 5.5,
    "player-rebounds": 6.0,
    "player-assists": 6.0,
    "player-threes": 7.0,
    "player-steals-blocks": 8.0,
    "player-double-double": 6.5,
    "matchup-most-points": 6.5,
    "matchup-most-rebounds": 7.0,
    "matchup-most-assists": 7.0,
    "matchup-most-threes": 8.0,
  })

  const presetMargins = [4.0, 5.0, 6.0, 7.0, 8.0]

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleMarginEdit = (marketId: string, newMargin: number) => {
    setMargins((prev) => ({
      ...prev,
      [marketId]: newMargin,
    }))
    setEditingMargin(null)
  }

  const MarginEditDropdown = ({ marketId, currentMargin }: { marketId: string; currentMargin: number }) => (
    <div className="relative">
      <select
        value={currentMargin}
        onChange={(e) => handleMarginEdit(marketId, Number.parseFloat(e.target.value))}
        className="text-xs border border-[#dcdddf] rounded px-2 py-1 bg-white"
        onBlur={() => setEditingMargin(null)}
        autoFocus
      >
        {presetMargins.map((margin) => (
          <option key={margin} value={margin}>
            {margin}%
          </option>
        ))}
      </select>
    </div>
  )

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
                  <div
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
                      activeTab === "margin"
                        ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                        : ""
                    }`}
                    onClick={() => setActiveTab("margin")}
                  >
                    Margin
                  </div>
                  <div
                    className={`p-3 hover:bg-[#f9f9f9] cursor-pointer ${
                      activeTab === "laddering"
                        ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                        : ""
                    }`}
                    onClick={() => setActiveTab("laddering")}
                  >
                    Laddering
                  </div>
                  <div
                    className={`p-3 hover:bg-[#f9f9f9] cursor-pointer ${
                      activeTab === "bet-ticker"
                        ? "bg-[#eb6a2e] bg-opacity-10 border-l-4 border-[#eb6a2e] text-[#eb6a2e] font-medium pl-2"
                        : ""
                    }`}
                    onClick={() => setActiveTab("bet-ticker")}
                  >
                    Bet Ticker
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
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-md overflow-hidden">
                {/* Configured Markets Content */}
                {activeTab === "configured-markets" && (
                  <>
                    {/* Filter Section */}
                    <ConfigurationFilters onFilterChange={setFilters} />

                    {/* Action Bar */}
                    <div className="p-4 flex justify-between items-center">
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
                    </div>

                    {/* Table */}
                    <ConfigurationTable
                      configurations={filteredConfigurations}
                      onEdit={handleEditConfig}
                      onViewDetails={handleViewDetails}
                    />
                  </>
                )}

                {/* Alerting Content */}
                {activeTab === "alerting" && <AlertingView />}

                {activeTab === "auto-line-mover" && <AutoLineMovementView />}

                {/* Other tabs content would go here */}
                {activeTab === "audit-log" && (
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
                )}

                {activeTab === "suspension-settings" && (
                  <div className="p-8 text-center">
                    <h2 className="text-xl font-bold mb-4">Suspension Settings</h2>
                    <p className="text-[#5f6368]">Suspension settings content will be displayed here.</p>
                  </div>
                )}

                {activeTab === "margin" && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-xl font-bold">Margin Configuration</h2>
                        <p className="text-sm text-[#5f6368] mt-1">
                          Configure margins by market class and individual markets
                        </p>
                      </div>
                      <button
                        onClick={() => setShowAdvancedMarginModal(true)}
                        className="px-4 py-2 bg-[#eb6a2e] text-white rounded-md hover:bg-[#d55a20] transition-colors"
                      >
                        Advanced Margin Management
                      </button>
                    </div>

                    {/* Market Class Overview */}
                    <div className="space-y-4">
                      {/* Fixture Markets */}
                      <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden">
                        <div
                          className="p-4 bg-[#f9f9f9] border-b border-[#dcdddf] flex justify-between items-center cursor-pointer hover:bg-[#f1f2f3]"
                          onClick={() => toggleSection("fixture-markets")}
                        >
                          <div className="flex items-center">
                            {expandedSections.includes("fixture-markets") ? (
                              <ChevronDown className="h-4 w-4 mr-2 text-[#5f6368]" />
                            ) : (
                              <ChevronRight className="h-4 w-4 mr-2 text-[#5f6368]" />
                            )}
                            <div>
                              <h3 className="font-medium">Fixture Markets</h3>
                              <p className="text-sm text-[#5f6368]">Game-level betting markets</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-mono text-lg">{margins["fixture-markets"]}%</div>
                              <div className="text-xs text-[#5f6368]">Default margin</div>
                            </div>
                            {editingMargin === "fixture-markets" ? (
                              <MarginEditDropdown
                                marketId="fixture-markets"
                                currentMargin={margins["fixture-markets"]}
                              />
                            ) : (
                              <button
                                className="px-3 py-1 text-sm border border-[#dcdddf] rounded hover:bg-[#f9f9f9]"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setEditingMargin("fixture-markets")
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                        {expandedSections.includes("fixture-markets") && (
                          <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Moneyline</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["fixture-moneyline"]}%</span>
                                  {editingMargin === "fixture-moneyline" ? (
                                    <MarginEditDropdown
                                      marketId="fixture-moneyline"
                                      currentMargin={margins["fixture-moneyline"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("fixture-moneyline")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Spread</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["fixture-spread"]}%</span>
                                  {editingMargin === "fixture-spread" ? (
                                    <MarginEditDropdown
                                      marketId="fixture-spread"
                                      currentMargin={margins["fixture-spread"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("fixture-spread")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Total Points</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["fixture-total"]}%</span>
                                  {editingMargin === "fixture-total" ? (
                                    <MarginEditDropdown
                                      marketId="fixture-total"
                                      currentMargin={margins["fixture-total"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("fixture-total")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Quarter Lines</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["fixture-quarter"]}%</span>
                                  {editingMargin === "fixture-quarter" ? (
                                    <MarginEditDropdown
                                      marketId="fixture-quarter"
                                      currentMargin={margins["fixture-quarter"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("fixture-quarter")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Half Lines</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["fixture-half"]}%</span>
                                  {editingMargin === "fixture-half" ? (
                                    <MarginEditDropdown
                                      marketId="fixture-half"
                                      currentMargin={margins["fixture-half"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("fixture-half")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Player Markets */}
                      <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden">
                        <div
                          className="p-4 bg-[#f9f9f9] border-b border-[#dcdddf] flex justify-between items-center cursor-pointer hover:bg-[#f1f2f3]"
                          onClick={() => toggleSection("player-markets")}
                        >
                          <div className="flex items-center">
                            {expandedSections.includes("player-markets") ? (
                              <ChevronDown className="h-4 w-4 mr-2 text-[#5f6368]" />
                            ) : (
                              <ChevronRight className="h-4 w-4 mr-2 text-[#5f6368]" />
                            )}
                            <div>
                              <h3 className="font-medium">Player Markets</h3>
                              <p className="text-sm text-[#5f6368]">Individual player performance markets</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-mono text-lg">{margins["player-markets"]}%</div>
                              <div className="text-xs text-[#5f6368]">Default margin</div>
                            </div>
                            {editingMargin === "player-markets" ? (
                              <MarginEditDropdown marketId="player-markets" currentMargin={margins["player-markets"]} />
                            ) : (
                              <button
                                className="px-3 py-1 text-sm border border-[#dcdddf] rounded hover:bg-[#f9f9f9]"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setEditingMargin("player-markets")
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                        {expandedSections.includes("player-markets") && (
                          <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Total Points</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["player-points"]}%</span>
                                  {editingMargin === "player-points" ? (
                                    <MarginEditDropdown
                                      marketId="player-points"
                                      currentMargin={margins["player-points"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("player-points")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Total Rebounds</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["player-rebounds"]}%</span>
                                  {editingMargin === "player-rebounds" ? (
                                    <MarginEditDropdown
                                      marketId="player-rebounds"
                                      currentMargin={margins["player-rebounds"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("player-rebounds")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Total Assists</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["player-assists"]}%</span>
                                  {editingMargin === "player-assists" ? (
                                    <MarginEditDropdown
                                      marketId="player-assists"
                                      currentMargin={margins["player-assists"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("player-assists")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">3-Pointers Made</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["player-threes"]}%</span>
                                  {editingMargin === "player-threes" ? (
                                    <MarginEditDropdown
                                      marketId="player-threes"
                                      currentMargin={margins["player-threes"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("player-threes")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Steals + Blocks</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["player-steals-blocks"]}%</span>
                                  {editingMargin === "player-steals-blocks" ? (
                                    <MarginEditDropdown
                                      marketId="player-steals-blocks"
                                      currentMargin={margins["player-steals-blocks"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("player-steals-blocks")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Double Double</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["player-double-double"]}%</span>
                                  {editingMargin === "player-double-double" ? (
                                    <MarginEditDropdown
                                      marketId="player-double-double"
                                      currentMargin={margins["player-double-double"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("player-double-double")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Player Matchups */}
                      <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden">
                        <div
                          className="p-4 bg-[#f9f9f9] border-b border-[#dcdddf] flex justify-between items-center cursor-pointer hover:bg-[#f1f2f3]"
                          onClick={() => toggleSection("player-matchups")}
                        >
                          <div className="flex items-center">
                            {expandedSections.includes("player-matchups") ? (
                              <ChevronDown className="h-4 w-4 mr-2 text-[#5f6368]" />
                            ) : (
                              <ChevronRight className="h-4 w-4 mr-2 text-[#5f6368]" />
                            )}
                            <div>
                              <h3 className="font-medium">Player Matchups</h3>
                              <p className="text-sm text-[#5f6368]">Head-to-head player comparison markets</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-mono text-lg">{margins["player-matchups"]}%</div>
                              <div className="text-xs text-[#5f6368]">Default margin</div>
                            </div>
                            {editingMargin === "player-matchups" ? (
                              <MarginEditDropdown
                                marketId="player-matchups"
                                currentMargin={margins["player-matchups"]}
                              />
                            ) : (
                              <button
                                className="px-3 py-1 text-sm border border-[#dcdddf] rounded hover:bg-[#f9f9f9]"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setEditingMargin("player-matchups")
                                }}
                              >
                                Edit
                              </button>
                            )}
                          </div>
                        </div>
                        {expandedSections.includes("player-matchups") && (
                          <div className="p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Most Points</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["matchup-most-points"]}%</span>
                                  {editingMargin === "matchup-most-points" ? (
                                    <MarginEditDropdown
                                      marketId="matchup-most-points"
                                      currentMargin={margins["matchup-most-points"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("matchup-most-points")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Most Rebounds</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["matchup-most-rebounds"]}%</span>
                                  {editingMargin === "matchup-most-rebounds" ? (
                                    <MarginEditDropdown
                                      marketId="matchup-most-rebounds"
                                      currentMargin={margins["matchup-most-rebounds"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("matchup-most-rebounds")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Most Assists</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["matchup-most-assists"]}%</span>
                                  {editingMargin === "matchup-most-assists" ? (
                                    <MarginEditDropdown
                                      marketId="matchup-most-assists"
                                      currentMargin={margins["matchup-most-assists"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("matchup-most-assists")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-3 bg-[#f9f9f9] rounded">
                                <span className="text-sm">Most 3-Pointers</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono">{margins["matchup-most-threes"]}%</span>
                                  {editingMargin === "matchup-most-threes" ? (
                                    <MarginEditDropdown
                                      marketId="matchup-most-threes"
                                      currentMargin={margins["matchup-most-threes"]}
                                    />
                                  ) : (
                                    <button
                                      className="text-[#eb6a2e] text-xs hover:underline"
                                      onClick={() => setEditingMargin("matchup-most-threes")}
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 p-4 bg-[#f9f9f9] border border-[#dcdddf] rounded-md">
                      <h3 className="font-medium mb-3">Quick Actions</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                          className="px-3 py-1.5 bg-white border border-[#dcdddf] rounded text-sm hover:bg-[#f9f9f9]"
                          onClick={() => {
                            const newMargins = { ...margins }
                            Object.keys(newMargins).forEach((key) => {
                              newMargins[key] = 4.0
                            })
                            setMargins(newMargins)
                          }}
                        >
                          Apply Conservative (4%) to All
                        </button>
                        <button
                          className="px-3 py-1.5 bg-white border border-[#dcdddf] rounded text-sm hover:bg-[#f9f9f9]"
                          onClick={() => {
                            const newMargins = { ...margins }
                            Object.keys(newMargins).forEach((key) => {
                              newMargins[key] = 5.0
                            })
                            setMargins(newMargins)
                          }}
                        >
                          Apply Standard (5%) to All
                        </button>
                        <button
                          className="px-3 py-1.5 bg-white border border-[#dcdddf] rounded text-sm hover:bg-[#f9f9f9]"
                          onClick={() => {
                            const newMargins = { ...margins }
                            Object.keys(newMargins).forEach((key) => {
                              newMargins[key] = 8.0
                            })
                            setMargins(newMargins)
                          }}
                        >
                          Apply Aggressive (8%) to All
                        </button>
                        <button className="px-3 py-1.5 bg-[#eb6a2e] text-white rounded text-sm hover:bg-[#d55a20]">
                          Save All Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "laddering" && (
                  <div className="p-6">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold">Laddering Configuration</h2>
                      <p className="text-sm text-[#5f6368] mt-1">
                        Configure laddering settings for odds display and bet placement
                      </p>
                    </div>

                    <div className="bg-[#f9f9f9] border border-[#dcdddf] rounded-md p-4 mb-6">
                      <h3 className="font-medium mb-2">Laddering Settings</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Configure how odds are laddered across different sports and market types:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="text-sm font-medium">Default Increment</div>
                          <div className="text-xs text-[#5f6368] mb-2">Standard increment between odds</div>
                          <div className="text-xl font-bold">0.05</div>
                        </div>
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="text-sm font-medium">Minimum Odds</div>
                          <div className="text-xs text-[#5f6368] mb-2">Lowest odds allowed</div>
                          <div className="text-xl font-bold">1.01</div>
                        </div>
                        <div className="bg-white p-4 rounded-md border border-[#dcdddf]">
                          <div className="text-sm font-medium">Maximum Odds</div>
                          <div className="text-xs text-[#5f6368] mb-2">Highest odds allowed</div>
                          <div className="text-xl font-bold">1000.0</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-md border border-[#dcdddf] overflow-hidden mb-6">
                      <div className="p-4 border-b border-[#dcdddf] flex justify-between items-center">
                        <h3 className="font-medium">Sport-Specific Laddering</h3>
                        <button className="px-3 py-1.5 bg-[#2b2c2d] text-white rounded-md text-sm">
                          Add Configuration
                        </button>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                              <th className="py-3 px-4 text-left font-medium">Sport</th>
                              <th className="py-3 px-4 text-left font-medium">Market Type</th>
                              <th className="py-3 px-4 text-left font-medium">Increment</th>
                              <th className="py-3 px-4 text-left font-medium">Min Odds</th>
                              <th className="py-3 px-4 text-left font-medium">Max Odds</th>
                              <th className="py-3 px-4 text-left font-medium">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                              <td className="py-3 px-4">Basketball</td>
                              <td className="py-3 px-4">Moneyline</td>
                              <td className="py-3 px-4">0.05</td>
                              <td className="py-3 px-4">1.01</td>
                              <td className="py-3 px-4">50.0</td>
                              <td className="py-3 px-4">
                                <button className="text-[#eb6a2e] hover:underline text-sm">Edit</button>
                              </td>
                            </tr>
                            <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                              <td className="py-3 px-4">Basketball</td>
                              <td className="py-3 px-4">Spread</td>
                              <td className="py-3 px-4">0.05</td>
                              <td className="py-3 px-4">1.01</td>
                              <td className="py-3 px-4">50.0</td>
                              <td className="py-3 px-4">
                                <button className="text-[#eb6a2e] hover:underline text-sm">Edit</button>
                              </td>
                            </tr>
                            <tr className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                              <td className="py-3 px-4">Football</td>
                              <td className="py-3 px-4">Moneyline</td>
                              <td className="py-3 px-4">0.1</td>
                              <td className="py-3 px-4">1.01</td>
                              <td className="py-3 px-4">100.0</td>
                              <td className="py-3 px-4">
                                <button className="text-[#eb6a2e] hover:underline text-sm">Edit</button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "bet-ticker" && (
                  <div className="p-6">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold">Bet Ticker Configuration</h2>
                      <p className="text-sm text-[#5f6368] mt-1">
                        Configure real-time bet monitoring and display settings
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-white rounded-md border border-[#dcdddf] overflow-hidden">
                        <div className="p-4 border-b border-[#dcdddf]">
                          <h3 className="font-medium">Display Settings</h3>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Refresh Rate (seconds)</label>
                              <input
                                type="number"
                                className="w-full p-2 border border-[#dcdddf] rounded-md"
                                defaultValue="5"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Maximum Bets Displayed</label>
                              <input
                                type="number"
                                className="w-full p-2 border border-[#dcdddf] rounded-md"
                                defaultValue="50"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Highlight Threshold ($)</label>
                              <input
                                type="number"
                                className="w-full p-2 border border-[#dcdddf] rounded-md"
                                defaultValue="1000"
                              />
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="show-usernames" className="mr-2" defaultChecked />
                              <label htmlFor="show-usernames" className="text-sm">
                                Show Customer IDs
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="show-stake" className="mr-2" defaultChecked />
                              <label htmlFor="show-stake" className="text-sm">
                                Show Stake Amounts
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="show-potential-winnings" className="mr-2" defaultChecked />
                              <label htmlFor="show-potential-winnings" className="text-sm">
                                Show Potential Winnings
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-md border border-[#dcdddf] overflow-hidden">
                        <div className="p-4 border-b border-[#dcdddf]">
                          <h3 className="font-medium">Filter Settings</h3>
                        </div>
                        <div className="p-4">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Minimum Stake ($)</label>
                              <input
                                type="number"
                                className="w-full p-2 border border-[#dcdddf] rounded-md"
                                defaultValue="0"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Sports</label>
                              <select className="w-full p-2 border border-[#dcdddf] rounded-md">
                                <option value="all">All Sports</option>
                                <option value="basketball">Basketball</option>
                                <option value="football">Football</option>
                                <option value="baseball">Baseball</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Market Types</label>
                              <select className="w-full p-2 border border-[#dcdddf] rounded-md">
                                <option value="all">All Markets</option>
                                <option value="moneyline">Moneyline</option>
                                <option value="spread">Spread</option>
                                <option value="totals">Totals</option>
                                <option value="player-props">Player Props</option>
                              </select>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="show-live-only" className="mr-2" />
                              <label htmlFor="show-live-only" className="text-sm">
                                Show Live Bets Only
                              </label>
                            </div>
                            <div className="flex items-center">
                              <input type="checkbox" id="show-high-risk" className="mr-2" defaultChecked />
                              <label htmlFor="show-high-risk" className="text-sm">
                                Highlight High Risk Bets
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-md border border-[#dcdddf] overflow-hidden">
                      <div className="p-4 border-b border-[#dcdddf]">
                        <h3 className="font-medium">Bet Ticker Preview</h3>
                      </div>
                      <div className="p-4">
                        <div className="bg-[#f9f9f9] border border-[#dcdddf] rounded-md p-4 h-64 overflow-y-auto">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 bg-white rounded border border-[#dcdddf]">
                              <div className="font-medium">Lakers vs Celtics</div>
                              <div className="text-sm">Moneyline: Lakers @ 2.10</div>
                              <div className="text-sm">$500</div>
                              <div className="text-xs text-[#5f6368]">30s ago</div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded border border-[#dcdddf]">
                              <div className="font-medium">Warriors vs Nets</div>
                              <div className="text-sm">Spread: Warriors -4.5 @ 1.91</div>
                              <div className="text-sm">$200</div>
                              <div className="text-xs text-[#5f6368]">1m ago</div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded border border-[#dcdddf] bg-yellow-50">
                              <div className="font-medium">Chiefs vs Eagles</div>
                              <div className="text-sm">Total: Over 48.5 @ 1.95</div>
                              <div className="text-sm font-bold">$2,500</div>
                              <div className="text-xs text-[#5f6368]">2m ago</div>
                            </div>
                            <div className="flex justify-between items-center p-2 bg-white rounded border border-[#dcdddf]">
                              <div className="font-medium">Bucks vs Heat</div>
                              <div className="text-sm">Player Prop: G. Antetokounmpo Over 28.5 pts @ 1.87</div>
                              <div className="text-sm">$150</div>
                              <div className="text-xs text-[#5f6368]">5m ago</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

      {/* Advanced Margin Modal */}
      {showAdvancedMarginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#dcdddf]">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Advanced Margin Management</h2>
                <button onClick={() => setShowAdvancedMarginModal(false)} className="text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-[#5f6368] mt-1">
                Configure default margin inputs that affect all market classes and markets within the respective sport
              </p>
            </div>

            <div className="p-6">
              {/* Configuration Levels */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Configuration Level</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1.5 bg-[#eb6a2e] text-white rounded">MarketClass</button>
                  <button className="px-3 py-1.5 bg-white border border-[#dcdddf] rounded hover:bg-[#f9f9f9]">
                    Market
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-[#dcdddf] rounded hover:bg-[#f9f9f9]">
                    GameState
                  </button>
                </div>
              </div>

              {/* Market Class Selection */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Market Class</h3>
                <select className="w-full p-2 border border-[#dcdddf] rounded-md">
                  <option value="fixture-markets">Fixture Markets</option>
                  <option value="player-markets">Player Markets</option>
                  <option value="player-matchups">Player Matchups</option>
                </select>
              </div>

              {/* Margin Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-medium mb-3">Base Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Base Margin</label>
                      <div className="flex items-center">
                        <input type="range" min="0" max="10" step="0.1" defaultValue="5" className="w-full mr-2" />
                        <span className="font-mono w-12 text-right">5.0%</span>
                      </div>
                      <p className="text-xs text-[#5f6368] mt-1">
                        The base margin per selection, applied on a 0.5 scale
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Selection Bias</label>
                      <div className="flex items-center">
                        <input type="range" min="0" max="10" step="0.1" defaultValue="2" className="w-full mr-2" />
                        <span className="font-mono w-12 text-right">2.0</span>
                      </div>
                      <p className="text-xs text-[#5f6368] mt-1">Distribution of margin to selections</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Probability Bias</label>
                      <div className="flex items-center">
                        <input type="range" min="0" max="10" step="0.1" defaultValue="3" className="w-full mr-2" />
                        <span className="font-mono w-12 text-right">3.0</span>
                      </div>
                      <p className="text-xs text-[#5f6368] mt-1">
                        How margin is distributed by reference to selection probability
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">Advanced Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Boundary Margin</label>
                      <div className="flex items-center">
                        <input type="range" min="0" max="20" step="0.1" defaultValue="10" className="w-full mr-2" />
                        <span className="font-mono w-12 text-right">10.0</span>
                      </div>
                      <p className="text-xs text-[#5f6368] mt-1">
                        Maximum price per selection, margin reduces as price approaches ceiling
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Margin Transition</label>
                      <div className="flex items-center">
                        <input type="range" min="0" max="10" step="0.1" defaultValue="5" className="w-full mr-2" />
                        <span className="font-mono w-12 text-right">5.0</span>
                      </div>
                      <p className="text-xs text-[#5f6368] mt-1">When to start applying the Boundary Margin effect</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Game State</label>
                      <select className="w-full p-2 border border-[#dcdddf] rounded-md">
                        <option value="all">All States</option>
                        <option value="pre-match">Pre-Match</option>
                        <option value="in-play">In-Play</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Levels */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Application Levels</h3>
                <div className="bg-[#f9f9f9] border border-[#dcdddf] rounded-md p-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="apply-marketclass" className="mr-2" checked readOnly />
                      <label htmlFor="apply-marketclass" className="text-sm">
                        MarketClass
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="apply-market" className="mr-2" checked readOnly />
                      <label htmlFor="apply-market" className="text-sm">
                        Market (inherits MarketClass)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="apply-player" className="mr-2" checked readOnly />
                      <label htmlFor="apply-player" className="text-sm">
                        Player (inherits Market)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="apply-line" className="mr-2" checked readOnly />
                      <label htmlFor="apply-line" className="text-sm">
                        Line (inherits Market)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Margin Preview</h3>
                <div className="bg-[#f9f9f9] border border-[#dcdddf] rounded-md p-4 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-medium mb-2">Effective Margin: 5.2%</div>
                    <div className="text-sm text-[#5f6368]">Based on current configuration</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4 border-t border-[#dcdddf]">
                <button
                  onClick={() => setShowAdvancedMarginModal(false)}
                  className="px-4 py-2 border border-[#dcdddf] rounded-md hover:bg-[#f9f9f9]"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#eb6a2e] text-white rounded-md hover:bg-[#d55a20]">
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfigurationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveConfig}
        editingConfig={editingConfig}
      />
    </div>
  )
}
