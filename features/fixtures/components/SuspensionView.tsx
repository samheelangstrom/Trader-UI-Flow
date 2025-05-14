"use client"

import { useState } from "react"
import { AlertTriangle, Filter, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SuspendedMarket {
  id: string
  fixture: string
  market: string
  selection: string
  reason: string
  timestamp: string
  duration: number
  severity: "low" | "medium" | "high"
}

const mockSuspendedMarkets: SuspendedMarket[] = [
  {
    id: "1",
    fixture: "Los Angeles Lakers vs Boston Celtics",
    market: "Money Line",
    selection: "Los Angeles Lakers",
    reason: "Unusual betting pattern detected",
    timestamp: "2023-11-15T19:45:23Z",
    duration: 15,
    severity: "medium",
  },
  {
    id: "2",
    fixture: "Los Angeles Lakers vs Boston Celtics",
    market: "Total Points",
    selection: "Over 220.5",
    reason: "Price discrepancy with competitors",
    timestamp: "2023-11-15T19:48:12Z",
    duration: 10,
    severity: "low",
  },
  {
    id: "3",
    fixture: "Golden State Warriors vs Chicago Bulls",
    market: "Spread",
    selection: "Golden State Warriors -5.5",
    reason: "Player injury reported",
    timestamp: "2023-11-15T20:05:45Z",
    duration: 30,
    severity: "high",
  },
  {
    id: "4",
    fixture: "Dallas Cowboys vs New York Giants",
    market: "First Half Spread",
    selection: "Dallas Cowboys -3.5",
    reason: "Weather conditions changed",
    timestamp: "2023-11-16T18:25:10Z",
    duration: 20,
    severity: "medium",
  },
]

export function SuspensionView() {
  const [suspendedMarkets, setSuspendedMarkets] = useState<SuspendedMarket[]>(mockSuspendedMarkets)
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const filteredMarkets = suspendedMarkets.filter((market) => {
    const matchesSearch =
      market.fixture.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.selection.toLowerCase().includes(searchTerm.toLowerCase()) ||
      market.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeverity = severityFilter === "all" || market.severity === severityFilter

    return matchesSearch && matchesSeverity
  })

  const getSeverityBadge = (severity: SuspendedMarket["severity"]) => {
    switch (severity) {
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            High
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
          Suspended Markets
        </h2>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Search suspended markets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          {searchTerm && (
            <button className="absolute right-2.5 top-2.5" onClick={() => setSearchTerm("")}>
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>

        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredMarkets.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-gray-400 mb-4">
            <AlertTriangle className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No suspended markets found</h3>
          <p className="text-gray-500 mt-1">All markets are currently active</p>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Fixture</th>
                  <th className="px-4 py-3 text-left">Market</th>
                  <th className="px-4 py-3 text-left">Selection</th>
                  <th className="px-4 py-3 text-left">Reason</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Duration</th>
                  <th className="px-4 py-3 text-left">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMarkets.map((market) => (
                  <tr key={market.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm">{market.fixture}</td>
                    <td className="px-4 py-4 text-sm font-medium">{market.market}</td>
                    <td className="px-4 py-4 text-sm">{market.selection}</td>
                    <td className="px-4 py-4 text-sm">{market.reason}</td>
                    <td className="px-4 py-4 text-sm">{new Date(market.timestamp).toLocaleTimeString()}</td>
                    <td className="px-4 py-4 text-sm">{market.duration} min</td>
                    <td className="px-4 py-4 text-sm">{getSeverityBadge(market.severity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
