"use client"

import { ArrowUpDown, Eye, Edit } from "lucide-react"
import type { ConfigurationTableProps } from "../types"

export function ConfigurationTable({ configurations, onEdit, onViewDetails }: ConfigurationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-y border-[#dcdddf] bg-[#f1f2f3]">
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Sport</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Market Class</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Market</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Player</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">Current Threshold</th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Last Updated</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Status</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {configurations.map((config) => (
            <tr key={config.id} className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
              <td className="py-3 px-4">{config.sport}</td>
              <td className="py-3 px-4">{config.marketClass}</td>
              <td className="py-3 px-4">{config.market}</td>
              <td className="py-3 px-4">{config.player}</td>
              <td className="py-3 px-4">{config.threshold}</td>
              <td className="py-3 px-4">{config.lastUpdated}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    config.status === "Active" ? "bg-[#62c11e] text-white" : "bg-[#f1f2f3] text-[#5f6368]"
                  }`}
                >
                  {config.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center gap-2">
                  <button className="p-1 text-[#5f6368] hover:text-[#2b2c2d]" onClick={() => onViewDetails(config)}>
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 text-[#5f6368] hover:text-[#2b2c2d]" onClick={() => onEdit(config)}>
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
