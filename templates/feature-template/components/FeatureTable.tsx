"use client"
import { useFeature } from "../context/FeatureContext"
import type { FeatureStatus } from "../types"
import { formatDate } from "../utils/formatters"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function FeatureTable() {
  const { state, actions } = useFeature()
  const { filteredItems } = state

  // Handle row click to select an item
  const handleRowClick = (item: any) => {
    actions.selectItem(item)
  }

  // Render status badge with appropriate color
  const renderStatus = (status: FeatureStatus) => {
    const statusMap: Record<FeatureStatus, { label: string; variant: string }> = {
      active: { label: "Active", variant: "success" },
      inactive: { label: "Inactive", variant: "secondary" },
      pending: { label: "Pending", variant: "warning" },
      archived: { label: "Archived", variant: "destructive" },
    }

    const { label, variant } = statusMap[status] || { label: status, variant: "default" }

    return <Badge variant={variant as any}>{label}</Badge>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No items found
              </TableCell>
            </TableRow>
          ) : (
            filteredItems.map((item) => (
              <TableRow key={item.id} onClick={() => handleRowClick(item)} className="cursor-pointer hover:bg-gray-50">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{renderStatus(item.status)}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>{formatDate(item.updatedAt)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        actions.selectItem(item)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (confirm("Are you sure you want to delete this item?")) {
                          actions.deleteItem(item.id)
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
