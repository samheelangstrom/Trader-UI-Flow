"use client"

import { MoreHorizontal } from "lucide-react"
import type { Alert } from "../types"

interface AlertTableProps {
  alerts: Alert[]
  onViewDetails: (alert: Alert) => void
  onAccept: (id: number) => void
  onDismiss: (id: number) => void
  onSuspend: (id: number) => void
}

export function AlertTable({ alerts, onViewDetails, onAccept, onDismiss, onSuspend }: AlertTableProps) {
  return (
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    <button
                      className="px-2 py-1 bg-[#62c11e] text-white text-xs rounded"
                      onClick={() => onAccept(alert.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-2 py-1 bg-[#F44336] text-white text-xs rounded"
                      onClick={() => onDismiss(alert.id)}
                    >
                      Dismiss
                    </button>
                    <button
                      className="px-2 py-1 bg-[#FFC107] text-white text-xs rounded"
                      onClick={() => onSuspend(alert.id)}
                    >
                      Suspend
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <button className="text-[#5f6368] hover:text-[#2b2c2d]" onClick={() => onViewDetails(alert)}>
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
