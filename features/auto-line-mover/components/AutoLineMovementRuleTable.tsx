"use client"

import { ArrowUpDown, Edit, Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { AutoLineMovementRuleTableProps, AutoLineMovementMode } from "../types"

export function AutoLineMovementRuleTable({ rules, onEdit, onDelete, onToggleMode }: AutoLineMovementRuleTableProps) {
  const handleToggleMode = (ruleId: string, currentMode: AutoLineMovementMode) => {
    const newMode: AutoLineMovementMode = currentMode === "Automatic" ? "Recommendation" : "Automatic"
    onToggleMode(ruleId, newMode)
  }

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
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Mode</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-left font-medium">Threshold</th>
            <th className="py-3 px-4 text-left font-medium">Max Movement</th>
            <th className="py-3 px-4 text-left font-medium">
              <div className="flex items-center gap-1">
                <span>Updated</span>
                <ArrowUpDown className="h-3 w-3" />
              </div>
            </th>
            <th className="py-3 px-4 text-center font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={rule.id} className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
              <td className="py-3 px-4">{rule.sport}</td>
              <td className="py-3 px-4">{rule.marketClass || "All"}</td>
              <td className="py-3 px-4">{rule.market || "All"}</td>
              <td className="py-3 px-4">{rule.player || "All"}</td>
              <td className="py-3 px-4">
                {rule.mode === "Disabled" ? (
                  <span className="px-2 py-1 rounded-full text-xs bg-[#f1f2f3] text-[#5f6368]">Disabled</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Switch
                            checked={rule.mode === "Automatic"}
                            onCheckedChange={() => handleToggleMode(rule.id, rule.mode)}
                            disabled={rule.mode === "Disabled"}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Toggle between Automatic and Recommendation mode</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className={`text-xs ${rule.mode === "Automatic" ? "text-[#62c11e]" : "text-[#5f6368]"}`}>
                      {rule.mode}
                    </span>
                    {rule.mode === "Automatic" && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <AlertTriangle className="h-4 w-4 text-[#eb6a2e]" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This market has automatic line movement enabled</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                )}
              </td>
              <td className="py-3 px-4">
                {rule.mode !== "Disabled" && rule.thresholdPercentage ? `${rule.thresholdPercentage}%` : "-"}
              </td>
              <td className="py-3 px-4">
                {rule.mode !== "Disabled" && rule.maxMovement ? `${rule.maxMovement} pts` : "-"}
              </td>
              <td className="py-3 px-4">
                {new Date(rule.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(rule)}
                    className="h-8 w-8 text-[#5f6368] hover:text-[#2b2c2d]"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(rule.id)}
                    className="h-8 w-8 text-[#5f6368] hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          {rules.length === 0 && (
            <tr>
              <td colSpan={9} className="py-8 text-center text-[#5f6368]">
                No auto line movement rules configured. Click "Add Rule" to create one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
