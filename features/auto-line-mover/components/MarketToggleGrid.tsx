"use client"

import { useState } from "react"

type MarketStatus = "Automatic" | "Recommendation" | "Disabled"

interface Market {
  id: string
  name: string
  status: MarketStatus
}

const initialMarkets: Market[] = [
  { id: "moneyline", name: "Moneyline", status: "Automatic" },
  { id: "spread", name: "Spread", status: "Automatic" },
  { id: "totals", name: "Totals", status: "Recommendation" },
  { id: "alt-spread", name: "Alt Spread", status: "Disabled" },
  { id: "alt-totals", name: "Alt Totals", status: "Disabled" },
  { id: "player-points", name: "Player Points", status: "Automatic" },
  { id: "player-rebounds", name: "Player Rebounds", status: "Recommendation" },
  { id: "player-assists", name: "Player Assists", status: "Recommendation" },
]

export function MarketToggleGrid() {
  const [markets, setMarkets] = useState<Market[]>(initialMarkets)

  const handleToggleMarket = (marketId: string) => {
    setMarkets(
      markets.map((market) => {
        if (market.id !== marketId) return market

        // Cycle through statuses: Automatic -> Recommendation -> Disabled -> Automatic
        let newStatus: MarketStatus
        if (market.status === "Automatic") newStatus = "Recommendation"
        else if (market.status === "Recommendation") newStatus = "Disabled"
        else newStatus = "Automatic"

        return {
          ...market,
          status: newStatus,
        }
      }),
    )
  }

  const getStatusColor = (status: MarketStatus) => {
    switch (status) {
      case "Automatic":
        return "bg-green-500"
      case "Recommendation":
        return "bg-yellow-400"
      case "Disabled":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  const getStatusText = (status: MarketStatus) => {
    switch (status) {
      case "Automatic":
        return "Auto"
      case "Recommendation":
        return "Rec"
      case "Disabled":
        return "Off"
      default:
        return "Off"
    }
  }

  return (
    <div className="bg-white rounded-md overflow-hidden border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Market Auto Line Mover Status</h3>
          <p className="text-sm text-gray-500">Click on a market to toggle its auto line mover status</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Automatic</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <span className="text-xs">Recommendation</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-gray-300"></div>
            <span className="text-xs">Disabled</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {markets.map((market) => (
          <button
            key={market.id}
            onClick={() => handleToggleMarket(market.id)}
            className="p-3 rounded-md border border-gray-200 hover:border-gray-300 text-left"
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium">{market.name}</span>
              <span className={`${getStatusColor(market.status)} text-white text-xs px-2 py-0.5 rounded-full`}>
                {getStatusText(market.status)}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
