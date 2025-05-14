"use client"

import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import type { AlertingConfigurationTableProps } from "../types"

export function AlertingConfigurationTable({
  configurations,
  onEdit,
  onToggle,
  onDelete,
}: AlertingConfigurationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-y border-[#dcdddf] bg-[#f1f2f3]">
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Name</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Sport</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">Filters</th>
            <th className="py-3 px-4 text-left font-medium">Time Ranges</th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Last Updated</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-center font-medium">Status</th>
            <th className="py-3 px-4 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {configurations.map((config) => (
            <tr key={config.id} className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
              <td className="py-3 px-4">
                <div>
                  <div className="font-medium">{config.name}</div>
                  {config.description && <div className="text-xs text-gray-500">{config.description}</div>}
                </div>
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${getSportStyles(config.sport)}`}>
                  {config.sport.charAt(0).toUpperCase() + config.sport.slice(1)}
                </span>
              </td>
              <td className="py-3 px-4">
                <div className="space-y-1">
                  <div className="text-xs">
                    <span className="font-medium">Leagues:</span>{" "}
                    {config.leagues.selectionType === "all"
                      ? "All"
                      : config.leagues.selected.length > 0
                        ? `${config.leagues.selected.length} selected`
                        : "None"}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Markets:</span>{" "}
                    {config.markets.selectionType === "all"
                      ? "All"
                      : config.markets.selected.length > 0
                        ? `${config.markets.selected.length} selected`
                        : "None"}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Customer Factor:</span> {config.customerFactorRange.min} -{" "}
                    {config.customerFactorRange.max}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="space-y-1">
                  <div className="text-xs">
                    <span className="font-medium">Ranges:</span> {config.timeRanges.length}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Default:</span>{" "}
                    {config.defaultRange.enabled ? `Threshold: ${config.defaultRange.threshold}` : "Disabled"}
                  </div>
                  <div className="text-xs">
                    <span className="font-medium">Expiration:</span>{" "}
                    {config.expirationSettings.neverExpire ? "Never" : `${config.expirationSettings.timeToExpire}s`}
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                {new Date(config.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="py-3 px-4 text-center">
                <Switch checked={config.enabled} onCheckedChange={(checked) => onToggle(config.id, checked)} />
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(config)}
                    className="h-8 w-8 text-[#5f6368] hover:text-[#2b2c2d]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(config.id)}
                    className="h-8 w-8 text-[#5f6368] hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function getSportStyles(sport: string): string {
  switch (sport) {
    case "basketball":
      return "bg-orange-100 text-orange-800"
    case "football":
      return "bg-green-100 text-green-800"
    case "baseball":
      return "bg-blue-100 text-blue-800"
    case "hockey":
      return "bg-purple-100 text-purple-800"
    case "soccer":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
