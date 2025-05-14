"use client"

import { useState } from "react"
import { Bell, Filter, RefreshCw, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Alert {
  id: string
  fixture: string
  type: "price_change" | "suspension" | "liability" | "system" | "user"
  message: string
  timestamp: string
  priority: "low" | "medium" | "high"
  read: boolean
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    fixture: "Los Angeles Lakers vs Boston Celtics",
    type: "price_change",
    message: "Significant price movement detected on Money Line market",
    timestamp: "2023-11-15T19:42:23Z",
    priority: "medium",
    read: false,
  },
  {
    id: "2",
    fixture: "Los Angeles Lakers vs Boston Celtics",
    type: "suspension",
    message: "Multiple markets suspended due to injury report",
    timestamp: "2023-11-15T19:45:12Z",
    priority: "high",
    read: false,
  },
  {
    id: "3",
    fixture: "Golden State Warriors vs Chicago Bulls",
    type: "liability",
    message: "Liability threshold exceeded on player props",
    timestamp: "2023-11-15T20:01:45Z",
    priority: "high",
    read: true,
  },
  {
    id: "4",
    fixture: "Dallas Cowboys vs New York Giants",
    type: "system",
    message: "Feed data inconsistency detected",
    timestamp: "2023-11-16T18:22:10Z",
    priority: "low",
    read: true,
  },
  {
    id: "5",
    fixture: "Miami Heat vs Philadelphia 76ers",
    type: "user",
    message: "Manual price adjustment by admin user",
    timestamp: "2023-11-16T19:05:33Z",
    priority: "medium",
    read: true,
  },
]

export function AlertingView() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [readFilter, setReadFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert)))
  }

  const markAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, read: true })))
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.fixture.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || alert.type === typeFilter
    const matchesPriority = priorityFilter === "all" || alert.priority === priorityFilter
    const matchesRead =
      readFilter === "all" || (readFilter === "read" && alert.read) || (readFilter === "unread" && !alert.read)

    return matchesSearch && matchesType && matchesPriority && matchesRead
  })

  const unreadCount = alerts.filter((alert) => !alert.read).length

  const getPriorityBadge = (priority: Alert["priority"]) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            High
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeBadge = (type: Alert["type"]) => {
    switch (type) {
      case "price_change":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Price Change
          </Badge>
        )
      case "suspension":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Suspension
          </Badge>
        )
      case "liability":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Liability
          </Badge>
        )
      case "system":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            System
          </Badge>
        )
      case "user":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            User
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium flex items-center">
          <Bell className="h-5 w-5 mr-2 text-blue-500" />
          Alerts
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </h2>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
          <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          {searchTerm && (
            <button className="absolute right-2.5 top-2.5" onClick={() => setSearchTerm("")}>
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="price_change">Price Change</SelectItem>
            <SelectItem value="suspension">Suspension</SelectItem>
            <SelectItem value="liability">Liability</SelectItem>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>

        <Select value={readFilter} onValueChange={setReadFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="text-gray-400 mb-4">
            <Bell className="mx-auto h-12 w-12" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No alerts found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your filters or search criteria</p>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left">Fixture</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Message</th>
                  <th className="px-4 py-3 text-left">Time</th>
                  <th className="px-4 py-3 text-left">Priority</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAlerts.map((alert) => (
                  <tr key={alert.id} className={`hover:bg-gray-50 ${!alert.read ? "bg-blue-50" : ""}`}>
                    <td className="px-4 py-4 text-sm">{alert.fixture}</td>
                    <td className="px-4 py-4 text-sm">{getTypeBadge(alert.type)}</td>
                    <td className="px-4 py-4 text-sm">{alert.message}</td>
                    <td className="px-4 py-4 text-sm">{new Date(alert.timestamp).toLocaleTimeString()}</td>
                    <td className="px-4 py-4 text-sm">{getPriorityBadge(alert.priority)}</td>
                    <td className="px-4 py-4 text-sm">
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-blue-600"
                              onClick={() => setSelectedAlert(alert)}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Alert Details</DialogTitle>
                            </DialogHeader>
                            {selectedAlert && (
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <div className="text-sm font-medium text-gray-500">Fixture</div>
                                    <div className="mt-1">{selectedAlert.fixture}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-500">Type</div>
                                    <div className="mt-1">{getTypeBadge(selectedAlert.type)}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-500">Priority</div>
                                    <div className="mt-1">{getPriorityBadge(selectedAlert.priority)}</div>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-500">Message</div>
                                  <div className="mt-1">{selectedAlert.message}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-500">Timestamp</div>
                                  <div className="mt-1">{new Date(selectedAlert.timestamp).toLocaleString()}</div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                  <Button onClick={() => markAsRead(selectedAlert.id)} disabled={selectedAlert.read}>
                                    {selectedAlert.read ? "Already Read" : "Mark as Read"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        {!alert.read && (
                          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => markAsRead(alert.id)}>
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
