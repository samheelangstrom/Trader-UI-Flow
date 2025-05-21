"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { X, Plus, Trash, Info } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import type {
  AlertingConfiguration,
  AlertingConfigurationModalProps,
  TimeRange,
  SportType,
  SelectionType,
  AlertType,
  TimeWindowUnit,
} from "../types"

// Preset configurations for different alert types
const alertTypePresets: Record<
  Exclude<AlertType, "custom">,
  {
    description: string
    customerFactorRange: { min: number; max: number }
    timeRanges: Omit<TimeRange, "id">[]
    defaultRange: {
      threshold: number
      enabled: boolean
      betCountThreshold: number
      timeWindowValue: number
      timeWindowUnit: TimeWindowUnit
    }
  }
> = {
  arb: {
    description: "Detect potential arbitrage opportunities with high stake factors",
    customerFactorRange: { min: 80, max: 100 },
    timeRanges: [
      {
        name: "Close to Event",
        startMinutes: 0,
        endMinutes: 30,
        threshold: 8,
        enabled: true,
        betCountThreshold: 5,
        timeWindowValue: 15,
        timeWindowUnit: "seconds",
      },
      {
        name: "Pre-Game",
        startMinutes: 30,
        endMinutes: 120,
        threshold: 6,
        enabled: true,
        betCountThreshold: 10,
        timeWindowValue: 1,
        timeWindowUnit: "minutes",
      },
      {
        name: "Early Market",
        startMinutes: 120,
        endMinutes: 1440, // 24 hours
        threshold: 4,
        enabled: true,
        betCountThreshold: 15,
        timeWindowValue: 5,
        timeWindowUnit: "minutes",
      },
    ],
    defaultRange: {
      threshold: 3,
      enabled: true,
      betCountThreshold: 20,
      timeWindowValue: 10,
      timeWindowUnit: "minutes",
    },
  },
  sharp: {
    description: "Identify sharp betting patterns from professional bettors",
    customerFactorRange: { min: 70, max: 100 },
    timeRanges: [
      {
        name: "Close to Event",
        startMinutes: 0,
        endMinutes: 60,
        threshold: 7,
        enabled: true,
        betCountThreshold: 3,
        timeWindowValue: 30,
        timeWindowUnit: "seconds",
      },
      {
        name: "Pre-Game",
        startMinutes: 60,
        endMinutes: 240,
        threshold: 5,
        enabled: true,
        betCountThreshold: 8,
        timeWindowValue: 2,
        timeWindowUnit: "minutes",
      },
    ],
    defaultRange: {
      threshold: 4,
      enabled: true,
      betCountThreshold: 12,
      timeWindowValue: 5,
      timeWindowUnit: "minutes",
    },
  },
  value: {
    description: "Monitor value betting opportunities with moderate stake factors",
    customerFactorRange: { min: 50, max: 90 },
    timeRanges: [
      {
        name: "Close to Event",
        startMinutes: 0,
        endMinutes: 60,
        threshold: 5,
        enabled: true,
        betCountThreshold: 4,
        timeWindowValue: 45,
        timeWindowUnit: "seconds",
      },
      {
        name: "Pre-Game",
        startMinutes: 60,
        endMinutes: 360,
        threshold: 4,
        enabled: true,
        betCountThreshold: 7,
        timeWindowValue: 3,
        timeWindowUnit: "minutes",
      },
    ],
    defaultRange: {
      threshold: 3,
      enabled: true,
      betCountThreshold: 10,
      timeWindowValue: 5,
      timeWindowUnit: "minutes",
    },
  },
  alm: {
    description: "Automated Liability Management for high-risk markets",
    customerFactorRange: { min: 60, max: 100 },
    timeRanges: [
      {
        name: "Live Event",
        startMinutes: 0,
        endMinutes: 15,
        threshold: 10,
        enabled: true,
        betCountThreshold: 8,
        timeWindowValue: 10,
        timeWindowUnit: "seconds",
      },
      {
        name: "Close to Event",
        startMinutes: 15,
        endMinutes: 60,
        threshold: 8,
        enabled: true,
        betCountThreshold: 12,
        timeWindowValue: 30,
        timeWindowUnit: "seconds",
      },
      {
        name: "Pre-Game",
        startMinutes: 60,
        endMinutes: 180,
        threshold: 6,
        enabled: true,
        betCountThreshold: 15,
        timeWindowValue: 2,
        timeWindowUnit: "minutes",
      },
    ],
    defaultRange: {
      threshold: 5,
      enabled: true,
      betCountThreshold: 20,
      timeWindowValue: 5,
      timeWindowUnit: "minutes",
    },
  },
}

