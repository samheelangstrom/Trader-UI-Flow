"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, MoreHorizontal, X } from "lucide-react"
import Sidebar from "@/components/sidebar"
import TopNavigation from "@/components/top-navigation"

// Define the Alert type
type AlertSeverity = "high" | "medium" | "low"

type Alert = {
  id: number
  market: string
  fixture: string
  date: string
  type: string
  time: string
  taken: string
  current: string
  marketAv: string
  comp: string
  sf: string
  liability: string
  recommendation: string
  severity: AlertSeverity
}

// Sample alert data
const alerts: Alert[] = [
  {
    id: 1,
    market: "Money Line",
    fixture: "Los Angeles Lakers @ Boston Celtics",
    date: "10 Oct",
    type: "Price",
    time: "10:15",
    taken: "1.222",
    current: "1.333",
    marketAv: "1.444",
    comp: "1.555",
    sf: "27%",
    liability: "$30,202.11",
    recommendation: "Adjust price to 1.35",
    severity: "high",
  },
  {
    id: 2,
    market: "Handicap",
    fixture: "Chicago Bulls @ Philadelphia 76ers",
    date: "10 Oct",
    type: "Liability",
    time: "10:10",
    taken: "1.222",
    current: "1.444",
    marketAv: "1.555",
    comp: "1.666",
    sf: "22%",
    liability: "$15,780.50",
    recommendation: "Suspend market",
    severity: "medium",
  },
  {
    id: 3,
    market: "Total Points",
    fixture: "Brooklyn Nets @ Toronto Raptors",
    date: "10 Oct",
    type: "Comp",
    time: "10:05",
    taken: "1.222",
    current: "1.333",
    marketAv: "1.444",
    comp: "1.555",
    sf: "18%",
    liability: "$8,320.75",
    recommendation: "No action required",
    severity: "low",
  },
  {
    id: 4,
    market: "Player Props",
    fixture: "Atlanta Braves @ Houston Astros",
    date: "10 Oct",
    type: "Price",
    time: "10:00",
    taken: "1.222",
    current: "1.333",
    marketAv: "1.444",
    comp: "1.555",
    sf: "15%",
    liability: "$6,240.30",
    recommendation: "Adjust price to 1.40",
    severity: "high",
  },
  {
    id: 5,
    market: "Money Line",
    fixture: "Dallas Cowboys @ New York Giants",
    date: "10 Oct",
    type: "Liability",
    time: "09:55",
    taken: "1.222",
    current: "1.333",
    marketAv: "1.444",
    comp: "1.555",
    sf: "25%",
    liability: "$12,450.00",
    recommendation: "Adjust price to 1.30",
    severity: "medium",
  },
  {
    id: 6,
    market: "Handicap",
    fixture: "Philadelphia Eagles @ Washington Commanders",
    date: "10 Oct",
    type: "Price",
    time: "09:50",
    taken: "1.222",
    current: "1.333",
    marketAv: "1.444",
    comp: "1.555",
    sf: "20%",
    liability: "$9,870.25",
    recommendation: "No action required",
    severity: "low",
  },
  {
    id: 7,
    market: "Total Points",
    fixture: "Minnesota Twins @ Oakland Athletics",
    date: "10 Oct",
    type: "Comp",
    time: "09:45",
    taken: "1.222",
    current: "1.333",
    marketAv: "1.444",
    comp: "1.555",
    sf: "17%",
    liability: "$7,650.40",
    recommendation: "Adjust price to 1.38",
    severity: "high",
  },
  {
    id: 8,
    market: "Player Props",
    fixture: "St. Louis Cardinals @ San Francisco Giants",
    date: "10 Oct",
    type: "Price",
    time: "09:40",
    taken: "1.222",
    current: "1.333",
    marketAv: "1.444",
    comp: "1.555",
    sf: "19%",
    liability: "$8,920.15",
    recommendation: "Suspend market",
    severity: "medium",
  },
  {
    id: 9,
    market: "Money Line",
    fixture: "Chicago Bears @ Detroit Lions",
    date: "10 Oct",
    type: "Liability",
    time: "09:35",
    taken: "1.222",
    current: "1.333",
    marketAv: "1.444",
    comp: "1.555",
    sf: "23%",
    liability: "$11,340.60",
    recommendation: "No action required",
    severity: "low",
  },
  {
    id: 10,
    market: "Handicap",
    fixture: "Boston Celtics @ Washington Wizards",
    date: "10 Oct",
    type: "Price",
    time: "09:30",
    taken: "1.222",
    current: "1.333",
    marketAv: "1.444",
    comp: "1.555",
    sf: "21%",
    liability: "$10,120.80",
    recommendation: "Adjust price to 1.32",
    severity: "high",
  },
]

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("MLB")
  const [showAlertDetailsModal, setShowAlertDetailsModal] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  // Function to open the alert details modal
  const openAlertDetailsModal = (alert: Alert) => {
    setSelectedAlert(alert)
    setShowAlertDetailsModal(true)
  }

  // Function to close the alert details modal
  const closeAlertDetailsModal = () => {
    setShowAlertDetailsModal(false)
    setSelectedAlert(null)
  }

  return (
    <div className="bg-[#fafafa] min-h-screen text-[#2b2c2d] flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1">
        {/* Top Navigation */}
        <TopNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="max-w-full w-[98%] mx-auto p-4">
          {/* Back Button */}
          <Link href="/" className="flex items-center gap-2 mb-4 text-[#5f6368] hover:text-[#2b2c2d]">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to fixtures</span>
          </Link>

          {/* Alert Centre Header */}
          <h1 className="text-2xl font-bold mb-6">Alert Centre</h1>

          {/* Alert Table */}
          <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                    <th className="py-3 px-4 text-left font-medium">Market</th>
                    <th className="py-3 px-4 text-left font-medium">Fixture</th>
                    <th className="py-3 px-4 text-left font-medium">Type</th>
                    <th className="py-3 px-4 text-left font-medium">Triggered</th>
                    <th className="py-3 px-4 text-left font-medium">Taken</th>
                    <th className="py-3 px-4 text-left font-medium">Current</th>
                    <th className="py-3 px-4 text-left font-medium">Market Av.</th>
                    <th className="py-3 px-4 text-left font-medium">Comp.</th>
                    <th className="py-3 px-4 text-left font-medium">SF</th>
                    <th className="py-3 px-4 text-left font-medium">Liability</th>
                    <th className="py-3 px-4 text-left font-medium">Recommendation</th>
                    <th className="py-3 px-4 text-left font-medium">Actions</th>
                    <th className="py-3 px-4 text-left font-medium">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.id} className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {alert.severity === "high" ? (
                            <div className="w-5 h-5 flex items-center justify-center bg-red-100 rounded-full">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 9v4M12 17h.01"
                                  stroke="#EF4444"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10.24 3.95L2.51 17.72c-.7 1.21-.11 2.75 1.3 2.75h16.38c1.41 0 2-1.54 1.3-2.75L13.76 3.95c-.71-1.21-2.83-1.21-3.52 0z"
                                  stroke="#EF4444"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  fill="#FECACA"
                                />
                              </svg>
                            </div>
                          ) : alert.severity === "medium" ? (
                            <div className="w-5 h-5 flex items-center justify-center bg-orange-100 rounded-full">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 9v4M12 17h.01"
                                  stroke="#F97316"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10.24 3.95L2.51 17.72c-.7 1.21-.11 2.75 1.3 2.75h16.38c1.41 0 2-1.54 1.3-2.75L13.76 3.95c-.71-1.21-2.83-1.21-3.52 0z"
                                  stroke="#F97316"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  fill="#FFEDD5"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 flex items-center justify-center bg-blue-100 rounded-full">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 9v4M12 17h.01"
                                  stroke="#3B82F6"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M10.24 3.95L2.51 17.72c-.7 1.21-.11 2.75 1.3 2.75h16.38c1.41 0 2-1.54 1.3-2.75L13.76 3.95c-.71-1.21-2.83-1.21-3.52 0z"
                                  stroke="#3B82F6"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  fill="#DBEAFE"
                                />
                              </svg>
                            </div>
                          )}
                          {alert.market}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <span className="inline-block w-4 h-4 mr-2">
                            {alert.fixture.includes("Lakers") ||
                            alert.fixture.includes("Celtics") ||
                            alert.fixture.includes("Bulls") ||
                            alert.fixture.includes("Nets")
                              ? "🏀"
                              : alert.fixture.includes("Cowboys") || alert.fixture.includes("Eagles")
                                ? "🏈"
                                : alert.fixture.includes("Braves") || alert.fixture.includes("Cardinals")
                                  ? "⚾"
                                  : "🏀"}
                          </span>
                          <span>{alert.fixture}</span>
                        </div>
                        <div className="text-xs text-[#5f6368] ml-6">{alert.date}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-[#FFC107] text-white rounded-full text-xs">{alert.type}</span>
                      </td>
                      <td className="py-3 px-4">{alert.time}</td>
                      <td className="py-3 px-4">{alert.taken}</td>
                      <td className="py-3 px-4">{alert.current}</td>
                      <td className="py-3 px-4">{alert.marketAv}</td>
                      <td className="py-3 px-4">{alert.comp}</td>
                      <td className="py-3 px-4">{alert.sf}</td>
                      <td className="py-3 px-4">{alert.liability}</td>
                      <td className="py-3 px-4">{alert.recommendation}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          <button className="px-2 py-1 bg-[#62c11e] text-white text-xs rounded">Accept</button>
                          <button className="px-2 py-1 bg-[#F44336] text-white text-xs rounded">Dismiss</button>
                          <button className="px-2 py-1 bg-[#FFC107] text-white text-xs rounded">Suspend</button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="text-[#5f6368] hover:text-[#2b2c2d]"
                          onClick={() => openAlertDetailsModal(alert)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Details Modal */}
      {showAlertDetailsModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-4 border-b border-[#dcdddf]">
              <h2 className="text-xl font-semibold">Alert Details</h2>
              <button onClick={closeAlertDetailsModal} className="text-[#2b2c2d] hover:text-[#5f6368]">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4">
              {/* First Card - Price Information */}
              <div className="bg-white border border-[#dcdddf] rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-y-4">
                  <div className="text-[#5f6368]">Price Taken</div>
                  <div className="text-right">{selectedAlert.taken}</div>

                  <div className="text-[#5f6368]">Our Price</div>
                  <div className="text-right">{selectedAlert.current}</div>

                  <div className="text-[#5f6368]">Market Average</div>
                  <div className="text-right">{selectedAlert.marketAv}</div>

                  <div className="text-[#5f6368]">Competitor Price</div>
                  <div className="text-right">{selectedAlert.comp}</div>

                  <div className="text-[#5f6368]">SF</div>
                  <div className="text-right">{selectedAlert.sf}</div>

                  <div className="text-[#5f6368]">Liability</div>
                  <div className="text-right">{selectedAlert.liability}</div>
                </div>
              </div>

              {/* Second Card - Alert Details */}
              <div className="bg-white border border-[#dcdddf] rounded-lg p-4">
                <div className="grid grid-cols-2 gap-y-4">
                  <div className="text-[#5f6368]">Time of detection</div>
                  <div className="text-right">April 5, 2025, At {selectedAlert.time} UTC</div>

                  <div className="text-[#5f6368]">Market</div>
                  <div className="text-right">{selectedAlert.market}</div>

                  <div className="text-[#5f6368]">Fixture</div>
                  <div className="text-right">{selectedAlert.fixture}</div>

                  <div className="text-[#5f6368]">Severity</div>
                  <div className="text-right text-[#EF4444]">
                    {selectedAlert.severity === "high"
                      ? "High"
                      : selectedAlert.severity === "medium"
                        ? "Medium"
                        : "Low"}
                  </div>

                  <div className="text-[#5f6368]">Labels</div>
                  <div className="text-right flex justify-end gap-1">
                    <span className="px-2 py-1 bg-[#e2edf0] text-[#2b2c2d] rounded text-xs">
                      {selectedAlert.fixture.includes("Lakers")
                        ? "NBA"
                        : selectedAlert.fixture.includes("Cowboys")
                          ? "NFL"
                          : selectedAlert.fixture.includes("Braves")
                            ? "MLB"
                            : "NBA"}
                    </span>
                    <span className="px-2 py-1 bg-[#e2edf0] text-[#2b2c2d] rounded text-xs">{selectedAlert.type}</span>
                    <span className="px-2 py-1 bg-[#e2edf0] text-[#2b2c2d] rounded text-xs">
                      {selectedAlert.severity === "high" ? "URGENT" : "REVIEW"}
                    </span>
                  </div>

                  <div className="text-[#5f6368]">Origin System</div>
                  <div className="text-right">Anomaly Detector V1</div>

                  <div className="text-[#5f6368]">Recommendation</div>
                  <div className="text-right">{selectedAlert.recommendation}</div>

                  <div className="text-[#5f6368]">Version</div>
                  <div className="text-right">1.0</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="px-3 py-1.5 bg-[#62c11e] text-white text-sm rounded"
                  onClick={closeAlertDetailsModal}
                >
                  Accept
                </button>
                <button
                  className="px-3 py-1.5 bg-[#FFC107] text-white text-sm rounded"
                  onClick={closeAlertDetailsModal}
                >
                  Suspend
                </button>
                <button
                  className="px-3 py-1.5 bg-[#F44336] text-white text-sm rounded"
                  onClick={closeAlertDetailsModal}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
