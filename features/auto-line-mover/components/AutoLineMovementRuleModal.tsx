"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { AutoLineMovementRuleModalProps, AutoLineMovementRuleFormValues, AutoLineMovementMode } from "../types"

export function AutoLineMovementRuleModal({ isOpen, onClose, onSave, editingRule }: AutoLineMovementRuleModalProps) {
  const isEditing = !!editingRule

  const [formValues, setFormValues] = useState<AutoLineMovementRuleFormValues>({
    sport: editingRule?.sport || "",
    marketClass: editingRule?.marketClass || "",
    market: editingRule?.market || "",
    player: editingRule?.player || "",
    mode: editingRule?.mode || "Recommendation",
    maxMovement: editingRule?.maxMovement || 0.5,
    thresholdPercentage: editingRule?.thresholdPercentage || 10,
    notes: editingRule?.notes || "",
  })

  useEffect(() => {
    if (editingRule) {
      setFormValues({
        sport: editingRule.sport || "",
        marketClass: editingRule.marketClass || "",
        market: editingRule.market || "",
        player: editingRule.player || "",
        mode: editingRule.mode || "Recommendation",
        maxMovement: editingRule.maxMovement || 0.5,
        thresholdPercentage: editingRule.thresholdPercentage || 10,
        notes: editingRule.notes || "",
      })
    } else {
      setFormValues({
        sport: "",
        marketClass: "",
        market: "",
        player: "",
        mode: "Recommendation",
        maxMovement: 0.5,
        thresholdPercentage: 10,
        notes: "",
      })
    }
  }, [editingRule, isOpen])

  const handleChange = (field: keyof AutoLineMovementRuleFormValues, value: any) => {
    setFormValues({ ...formValues, [field]: value })
  }

  const handleSave = () => {
    onSave(formValues)
  }

  const handleClose = () => {
    onClose()
  }

  const isFormValid = formValues.sport && formValues.mode

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {isEditing ? "Edit Auto Line Movement Rule" : "Add New Auto Line Movement Rule"}
              </DialogTitle>
              {isEditing && (
                <p className="text-sm text-[#5f6368] mt-1">
                  Editing rule for {editingRule.sport}
                  {editingRule.marketClass ? ` - ${editingRule.marketClass}` : ""}
                  {editingRule.market ? ` - ${editingRule.market}` : ""}
                  {editingRule.player ? ` - ${editingRule.player}` : ""}
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6 bg-white">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sport</label>
              <Select value={formValues.sport} onValueChange={(value) => handleChange("sport", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Football">Football</SelectItem>
                  <SelectItem value="Baseball">Baseball</SelectItem>
                  <SelectItem value="All Sports">All Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Market Class</label>
              <Select
                value={formValues.marketClass || ""}
                onValueChange={(value) => handleChange("marketClass", value || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Market Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Market Classes</SelectItem>
                  <SelectItem value="Player Props">Player Props</SelectItem>
                  <SelectItem value="Moneyline">Moneyline</SelectItem>
                  <SelectItem value="Spread">Spread</SelectItem>
                  <SelectItem value="Team Totals">Team Totals</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-[#5f6368] mt-1">Leave empty to apply to all market classes</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Market</label>
              <Select
                value={formValues.market || ""}
                onValueChange={(value) => handleChange("market", value || undefined)}
                disabled={!formValues.marketClass}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Markets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Markets</SelectItem>
                  <SelectItem value="Points">Points</SelectItem>
                  <SelectItem value="Rebounds">Rebounds</SelectItem>
                  <SelectItem value="Assists">Assists</SelectItem>
                  <SelectItem value="Player Milestones">Player Milestones</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-[#5f6368] mt-1">Leave empty to apply to all markets</p>
            </div>

            {formValues.marketClass === "Player Props" && (
              <div>
                <label className="block text-sm font-medium mb-1">Player</label>
                <Select
                  value={formValues.player || ""}
                  onValueChange={(value) => handleChange("player", value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Players" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Players</SelectItem>
                    <SelectItem value="LeBron James">LeBron James</SelectItem>
                    <SelectItem value="Stephen Curry">Stephen Curry</SelectItem>
                    <SelectItem value="Kevin Durant">Kevin Durant</SelectItem>
                    <SelectItem value="Giannis Antetokounmpo">Giannis Antetokounmpo</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-[#5f6368] mt-1">Leave empty to apply to all players</p>
              </div>
            )}

            <div className="pt-4 border-t border-[#dcdddf]">
              <label className="block text-sm font-medium mb-3">Line Movement Mode</label>
              <RadioGroup
                value={formValues.mode}
                onValueChange={(value) => handleChange("mode", value as AutoLineMovementMode)}
                className="space-y-3"
              >
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="Automatic" id="automatic" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="automatic" className="font-medium">
                      Automatic
                    </Label>
                    <p className="text-sm text-[#5f6368]">
                      System will automatically move lines based on liability without human intervention
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="Recommendation" id="recommendation" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="recommendation" className="font-medium">
                      Recommendation Only
                    </Label>
                    <p className="text-sm text-[#5f6368]">
                      System will suggest line movements but require trader approval
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="Disabled" id="disabled" className="mt-1" />
                  <div className="grid gap-1.5">
                    <Label htmlFor="disabled" className="font-medium">
                      Disabled
                    </Label>
                    <p className="text-sm text-[#5f6368]">
                      No automatic line movement or recommendations for these markets
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {formValues.mode !== "Disabled" && (
              <>
                <div className="pt-4">
                  <label className="block text-sm font-medium mb-1">Liability Threshold Percentage</label>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      step="1"
                      value={formValues.thresholdPercentage}
                      onChange={(e) => handleChange("thresholdPercentage", Number.parseFloat(e.target.value))}
                      className="w-24"
                    />
                    <span className="ml-2">%</span>
                  </div>
                  <p className="text-xs text-[#5f6368] mt-1">
                    Percentage of liability imbalance that triggers line movement
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Maximum Movement</label>
                  <div className="flex items-center">
                    <Input
                      type="number"
                      min="0.1"
                      max="10"
                      step="0.1"
                      value={formValues.maxMovement}
                      onChange={(e) => handleChange("maxMovement", Number.parseFloat(e.target.value))}
                      className="w-24"
                    />
                    <span className="ml-2">points</span>
                  </div>
                  <p className="text-xs text-[#5f6368] mt-1">
                    Maximum line movement allowed without manual intervention
                  </p>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <Textarea
                placeholder="Add any additional notes about this rule"
                value={formValues.notes || ""}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="w-full h-24"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#dcdddf]"></div>

        <div className="p-6 flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isFormValid} className="bg-[#2b2c2d] hover:bg-[#1a1a1a]">
            {isEditing ? "Update Rule" : "Create Rule"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
