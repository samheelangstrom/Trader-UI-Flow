"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Search } from "lucide-react"
import type { MarginHistory as MarginHistoryType } from "../types"

interface MarginHistoryProps {
  history: MarginHistoryType[]
}

export function MarginHistory({ history }: MarginHistoryProps) {
  const [sortColumn, setSortColumn] = useState<string>("changedAt")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [searchTerm, setSearchTerm] = useState<string>("")

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  // Filter history by search term
  const filteredHistory = history.filter((item) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      item.marketName.toLowerCase().includes(term) ||
      item.changedBy.toLowerCase().includes(term) ||
      item.reason.toLowerCase().includes(term)
    )
  })

  // Sort history
  const sortedHistory = [...filteredHistory].sort((a, b) => {
    let valueA: any
    let valueB: any

    switch (sortColumn) {
      case "marketName":
        valueA = a.marketName
        valueB = b.marketName
        break
      case "previousValue":
        valueA = a.previousValue
        valueB = b.previousValue
        break
      case "newValue":
        valueA = a.newValue
        valueB = b.newValue
        break
      case "changedBy":
        valueA = a.changedBy
        valueB = b.changedBy
        break
      case "changedAt":
        valueA = new Date(a.changedAt).getTime()
        valueB = new Date(b.changedAt).getTime()
        break
      case "reason":
        valueA = a.reason
        valueB = b.reason
        break
      default:
        valueA = new Date(a.changedAt).getTime()
        valueB = new Date(b.changedAt).getTime()
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Format margin value as percentage
  const formatMargin = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("marketName")} className="flex items-center">
                  Market <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("previousValue")} className="flex items-center">
                  Previous Value <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("newValue")} className="flex items-center">
                  New Value <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("changedBy")} className="flex items-center">
                  Changed By <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("changedAt")} className="flex items-center">
                  Date <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("reason")} className="flex items-center">
                  Reason <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedHistory.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No margin history found
                </TableCell>
              </TableRow>
            ) : (
              sortedHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.marketName}</TableCell>
                  <TableCell className="font-mono">{formatMargin(item.previousValue)}</TableCell>
                  <TableCell className="font-mono">{formatMargin(item.newValue)}</TableCell>
                  <TableCell>{item.changedBy}</TableCell>
                  <TableCell>{formatDate(item.changedAt)}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
