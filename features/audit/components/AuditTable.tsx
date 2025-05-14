"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Eye, RefreshCw, Clock, User, Activity, FileText } from "lucide-react"
import type { AuditEvent } from "../types"
import { Badge } from "@/components/ui/badge"

interface AuditTableProps {
  events: AuditEvent[]
  isLoading: boolean
  onViewDetails: (event: AuditEvent) => void
  onRefresh: () => void
}

export function AuditTable({ events, isLoading, onViewDetails, onRefresh }: AuditTableProps) {
  const [sortField, setSortField] = useState<keyof AuditEvent>("timestamp")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handleSort = (field: keyof AuditEvent) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const sortedEvents = [...events].sort((a, b) => {
    if (sortField === "timestamp") {
      return sortDirection === "asc"
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    }

    if (sortField === "user") {
      return sortDirection === "asc" ? a.user.name.localeCompare(b.user.name) : b.user.name.localeCompare(a.user.name)
    }

    if (sortField === "action" || sortField === "resource" || sortField === "resourceName") {
      return sortDirection === "asc"
        ? String(a[sortField]).localeCompare(String(b[sortField]))
        : String(b[sortField]).localeCompare(String(a[sortField]))
    }

    return 0
  })

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800"
      case "update":
        return "bg-blue-100 text-blue-800"
      case "delete":
        return "bg-red-100 text-red-800"
      case "suspend":
        return "bg-yellow-100 text-yellow-800"
      case "activate":
        return "bg-purple-100 text-purple-800"
      case "margin_change":
        return "bg-indigo-100 text-indigo-800"
      case "configuration_change":
        return "bg-teal-100 text-teal-800"
      case "login":
      case "logout":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getResourceBadgeColor = (resource: string) => {
    switch (resource) {
      case "market":
        return "bg-orange-100 text-orange-800"
      case "fixture":
        return "bg-cyan-100 text-cyan-800"
      case "player":
        return "bg-pink-100 text-pink-800"
      case "margin":
        return "bg-violet-100 text-violet-800"
      case "configuration":
        return "bg-emerald-100 text-emerald-800"
      case "user":
      case "system":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  return (
    <div className="rounded-md border">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">Audit Log</h3>
        <Button variant="outline" size="sm" onClick={onRefresh} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px] cursor-pointer" onClick={() => handleSort("timestamp")}>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Timestamp
                  {sortField === "timestamp" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("user")}>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  User
                  {sortField === "user" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("action")}>
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Action
                  {sortField === "action" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("resource")}>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Resource
                  {sortField === "resource" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("resourceName")}>
                <div className="flex items-center">
                  Resource Name
                  {sortField === "resourceName" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 ml-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-1" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Loading audit events...
                </TableCell>
              </TableRow>
            ) : sortedEvents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No audit events found.
                </TableCell>
              </TableRow>
            ) : (
              sortedEvents.map((event) => (
                <TableRow key={event.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">{formatTimestamp(event.timestamp)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{event.user.name}</span>
                      <span className="text-sm text-gray-500">{event.user.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getActionBadgeColor(event.action)} capitalize`}>
                      {event.action.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getResourceBadgeColor(event.resource)} capitalize`}>{event.resource}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">{event.resourceName}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => onViewDetails(event)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
