"use client"

import { X } from "lucide-react"
import type { Alert } from "../types"

interface AlertDetailsModalProps {
  alert: Alert
  isOpen: boolean
  onClose: () => void
  onAccept: (id: number) => void
  onDismiss: (id: number) => void
  onSuspend: (id: number) => void
}

export function AlertDetailsModal({ alert, isOpen, onClose, onAccept, onDismiss, onSuspend }: AlertDetailsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-[#dcdddf]">
          <h2 className="text-xl font-semibold">Alert Details</h2>
          <button onClick={onClose} className="text-[#2b2c2d] hover:text-[#5f6368]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          {/* First Card - Price Information */}
          <div className="bg-white border border-[#dcdddf] rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-[#5f6368]">Price Taken</div>
              <div className="text-right">{alert.taken}</div>

              <div className="text-[#5f6368]">Our Price</div>
              <div className="text-right">{alert.current}</div>

              <div className="text-[#5f6368]">Market Average</div>
              <div className="text-right">{alert.marketAv}</div>

              <div className="text-[#5f6368]">Competitor Price</div>
              <div className="text-right">{alert.comp}</div>

              <div className="text-[#5f6368]">SF</div>
              <div className="text-right">{alert.sf}</div>

              <div className="text-[#5f6368]">Liability</div>
              <div className="text-right">{alert.liability}</div>
            </div>
          </div>

          {/* Second Card - Alert Details */}
          <div className="bg-white border border-[#dcdddf] rounded-lg p-4">
            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-[#5f6368]">Time of detection</div>
              <div className="text-right">April 5, 2025, At {alert.time} UTC</div>

              <div className="text-[#5f6368]">Market</div>
              <div className="text-right">{alert.market}</div>

              <div className="text-[#5f6368]">Fixture</div>
              <div className="text-right">{alert.fixture}</div>

              <div className="text-[#5f6368]">Severity</div>
              <div className="text-right text-[#EF4444]">
                {alert.severity === "high" ? "High" : alert.severity === "medium" ? "Medium" : "Low"}
              </div>

              <div className="text-[#5f6368]">Labels</div>
              <div className="text-right flex justify-end gap-1">
                <span className="px-2 py-1 bg-[#e2edf0] text-[#2b2c2d] rounded text-xs">
                  {alert.fixture.includes("Lakers")
                    ? "NBA"
                    : alert.fixture.includes("Cowboys")
                      ? "NFL"
                      : alert.fixture.includes("Braves")
                        ? "MLB"
                        : "NBA"}
                </span>
                <span className="px-2 py-1 bg-[#e2edf0] text-[#2b2c2d] rounded text-xs">{alert.type}</span>
                <span className="px-2 py-1 bg-[#e2edf0] text-[#2b2c2d] rounded text-xs">
                  {alert.severity === "high" ? "URGENT" : "REVIEW"}
                </span>
              </div>

              <div className="text-[#5f6368]">Origin System</div>
              <div className="text-right">Anomaly Detector V1</div>

              <div className="text-[#5f6368]">Recommendation</div>
              <div className="text-right">{alert.recommendation}</div>

              <div className="text-[#5f6368]">Version</div>
              <div className="text-right">1.0</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button className="px-3 py-1.5 bg-[#62c11e] text-white text-sm rounded" onClick={() => onAccept(alert.id)}>
              Accept
            </button>
            <button className="px-3 py-1.5 bg-[#FFC107] text-white text-sm rounded" onClick={() => onSuspend(alert.id)}>
              Suspend
            </button>
            <button className="px-3 py-1.5 bg-[#F44336] text-white text-sm rounded" onClick={() => onDismiss(alert.id)}>
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
