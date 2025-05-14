"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash, Star } from "lucide-react"
import type { MarginPreset } from "../types"

interface MarginPresetsProps {
  presets: MarginPreset[]
  onCreatePreset: (preset: Partial<MarginPreset>) => void
  onUpdatePreset: (id: string, preset: Partial<MarginPreset>) => void
  onDeletePreset: (id: string) => void
  onSetDefaultPreset: (id: string) => void
}

export function MarginPresets({
  presets,
  onCreatePreset,
  onUpdatePreset,
  onDeletePreset,
  onSetDefaultPreset,
}: MarginPresetsProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPreset, setEditingPreset] = useState<MarginPreset | null>(null)
  const [newPreset, setNewPreset] = useState<Partial<MarginPreset>>({
    name: "",
    description: "",
    value: 0.05,
  })

  // Format margin value as percentage
  const formatMargin = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  // Handle create preset
  const handleCreatePreset = () => {
    if (newPreset.name && newPreset.value !== undefined) {
      onCreatePreset(newPreset)
      setNewPreset({
        name: "",
        description: "",
        value: 0.05,
      })
      setIsCreateDialogOpen(false)
    }
  }

  // Handle edit preset
  const handleEditPreset = () => {
    if (editingPreset && editingPreset.name && editingPreset.value !== undefined) {
      onUpdatePreset(editingPreset.id, {
        name: editingPreset.name,
        description: editingPreset.description,
        value: editingPreset.value,
      })
      setEditingPreset(null)
      setIsEditDialogOpen(false)
    }
  }

  // Open edit dialog
  const openEditDialog = (preset: MarginPreset) => {
    setEditingPreset({ ...preset })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Margin Presets</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Preset
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Margin Preset</DialogTitle>
              <DialogDescription>Create a new margin preset that can be applied to configurations.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newPreset.name}
                  onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                  placeholder="e.g., Conservative"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newPreset.description || ""}
                  onChange={(e) => setNewPreset({ ...newPreset, description: e.target.value })}
                  placeholder="e.g., Lower margins for competitive markets"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="value">Margin Value (0-1)</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={newPreset.value}
                  onChange={(e) => setNewPreset({ ...newPreset, value: Number.parseFloat(e.target.value) })}
                />
                <p className="text-sm text-gray-500">This is equivalent to {formatMargin(newPreset.value || 0)}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePreset}>Create Preset</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {presets.map((preset) => (
          <Card key={preset.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {preset.name}
                {preset.isDefault && (
                  <Badge variant="secondary" className="ml-2">
                    Default
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>{preset.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatMargin(preset.value)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => openEditDialog(preset)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <div className="flex gap-2">
                {!preset.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => onSetDefaultPreset(preset.id)}>
                    <Star className="mr-2 h-4 w-4" />
                    Set Default
                  </Button>
                )}
                <Button variant="outline" size="sm" className="text-red-600" onClick={() => onDeletePreset(preset.id)}>
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Edit Preset Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Margin Preset</DialogTitle>
          </DialogHeader>
          {editingPreset && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={editingPreset.name}
                  onChange={(e) => setEditingPreset({ ...editingPreset, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingPreset.description || ""}
                  onChange={(e) => setEditingPreset({ ...editingPreset, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-value">Margin Value (0-1)</Label>
                <Input
                  id="edit-value"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={editingPreset.value}
                  onChange={(e) => setEditingPreset({ ...editingPreset, value: Number.parseFloat(e.target.value) })}
                />
                <p className="text-sm text-gray-500">This is equivalent to {formatMargin(editingPreset.value || 0)}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPreset}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
