"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Activity, FileText, Info } from "lucide-react"
import type { AuditEvent } from "../types"

interface AuditDetailsModalProps {
  event: AuditEvent | null
  isOpen: boolean
  onClose: () => void
}

export function AuditDetailsModal({ event, isOpen, onClose }: AuditDetailsModalProps) {
  if (!event) return null

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date)
  }

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
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const renderDetailsContent = () => {
    const { details } = event

    // For changes with before/after values
    if (details.before && details.after) {
      return (
        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-medium text-gray-500">Changes</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-md">
              <h4 className="text-sm font-medium text-red-800 mb-2">Before</h4>
              <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-60">
                {JSON.stringify(details.before, null, 2)}
              </pre>
            </div>
            <div className="p-4 bg-green-50 rounded-md">
              <h4 className="text-sm font-medium text-green-800 mb-2">After</h4>
              <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-60">
                {JSON.stringify(details.after, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )
    }

    // For events with just notes or reason
    return (
      <div className="mt-6 space-y-4">
        {details.reason && (
          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Reason</h4>
            <p className="text-sm">{details.reason}</p>
          </div>
        )}
        {details.notes && (
          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Notes</h4>
            <p className="text-sm">{details.notes}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Audit Event Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                Timestamp
              </div>
              <p className="font-medium">{formatTimestamp(event.timestamp)}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-2" />
                User
              </div>
              <p className="font-medium">{event.user.name}</p>
              <p className="text-sm text-gray-500">
                {event.user.role} • {event.user.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <Activity className="h-4 w-4 mr-2" />
                Action
              </div>
              <Badge className={`${getActionBadgeColor(event.action)} capitalize`}>
                {event.action.replace(/_/g, " ")}
              </Badge>
            </div>
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-2" />
                Resource
              </div>
              <div className="space-y-1">
                <Badge className={`${getResourceBadgeColor(event.resource)} capitalize`}>{event.resource}</Badge>
                <p className="font-medium">{event.resourceName}</p>
                <p className="text-sm text-gray-500">ID: {event.resourceId}</p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-500">
              <Info className="h-4 w-4 mr-2" />
              Details
            </div>
            {renderDetailsContent()}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
