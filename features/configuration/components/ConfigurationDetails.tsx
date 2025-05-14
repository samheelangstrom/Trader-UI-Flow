"use client"

import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { ConfigurationDetailsProps } from "../types"

export function ConfigurationDetails({ config, isOpen, onClose }: ConfigurationDetailsProps) {
  if (!config) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Configuration Details</span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-4 w-4" />
            </button>
          </DialogTitle>
        </DialogHeader>

        <div className="p-4">
          {/* Configuration Info */}
          <div className="mb-6 bg-[#f9f9f9] p-4 rounded-md">
            <h3 className="font-medium mb-2">Configuration Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Sport:</div>
              <div>{config.sport}</div>

              <div className="text-gray-500">Market Class:</div>
              <div>{config.marketClass}</div>

              <div className="text-gray-500">Market:</div>
              <div>{config.market}</div>

              {config.player && (
                <>
                  <div className="text-gray-500">Player:</div>
                  <div>{config.player}</div>
                </>
              )}

              <div className="text-gray-500">Status:</div>
              <div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    config.status === "Active" ? "bg-[#62c11e] text-white" : "bg-[#f1f2f3] text-[#5f6368]"
                  }`}
                >
                  {config.status}
                </span>
              </div>

              <div className="text-gray-500">Current Threshold:</div>
              <div>{config.threshold}</div>

              {config.history && config.history.length > 0 && config.history[0].reason && (
                <>
                  <div className="text-gray-500">Reason:</div>
                  <div>{config.history[0].reason}</div>
                </>
              )}
            </div>
          </div>

          {/* Threshold History */}
          <div className="mt-6 bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-[#f1f2f3] p-3 font-medium border-b border-gray-200">Threshold History</div>
            <div className="divide-y divide-gray-200">
              {config.history && config.history.length > 0 ? (
                config.history.map((item, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${index === 0 ? "bg-[#62c11e]" : "bg-gray-400"} mr-2`}
                        ></div>
                        <div className="font-medium text-[#2b2c2d]">{item.threshold}</div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-sm text-gray-500 mr-2">{item.date}</div>
                        {index === 0 && (
                          <div className="bg-[#eb6a2e] bg-opacity-10 text-[#eb6a2e] text-xs px-2 py-1 rounded">
                            Current
                          </div>
                        )}
                      </div>
                    </div>
                    {item.movedFrom && item.movedTo && (
                      <div className="text-sm mb-2">
                        <span className="text-gray-500">Changed from: </span>
                        <span className="font-medium">{item.movedFrom}</span>
                        <span className="text-gray-500 mx-1">→</span>
                        <span className="font-medium">{item.movedTo}</span>
                      </div>
                    )}
                    {item.reason && (
                      <div className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                        <span className="text-gray-500 font-medium">Reason: </span>
                        {item.reason}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No threshold history available</div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
