"use client"

import { useState } from "react"
import { X, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Configuration, ConfigurationModalProps } from "../types"

export function ConfigurationModal({ isOpen, onClose, onSave, editingConfig }: ConfigurationModalProps) {
  const isEditing = !!editingConfig
  const [step, setStep] = useState(isEditing ? 2 : 1)
  const [config, setConfig] = useState<Configuration>({
    id: editingConfig?.id || Math.floor(Math.random() * 1000),
    sport: editingConfig?.sport || "",
    marketClass: editingConfig?.marketClass || "",
    market: editingConfig?.market || "",
    player: editingConfig?.player || "",
    threshold: editingConfig?.threshold || "",
    lastUpdated:
      editingConfig?.lastUpdated ||
      new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    status: editingConfig?.status || "Active",
    notes: editingConfig?.notes || "",
  })

  const currentThreshold = editingConfig?.threshold || "0"

  const handleChange = (field: string, value: string) => {
    setConfig({ ...config, [field]: value })
  }

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSave = () => {
    onSave(config)
    onClose()
    setStep(1)
  }

  const handleClose = () => {
    onClose()
    setStep(1)
  }

  const isStepOneValid =
    config.sport && config.marketClass && config.market && (config.player || config.marketClass !== "Player Props")

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {isEditing ? "Edit Configuration" : "Add New Configuration"}
              </DialogTitle>
              {isEditing && (
                <p className="text-sm text-[#5f6368] mt-1">
                  Editing configuration for {editingConfig.sport} - {editingConfig.marketClass} - {editingConfig.market}
                  {editingConfig.player ? ` - ${editingConfig.player}` : ""}
                </p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6 py-2">
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 1 ? "bg-[#eb6a2e] text-white" : "bg-[#f1f2f3] text-[#2b2c2d]"}`}
            >
              {step > 1 ? "✓" : "1"}
            </div>
            <div className="h-[2px] w-8 bg-[#f1f2f3]"></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 2 ? "bg-[#eb6a2e] text-white" : "bg-[#f1f2f3] text-[#2b2c2d]"}`}
            >
              2
            </div>
            <div className="ml-2 font-medium">{step === 1 ? "Select Scope" : "Set Threshold"}</div>
          </div>
          <p className="text-[#5f6368] mb-4">
            {step === 1
              ? "Select the scope for this threshold configuration."
              : "Configure the threshold value for the selected scope."}
          </p>
        </div>

        <div className="border-t border-[#dcdddf]"></div>

        {step === 1 ? (
          <div className="p-6 space-y-6 bg-white">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Sport</label>
                <Select value={config.sport} onValueChange={(value) => handleChange("sport", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basketball">Basketball</SelectItem>
                    <SelectItem value="Football">Football</SelectItem>
                    <SelectItem value="Baseball">Baseball</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Market Class</label>
                <Select value={config.marketClass} onValueChange={(value) => handleChange("marketClass", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Player Props">Player Props</SelectItem>
                    <SelectItem value="Moneyline">Moneyline</SelectItem>
                    <SelectItem value="Spread">Spread</SelectItem>
                    <SelectItem value="Team Totals">Team Totals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Market</label>
                <Select value={config.market} onValueChange={(value) => handleChange("market", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Points">Points</SelectItem>
                    <SelectItem value="Rebounds">Rebounds</SelectItem>
                    <SelectItem value="Assists">Assists</SelectItem>
                    <SelectItem value="Player Milestones">Player Milestones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {config.marketClass === "Player Props" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Player</label>
                  <Select value={config.player} onValueChange={(value) => handleChange("player", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LeBron James">LeBron James</SelectItem>
                      <SelectItem value="Stephen Curry">Stephen Curry</SelectItem>
                      <SelectItem value="Kevin Durant">Kevin Durant</SelectItem>
                      <SelectItem value="Giannis Antetokounmpo">Giannis Antetokounmpo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6 bg-white">
            <div className="bg-[#f9f9f9] p-6 rounded-md flex items-center justify-between">
              <div>
                <div className="text-sm text-[#5f6368]">Current Threshold</div>
                <div className="text-2xl font-bold">{currentThreshold}</div>
              </div>
              <ArrowRight className="h-6 w-6 text-[#5f6368]" />
              <div>
                <div className="text-sm text-[#5f6368]">New Threshold</div>
                <div className="text-2xl font-bold">{config.threshold}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Threshold Value</label>
              <Input
                type="number"
                step="0.01"
                value={config.threshold}
                onChange={(e) => handleChange("threshold", e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Notes (Reason for change)</label>
              <Textarea
                placeholder="Explain why this threshold is being updated"
                value={config.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className="w-full h-24"
              />
            </div>
          </div>
        )}

        <div className="border-t border-[#dcdddf]"></div>

        <div className="p-6 flex justify-end gap-2">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleNext} disabled={!isStepOneValid} className="bg-[#2b2c2d] hover:bg-[#1a1a1a]">
                Continue
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button onClick={handleSave} disabled={!config.threshold} className="bg-[#2b2c2d] hover:bg-[#1a1a1a]">
                Save Threshold
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
