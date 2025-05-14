"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Pin, PinOff, RefreshCw, ChevronRight, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Fixture } from "../types"

interface FixtureTableProps {
  fixtures: Fixture[]
  isLoading: boolean
  onTogglePin: (fixtureId: string) => void
  onRefresh: () => void
}

export function FixtureTable({ fixtures, isLoading, onTogglePin, onRefresh }: FixtureTableProps) {
  const router = useRouter()
  const [sortField, setSortField] = useState<keyof Fixture>("startTime")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof Fixture) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedFixtures = [...fixtures].sort((a, b) => {
    if (sortField === "startTime") {
      const dateA = new Date(a[sortField]).getTime()
      const dateB = new Date(b[sortField]).getTime()
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA
    } else if (sortField === "liability") {
      return sortDirection === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
    } else if (sortField === "markets" || sortField === "openMarkets" || sortField === "suspendedMarkets") {
      return sortDirection === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
    } else {
      const valueA = String(a[sortField]).toLowerCase()
      const valueB = String(b[sortField]).toLowerCase()
      return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    }
  })

  const handleFixtureClick = (fixtureId: string) => {
    router.push(`/game?id=${fixtureId}`)
  }

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case "basketball":
        return "/basketball-icon.png"
      case "football":
        return "/football-icon.png"
      case "baseball":
        return "/baseball-icon.png"
      default:
        return "/basketball-icon.png"
    }
  }

  const getStatusBadge = (status: Fixture["status"]) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        )
      case "in_play":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
            In Play
          </Badge>
        )
      case "suspended":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Suspended
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-md shadow overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-medium">Fixtures</h2>
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : fixtures.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-gray-400 mb-4">
            <Calendar className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No fixtures found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your filters or search criteria</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                <th className="px-4 py-3 text-left w-8"></th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("sport")}>
                  Sport
                  {sortField === "sport" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("league")}>
                  League
                  {sortField === "league" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("homeTeam")}>
                  Fixture
                  {sortField === "homeTeam" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("startTime")}>
                  Start Time
                  {sortField === "startTime" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("status")}>
                  Status
                  {sortField === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("markets")}>
                  Markets
                  {sortField === "markets" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("liability")}>
                  Liability
                  {sortField === "liability" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedFixtures.map((fixture) => (
                <tr key={fixture.id} className={`hover:bg-gray-50 ${fixture.isPinned ? "bg-yellow-50" : ""}`}>
                  <td className="px-4 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onTogglePin(fixture.id)
                      }}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {fixture.isPinned ? <Pin className="h-4 w-4 text-yellow-500" /> : <PinOff className="h-4 w-4" />}
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <Image
                        src={getSportIcon(fixture.sport) || "/placeholder.svg"}
                        alt={fixture.sport}
                        width={24}
                        height={24}
                        className="mr-2"
                      />
                      <span className="capitalize">{fixture.sport}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">{fixture.league}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      {fixture.homeTeamLogo ? (
                        <Image
                          src={fixture.homeTeamLogo || "/placeholder.svg"}
                          alt={fixture.homeTeam}
                          width={24}
                          height={24}
                          className="mr-2"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                      )}
                      <span>{fixture.homeTeam}</span>
                      <span className="mx-2 text-gray-400">vs</span>
                      {fixture.awayTeamLogo ? (
                        <Image
                          src={fixture.awayTeamLogo || "/placeholder.svg"}
                          alt={fixture.awayTeam}
                          width={24}
                          height={24}
                          className="mr-2"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                      )}
                      <span>{fixture.awayTeam}</span>
                    </div>
                    {fixture.score && (
                      <div className="mt-1 text-sm text-gray-500">
                        {fixture.score.home} - {fixture.score.away}
                        {fixture.period && (
                          <span className="ml-2">
                            {fixture.period} {fixture.timeRemaining && `(${fixture.timeRemaining})`}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4">{new Date(fixture.startTime).toLocaleString()}</td>
                  <td className="px-4 py-4">{getStatusBadge(fixture.status)}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium">{fixture.markets} total</span>
                      <div className="flex text-sm space-x-2 mt-1">
                        <span className="text-green-600">{fixture.openMarkets} open</span>
                        {fixture.suspendedMarkets > 0 && (
                          <span className="text-yellow-600">{fixture.suspendedMarkets} suspended</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="font-medium">${fixture.liability.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFixtureClick(fixture.id)}
                      className="text-blue-600"
                    >
                      View
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
