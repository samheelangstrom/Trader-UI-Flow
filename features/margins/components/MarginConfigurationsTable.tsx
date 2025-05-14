"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MoreHorizontal, Edit, Trash, Copy, ArrowUpDown, Check } from "lucide-react"
import type { MarginConfiguration, MarginPreset } from "../types"

interface MarginConfigurationsTableProps {
  configurations: MarginConfiguration[]
  presets: MarginPreset[]
  onEdit: (configuration: MarginConfiguration) => void
  onDelete: (id: string) => void
  onApplyPreset: (configId: string, presetId: string) => void
  onUpdateValue: (id: string, value: number, reason: string) => void
}

export function MarginConfigurationsTable({
  configurations,
  presets,
  onEdit,
  onDelete,
  onApplyPreset,
  onUpdateValue,
}: MarginConfigurationsTableProps) {
  const [sortColumn, setSortColumn] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<string>("")
  const [editReason, setEditReason] = useState<string>("")
  const [applyPresetId, setApplyPresetId] = useState<string | null>(null)

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Sort configurations
  const sortedConfigurations = [...configurations].sort((a, b) => {
    let valueA: any
    let valueB: any

    switch (sortColumn) {
      case "name":
        valueA = a.name
        valueB = b.name
        break
      case "sport":
        valueA = a.sportName
        valueB = b.sportName
        break
      case "league":
        valueA = a.leagueName || ""
        valueB = b.leagueName || ""
        break
      case "team":
        valueA = a.teamName || ""
        valueB = b.teamName || ""
        break
      case "marketType":
        valueA = a.marketTypeName || ""
        valueB = b.marketTypeName || ""
        break
      case "value":
        valueA = a.value
        valueB = b.value
        break
      default:
        valueA = a.name
        valueB = b.name
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Handle quick edit save
  const handleQuickEditSave = (id: string) => {
    const value = Number.parseFloat(editValue)
    if (!isNaN(value) && editReason) {
      onUpdateValue(id, value, editReason)
      setEditingId(null)
      setEditValue("")
      setEditReason("")
    }
  }

  // Handle apply preset
  const handleApplyPreset = (configId: string, presetId: string) => {
    onApplyPreset(configId, presetId)
    setApplyPresetId(null)
  }

  // Format margin value as percentage
  const formatMargin = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  return (
    <div className="bg-white rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center">
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("sport")} className="flex items-center">
                Sport <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("league")} className="flex items-center">
                League <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("team")} className="flex items-center">
                Team <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("marketType")} className="flex items-center">
                Market Type <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("value")} className="flex items-center">
                Margin <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedConfigurations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                No margin configurations found
              </TableCell>
            </TableRow>
          ) : (
            sortedConfigurations.map((config) => (
              <TableRow key={config.id}>
                <TableCell className="font-medium">
                  {config.name}
                  {config.isInherited && (
                    <Badge variant="outline" className="ml-2">
                      Inherited
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{config.sportName}</TableCell>
                <TableCell>{config.leagueName || "-"}</TableCell>
                <TableCell>{config.teamName || "-"}</TableCell>
                <TableCell>{config.marketTypeName || "-"}</TableCell>
                <TableCell>
                  {editingId === config.id ? (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          step="0.001"
                          min="0"
                          max="1"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="w-20"
                        />
                        <Button size="sm" onClick={() => handleQuickEditSave(config.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        placeholder="Reason for change"
                        value={editReason}
                        onChange={(e) => setEditReason(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <span className="font-mono">{formatMargin(config.value)}</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onEdit(config)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingId(config.id)
                          setEditValue(config.value.toString())
                        }}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Quick Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setApplyPresetId(config.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Apply Preset
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onDelete(config.id)} className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Apply Preset Dialog */}
                  <Dialog open={applyPresetId === config.id} onOpenChange={() => setApplyPresetId(null)}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Apply Margin Preset</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-sm text-gray-500">Select a preset to apply to {config.name}:</p>
                        <div className="grid grid-cols-1 gap-4">
                          {presets.map((preset) => (
                            <Button
                              key={preset.id}
                              variant="outline"
                              className="justify-start"
                              onClick={() => handleApplyPreset(config.id, preset.id)}
                            >
                              <div className="flex flex-col items-start">
                                <span className="font-medium">{preset.name}</span>
                                <span className="text-sm text-gray-500">
                                  {formatMargin(preset.value)} - {preset.description}
                                </span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
