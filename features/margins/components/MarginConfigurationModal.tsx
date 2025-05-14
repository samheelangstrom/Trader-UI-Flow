"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { MarginConfiguration } from "../types"

interface MarginConfigurationModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (configuration: Partial<MarginConfiguration>) => void
  configuration?: MarginConfiguration
  sportOptions: { id: string; name: string }[]
  leagueOptions: { id: string; name: string }[]
  teamOptions: { id: string; name: string }[]
  marketTypeOptions: { id: string; name: string }[]
}

export function MarginConfigurationModal({
  isOpen,
  onClose,
  onSave,
  configuration,
  sportOptions,
  leagueOptions,
  teamOptions,
  marketTypeOptions,
}: MarginConfigurationModalProps) {
  const [formData, setFormData] = useState<Partial<MarginConfiguration>>({
    name: "",
    sportId: "all",
    sportName: "All Sports",
    value: 0.05,
    overrideParent: false,
  })

  // Reset form when configuration changes
  useEffect(() => {
    if (configuration) {
      setFormData({
        ...configuration,
      })
    } else {
      setFormData({
        name: "",
        sportId: "all",
        sportName: "All Sports",
        value: 0.05,
        overrideParent: false,
      })
    }
  }, [configuration, isOpen])

  // Handle form submission
  const handleSubmit = () => {
    // Validate form
    if (!formData.name || formData.value === undefined) {
      return
    }

    // Update sport name based on selected sport ID
    const selectedSport = sportOptions.find((sport) => sport.id === formData.sportId)
    if (selectedSport) {
      formData.sportName = selectedSport.name
    }

    // Update league name based on selected league ID
    if (formData.leagueId) {
      const selectedLeague = leagueOptions.find((league) => league.id === formData.leagueId)
      if (selectedLeague) {
        formData.leagueName = selectedLeague.name
      }
    }

    // Update team name based on selected team ID
    if (formData.teamId) {
      const selectedTeam = teamOptions.find((team) => team.id === formData.teamId)
      if (selectedTeam) {
        formData.teamName = selectedTeam.name
      }
    }

    // Update market type name based on selected market type ID
    if (formData.marketTypeId) {
      const selectedMarketType = marketTypeOptions.find((marketType) => marketType.id === formData.marketTypeId)
      if (selectedMarketType) {
        formData.marketTypeName = selectedMarketType.name
      }
    }

    onSave(formData)
    onClose()
  }

  // Handle input change
  const handleChange = (field: keyof MarginConfiguration, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{configuration ? "Edit" : "Create"} Margin Configuration</DialogTitle>
          <DialogDescription>
            {configuration ? "Update the margin configuration details." : "Create a new margin configuration."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., NBA Default Margin"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sport">Sport</Label>
            <Select value={formData.sportId || "all"} onValueChange={(value) => handleChange("sportId", value)}>
              <SelectTrigger id="sport">
                <SelectValue placeholder="Select Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                {sportOptions.map((sport) => (
                  <SelectItem key={sport.id} value={sport.id}>
                    {sport.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.sportId && formData.sportId !== "all" && (
            <div className="grid gap-2">
              <Label htmlFor="league">League</Label>
              <Select
                value={formData.leagueId || ""}
                onValueChange={(value) => handleChange("leagueId", value || undefined)}
              >
                <SelectTrigger id="league">
                  <SelectValue placeholder="Select League (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {leagueOptions
                    .filter((league) => league.id.startsWith(formData.sportId || ""))
                    .map((league) => (
                      <SelectItem key={league.id} value={league.id}>
                        {league.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.leagueId && (
            <div className="grid gap-2">
              <Label htmlFor="team">Team</Label>
              <Select
                value={formData.teamId || ""}
                onValueChange={(value) => handleChange("teamId", value || undefined)}
              >
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select Team (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {teamOptions
                    .filter((team) => team.id.startsWith(formData.leagueId || ""))
                    .map((team) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {formData.sportId && formData.sportId !== "all" && (
            <div className="grid gap-2">
              <Label htmlFor="marketType">Market Type</Label>
              <Select
                value={formData.marketTypeId || ""}
                onValueChange={(value) => handleChange("marketTypeId", value || undefined)}
              >
                <SelectTrigger id="marketType">
                  <SelectValue placeholder="Select Market Type (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {marketTypeOptions.map((marketType) => (
                    <SelectItem key={marketType.id} value={marketType.id}>
                      {marketType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="value">Margin Value (0-1)</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={formData.value || 0}
              onChange={(e) => handleChange("value", Number.parseFloat(e.target.value))}
            />
            <p className="text-sm text-gray-500">This is equivalent to {((formData.value || 0) * 100).toFixed(1)}%</p>
          </div>

          {formData.isInherited && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="overrideParent"
                checked={formData.overrideParent}
                onCheckedChange={(checked) => handleChange("overrideParent", checked)}
              />
              <Label htmlFor="overrideParent">Override parent margin</Label>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{configuration ? "Save Changes" : "Create"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