export function AlertingConfigurationModal({
  isOpen,
  onClose,
  onSave,
  editingConfig,
}: AlertingConfigurationModalProps) {
  const isEditing = !!editingConfig
  const [config, setConfig] = useState<AlertingConfiguration>(
    editingConfig || {
      id: 0,
      name: "",
      description: "",
      alertType: "custom",
      sport: "all",
      leagues: {
        selectionType: "all",
        selected: [],
      },
      marketClasses: {
        selectionType: "all",
        selected: [],
      },
      markets: {
        selectionType: "all",
        selected: [],
      },
      players: {
        selectionType: "all",
        selected: [],
      },
      customerFactorRange: {
        min: 0,
        max: 100,
      },
      timeRanges: [],
      defaultRange: {
        threshold: 5,
        enabled: true,
        betCountThreshold: 10,
        timeWindowValue: 1,
        timeWindowUnit: "minutes",
      },
      expirationSettings: {
        timeToExpire: 0,
        neverExpire: true,
        dropBetsAfterExpiration: false,
        expireOldAlerts: false,
      },
      enabled: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "Current User",
      updatedBy: "Current User",
    },
  )

  const [activeTab, setActiveTab] = useState("general")

  // Apply preset configuration when alert type changes
  useEffect(() => {
    if (config.alertType !== "custom" && !isEditing) {
      const preset = alertTypePresets[config.alertType]

      // Generate suggested name based on alert type
      const suggestedName = `${config.alertType.charAt(0).toUpperCase() + config.alertType.slice(1)} Alert`

      // Apply preset values
      setConfig((prevConfig) => ({
        ...prevConfig,
        name: prevConfig.name || suggestedName,
        description: preset.description,
        customerFactorRange: preset.customerFactorRange,
        timeRanges: preset.timeRanges.map((range) => ({
          ...range,
          id: uuidv4(),
        })),
        defaultRange: preset.defaultRange,
      }))
    }
  }, [config.alertType, isEditing])

  const handleChange = (field: keyof AlertingConfiguration, value: any) => {
    setConfig({ ...config, [field]: value })
  }

  const handleNestedChange = (parent: keyof AlertingConfiguration, field: string, value: any) => {
    setConfig({
      ...config,
      [parent]: {
        ...config[parent as keyof AlertingConfiguration],
        [field]: value,
      },
    })
  }

  const handleSelectionTypeChange = (
    field: "leagues" | "marketClasses" | "markets" | "players",
    value: SelectionType,
  ) => {
    setConfig({
      ...config,
      [field]: {
        ...config[field],
        selectionType: value,
        // Clear selections if changing to "all"
        selected: value === "all" ? [] : config[field].selected,
      },
    })
  }

  const handleSelectionChange = (field: "leagues" | "marketClasses" | "markets" | "players", selected: string[]) => {
    setConfig({
      ...config,
      [field]: {
        ...config[field],
        selected,
      },
    })
  }

  const handleAddTimeRange = () => {
    const newRange: TimeRange = {
      id: uuidv4(),
      name: `Range ${config.timeRanges.length + 1}`,
      startMinutes: config.timeRanges.length > 0 ? config.timeRanges[config.timeRanges.length - 1].endMinutes : 0,
      endMinutes: config.timeRanges.length > 0 ? config.timeRanges[config.timeRanges.length - 1].endMinutes + 60 : 60,
      threshold: 5,
      enabled: true,
      betCountThreshold: 5,
      timeWindowValue: 1,
      timeWindowUnit: "minutes",
    }
    handleChange("timeRanges", [...config.timeRanges, newRange])
  }

  const handleRemoveTimeRange = (id: string) => {
    handleChange(
      "timeRanges",
      config.timeRanges.filter((range) => range.id !== id),
    )
  }

  const handleUpdateTimeRange = (id: string, field: keyof TimeRange, value: any) => {
    handleChange(
      "timeRanges",
      config.timeRanges.map((range) => (range.id === id ? { ...range, [field]: value } : range)),
    )
  }

  const handleSave = () => {
    onSave({
      ...config,
      updatedAt: new Date().toISOString(),
      updatedBy: "Current User",
    })
  }

  // Check if at least one filter is configured (not all are set to "all")
  const hasAtLeastOneFilter =
    config.sport !== "all" ||
    config.leagues.selectionType !== "all" ||
    config.marketClasses.selectionType !== "all" ||
    config.markets.selectionType !== "all" ||
    config.players.selectionType !== "all" ||
    config.customerFactorRange.min > 0 ||
    config.customerFactorRange.max < 100

  // Validation now only requires name, at least one time range, and at least one filter
  const isValid = config.name && config.timeRanges.length > 0

  // Sample data for dropdowns
  const sampleLeagues = ["NBA", "WNBA", "NCAA", "Euroleague", "NBL"]
  const sampleMarketClasses = ["Moneyline", "Spread", "Total", "Player Props", "Team Props"]
  const sampleMarkets = ["Win", "Point Spread", "Over/Under", "First Half", "Quarter"]
  const samplePlayers = ["LeBron James", "Stephen Curry", "Kevin Durant", "Giannis Antetokounmpo", "Luka Dončić"]

  // Get alert type badge color
  const getAlertTypeBadgeColor = (type: AlertType) => {
    switch (type) {
      case "arb":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "sharp":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "value":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "alm":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold">
                {isEditing ? "Edit Alert Configuration" : "Add New Alert Configuration"}
              </DialogTitle>
              {isEditing && (
                <p className="text-sm text-[#5f6368] mt-1">Editing alert configuration: {editingConfig.name}</p>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-[#dcdddf]">
            <TabsList className="h-12 w-full rounded-none bg-transparent p-0">
              <TabsTrigger
                value="general"
                className="h-12 flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#2b2c2d] data-[state=active]:bg-transparent"
              >
                General
              </TabsTrigger>
              <TabsTrigger
                value="filters"
                className="h-12 flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#2b2c2d] data-[state=active]:bg-transparent"
              >
                Filters
              </TabsTrigger>
              <TabsTrigger
                value="timeRanges"
                className="h-12 flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#2b2c2d] data-[state=active]:bg-transparent"
              >
                Time Ranges
              </TabsTrigger>
              <TabsTrigger
                value="expiration"
                className="h-12 flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-[#2b2c2d] data-[state=active]:bg-transparent"
              >
                Expiration
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <TabsContent value="general" className="mt-0 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Alert Type</label>
                <div className="space-y-2">
                  <Select
                    value={config.alertType}
                    onValueChange={(value: AlertType) => handleChange("alertType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select alert type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">Custom Alert</SelectItem>
                      <SelectItem value="arb">Arbitrage (Arb)</SelectItem>
                      <SelectItem value="sharp">Sharp Betting</SelectItem>
                      <SelectItem value="value">Value Betting</SelectItem>
                      <SelectItem value="alm">Automated Liability Management (ALM)</SelectItem>
                    </SelectContent>
                  </Select>

                  {config.alertType !== "custom" && (
                    <div className="flex items-start mt-2">
                      <Badge className={`${getAlertTypeBadgeColor(config.alertType)} font-normal text-xs py-1 px-2`}>
                        Preset Configuration
                      </Badge>
                      <p className="text-xs text-gray-500 ml-2">{alertTypePresets[config.alertType].description}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Alert Name</label>
                <Input
                  value={config.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter alert name"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={config.description || ""}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Enter alert description"
                  className="w-full h-20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Sport</label>
                <Select value={config.sport} onValueChange={(value: SportType) => handleChange("sport", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sports</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="baseball">Baseball</SelectItem>
                    <SelectItem value="hockey">Hockey</SelectItem>
                    <SelectItem value="soccer">Soccer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="filters" className="mt-0 space-y-6">
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> You only need to configure one filter for the alert to work. Leave filters
                    set to "All" if you don't want to filter by that category.
                  </p>
                </div>
              </div>

              <Accordion type="single" collapsible defaultValue="leagues" className="w-full">
                <AccordionItem value="leagues">
                  <AccordionTrigger className="py-4">Leagues</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Selection Type</label>
                      <Select
                        value={config.leagues.selectionType}
                        onValueChange={(value: SelectionType) => handleSelectionTypeChange("leagues", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Leagues</SelectItem>
                          <SelectItem value="single">Single League</SelectItem>
                          <SelectItem value="multiple">Multiple Leagues</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {config.leagues.selectionType !== "all" && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Selected Leagues</label>
                        <div className="grid grid-cols-2 gap-2">
                          {sampleLeagues.map((league) => (
                            <div key={league} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`league-${league}`}
                                checked={config.leagues.selected.includes(league)}
                                onChange={(e) => {
                                  const selected = e.target.checked
                                    ? [...config.leagues.selected, league]
                                    : config.leagues.selected.filter((l) => l !== league)
                                  handleSelectionChange("leagues", selected)
                                }}
                                disabled={
                                  config.leagues.selectionType === "single" &&
                                  config.leagues.selected.length > 0 &&
                                  !config.leagues.selected.includes(league)
                                }
                              />
                              <label htmlFor={`league-${league}`} className="text-sm">
                                {league}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="marketClasses">
                  <AccordionTrigger className="py-4">Market Classes</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Selection Type</label>
                      <Select
                        value={config.marketClasses.selectionType}
                        onValueChange={(value: SelectionType) => handleSelectionTypeChange("marketClasses", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Market Classes</SelectItem>
                          <SelectItem value="single">Single Market Class</SelectItem>
                          <SelectItem value="multiple">Multiple Market Classes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {config.marketClasses.selectionType !== "all" && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Selected Market Classes</label>
                        <div className="grid grid-cols-2 gap-2">
                          {sampleMarketClasses.map((marketClass) => (
                            <div key={marketClass} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`marketClass-${marketClass}`}
                                checked={config.marketClasses.selected.includes(marketClass)}
                                onChange={(e) => {
                                  const selected = e.target.checked
                                    ? [...config.marketClasses.selected, marketClass]
                                    : config.marketClasses.selected.filter((m) => m !== marketClass)
                                  handleSelectionChange("marketClasses", selected)
                                }}
                                disabled={
                                  config.marketClasses.selectionType === "single" &&
                                  config.marketClasses.selected.length > 0 &&
                                  !config.marketClasses.selected.includes(marketClass)
                                }
                              />
                              <label htmlFor={`marketClass-${marketClass}`} className="text-sm">
                                {marketClass}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="markets">
                  <AccordionTrigger className="py-4">Markets</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Selection Type</label>
                      <Select
                        value={config.markets.selectionType}
                        onValueChange={(value: SelectionType) => handleSelectionTypeChange("markets", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Markets</SelectItem>
                          <SelectItem value="single">Single Market</SelectItem>
                          <SelectItem value="multiple">Multiple Markets</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {config.markets.selectionType !== "all" && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Selected Markets</label>
                        <div className="grid grid-cols-2 gap-2">
                          {sampleMarkets.map((market) => (
                            <div key={market} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`market-${market}`}
                                checked={config.markets.selected.includes(market)}
                                onChange={(e) => {
                                  const selected = e.target.checked
                                    ? [...config.markets.selected, market]
                                    : config.markets.selected.filter((m) => m !== market)
                                  handleSelectionChange("markets", selected)
                                }}
                                disabled={
                                  config.markets.selectionType === "single" &&
                                  config.markets.selected.length > 0 &&
                                  !config.markets.selected.includes(market)
                                }
                              />
                              <label htmlFor={`market-${market}`} className="text-sm">
                                {market}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="players">
                  <AccordionTrigger className="py-4">Players</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Selection Type</label>
                      <Select
                        value={config.players.selectionType}
                        onValueChange={(value: SelectionType) => handleSelectionTypeChange("players", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Players</SelectItem>
                          <SelectItem value="single">Single Player</SelectItem>
                          <SelectItem value="multiple">Multiple Players</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {config.players.selectionType !== "all" && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Selected Players</label>
                        <div className="grid grid-cols-2 gap-2">
                          {samplePlayers.map((player) => (
                            <div key={player} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`player-${player}`}
                                checked={config.players.selected.includes(player)}
                                onChange={(e) => {
                                  const selected = e.target.checked
                                    ? [...config.players.selected, player]
                                    : config.players.selected.filter((p) => p !== player)
                                  handleSelectionChange("players", selected)
                                }}
                                disabled={
                                  config.players.selectionType === "single" &&
                                  config.players.selected.length > 0 &&
                                  !config.players.selected.includes(player)
                                }
                              />
                              <label htmlFor={`player-${player}`} className="text-sm">
                                {player}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="customerFactor">
                  <AccordionTrigger className="py-4">Customer Factor Range</AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2">
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium">Min: {config.customerFactorRange.min}</label>
                          <label className="text-sm font-medium">Max: {config.customerFactorRange.max}</label>
                        </div>
                        <div className="px-2">
                          <Slider
                            value={[config.customerFactorRange.min, config.customerFactorRange.max]}
                            min={0}
                            max={100}
                            step={1}
                            onValueChange={(value) => {
                              handleNestedChange("customerFactorRange", "min", value[0])
                              handleNestedChange("customerFactorRange", "max", value[1])
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="timeRanges" className="mt-0 space-y-6">
              <div className="bg-blue-50 p-4 rounded-md mb-4">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Understanding Alert Thresholds</p>
                    <p>Each time range has two types of thresholds:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>
                        <strong>Value Threshold:</strong> The minimum value that triggers an alert (e.g., stake factor,
                        liability)
                      </li>
                      <li>
                        <strong>Frequency Threshold:</strong> The number of bets within a specific time window that
                        triggers an alert (e.g., 5 bets every 15 seconds)
                      </li>
                    </ul>
                    <p className="mt-2">
                      Different thresholds can be set for different time ranges before an event starts, allowing for
                      varying sensitivity based on how close the event is to starting.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Time to Event Start Ranges</h3>
                  <Button variant="outline" size="sm" onClick={handleAddTimeRange}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Range
                  </Button>
                </div>

                {config.timeRanges.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-md">
                    No time ranges configured. Click "Add Range" to create one.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {config.timeRanges.map((range, index) => (
                      <div key={range.id} className="border border-gray-200 rounded-md p-4 space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{range.name}</h4>
                            <Switch
                              checked={range.enabled}
                              onCheckedChange={(checked) => handleUpdateTimeRange(range.id, "enabled", checked)}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveTimeRange(range.id)}
                            className="h-8 w-8 text-gray-500 hover:text-red-600"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Range Name</label>
                            <Input
                              value={range.name}
                              onChange={(e) => handleUpdateTimeRange(range.id, "name", e.target.value)}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <label className="block text-sm font-medium">Value Threshold</label>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                                      <Info className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <p>
                                      The minimum value that triggers an alert when exceeded during this time range.
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                            <Input
                              type="number"
                              value={range.threshold}
                              onChange={(e) => handleUpdateTimeRange(range.id, "threshold", Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Start (minutes before event)</label>
                            <Input
                              type="number"
                              value={range.startMinutes}
                              onChange={(e) => handleUpdateTimeRange(range.id, "startMinutes", Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">End (minutes before event)</label>
                            <Input
                              type="number"
                              value={range.endMinutes}
                              onChange={(e) => handleUpdateTimeRange(range.id, "endMinutes", Number(e.target.value))}
                              className="w-full"
                            />
                          </div>
                        </div>

                        {/* New fields for bet frequency */}
                        <div className="border-t border-gray-200 pt-4 mt-4">
                          <h5 className="font-medium mb-3">Bet Frequency Threshold</h5>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="col-span-1">
                              <label className="block text-sm font-medium mb-1">Number of Bets</label>
                              <Input
                                type="number"
                                value={range.betCountThreshold}
                                onChange={(e) =>
                                  handleUpdateTimeRange(range.id, "betCountThreshold", Number(e.target.value))
                                }
                                className="w-full"
                                min={1}
                              />
                            </div>
                            <div className="col-span-1">
                              <label className="block text-sm font-medium mb-1">Time Window</label>
                              <Input
                                type="number"
                                value={range.timeWindowValue}
                                onChange={(e) =>
                                  handleUpdateTimeRange(range.id, "timeWindowValue", Number(e.target.value))
                                }
                                className="w-full"
                                min={1}
                              />
                            </div>
                            <div className="col-span-1">
                              <label className="block text-sm font-medium mb-1">Unit</label>
                              <Select
                                value={range.timeWindowUnit}
                                onValueChange={(value: TimeWindowUnit) =>
                                  handleUpdateTimeRange(range.id, "timeWindowUnit", value)
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="seconds">Seconds</SelectItem>
                                  <SelectItem value="minutes">Minutes</SelectItem>
                                  <SelectItem value="hours">Hours</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Alert will trigger if there are {range.betCountThreshold} or more bets within{" "}
                            {range.timeWindowValue} {range.timeWindowUnit}.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium">Default Range</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                              <Info className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              This threshold applies to all bets that don't fall within any of the defined time ranges
                              above.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Switch
                      checked={config.defaultRange.enabled}
                      onCheckedChange={(checked) => handleNestedChange("defaultRange", "enabled", checked)}
                    />
                  </div>

                  {config.defaultRange.enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Default Value Threshold</label>
                        <Input
                          type="number"
                          value={config.defaultRange.threshold}
                          onChange={(e) => handleNestedChange("defaultRange", "threshold", Number(e.target.value))}
                          className="w-full"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          This threshold will be applied to all bets that don't fall within a defined time range.
                        </p>
                      </div>

                      {/* New fields for default bet frequency */}
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <h5 className="font-medium mb-3">Default Bet Frequency Threshold</h5>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-1">
                            <label className="block text-sm font-medium mb-1">Number of Bets</label>
                            <Input
                              type="number"
                              value={config.defaultRange.betCountThreshold}
                              onChange={(e) =>
                                handleNestedChange("defaultRange", "betCountThreshold", Number(e.target.value))
                              }
                              className="w-full"
                              min={1}
                            />
                          </div>
                          <div className="col-span-1">
                            <label className="block text-sm font-medium mb-1">Time Window</label>
                            <Input
                              type="number"
                              value={config.defaultRange.timeWindowValue}
                              onChange={(e) =>
                                handleNestedChange("defaultRange", "timeWindowValue", Number(e.target.value))
                              }
                              className="w-full"
                              min={1}
                            />
                          </div>
                          <div className="col-span-1">
                            <label className="block text-sm font-medium mb-1">Unit</label>
                            <Select
                              value={config.defaultRange.timeWindowUnit}
                              onValueChange={(value: TimeWindowUnit) =>
                                handleNestedChange("defaultRange", "timeWindowUnit", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select unit" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="seconds">Seconds</SelectItem>
                                <SelectItem value="minutes">Minutes</SelectItem>
                                <SelectItem value="hours">Hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Alert will trigger if there are {config.defaultRange.betCountThreshold} or more bets within{" "}
                          {config.defaultRange.timeWindowValue} {config.defaultRange.timeWindowUnit}.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="expiration" className="mt-0 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="never-expire"
                    checked={config.expirationSettings.neverExpire}
                    onCheckedChange={(checked) => {
                      handleNestedChange("expirationSettings", "neverExpire", checked)
                      if (checked) {
                        handleNestedChange("expirationSettings", "timeToExpire", 0)
                      }
                    }}
                  />
                  <Label htmlFor="never-expire">Never Expire</Label>
                </div>

                {!config.expirationSettings.neverExpire && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Time to Expire (seconds)</label>
                    <Input
                      type="number"
                      value={config.expirationSettings.timeToExpire}
                      onChange={(e) => handleNestedChange("expirationSettings", "timeToExpire", Number(e.target.value))}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This is the time in seconds after which the alert will expire and be removed from active alerts.
                    </p>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch
                    id="drop-bets"
                    checked={config.expirationSettings.dropBetsAfterExpiration}
                    onCheckedChange={(checked) =>
                      handleNestedChange("expirationSettings", "dropBetsAfterExpiration", checked)
                    }
                  />
                  <Label htmlFor="drop-bets">Drop Bets from Aggregations After Expiration</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="expire-old-alerts"
                    checked={config.expirationSettings.expireOldAlerts}
                    onCheckedChange={(checked) => handleNestedChange("expirationSettings", "expireOldAlerts", checked)}
                  />
                  <Label htmlFor="expire-old-alerts">Expire Old Alerts</Label>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="border-t border-[#dcdddf] p-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isValid} className="bg-[#2b2c2d] hover:bg-[#1a1a1a]">
            {isEditing ? "Update Alert" : "Create Alert"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
