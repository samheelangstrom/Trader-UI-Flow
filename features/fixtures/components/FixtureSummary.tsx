"use client"

import { Activity, AlertTriangle, Clock, DollarSign } from "lucide-react"
import type { Fixture } from "../types"

interface FixtureSummaryProps {
  fixtures: Fixture[]
}

export function FixtureSummary({ fixtures }: FixtureSummaryProps) {
  // Calculate summary metrics
  const totalFixtures = fixtures.length
  const inPlayFixtures = fixtures.filter((fixture) => fixture.status === "in_play").length
  const scheduledFixtures = fixtures.filter((fixture) => fixture.status === "scheduled").length
  const suspendedMarkets = fixtures.reduce((total, fixture) => total + fixture.suspendedMarkets, 0)
  const totalLiability = fixtures.reduce((total, fixture) => total + fixture.liability, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-4 flex items-start">
        <div className="rounded-full bg-blue-100 p-3 mr-4">
          <Activity className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Fixtures</p>
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">{totalFixtures}</h3>
            <div className="ml-2 text-sm">
              <span className="text-green-600 font-medium">{inPlayFixtures} in play</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-blue-600 font-medium">{scheduledFixtures} scheduled</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 flex items-start">
        <div className="rounded-full bg-yellow-100 p-3 mr-4">
          <AlertTriangle className="h-6 w-6 text-yellow-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Suspended Markets</p>
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">{suspendedMarkets}</h3>
            {suspendedMarkets > 0 && (
              <span className="ml-2 text-sm text-yellow-600 font-medium">Requires attention</span>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 flex items-start">
        <div className="rounded-full bg-green-100 p-3 mr-4">
          <DollarSign className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Liability</p>
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold">${totalLiability.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 flex items-start">
        <div className="rounded-full bg-purple-100 p-3 mr-4">
          <Clock className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Next Fixture</p>
          {fixtures.length > 0 ? (
            (() => {
              const now = new Date()
              const upcomingFixtures = fixtures
                .filter((fixture) => new Date(fixture.startTime) > now && fixture.status === "scheduled")
                .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())

              if (upcomingFixtures.length > 0) {
                const nextFixture = upcomingFixtures[0]
                return (
                  <div>
                    <h3 className="text-lg font-bold">
                      {nextFixture.homeTeam} vs {nextFixture.awayTeam}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(nextFixture.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      {" • "}
                      {new Date(nextFixture.startTime).toLocaleDateString()}
                    </p>
                  </div>
                )
              } else {
                return <p className="text-sm text-gray-500">No upcoming fixtures</p>
              }
            })()
          ) : (
            <p className="text-sm text-gray-500">No fixtures available</p>
          )}
        </div>
      </div>
    </div>
  )
}
