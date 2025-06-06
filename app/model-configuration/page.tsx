"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopNavigation from "@/components/top-navigation"

// Placeholder components for the Model Configuration sections
const AutoLineMovementConfig = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Auto Line Movement Configuration</h2>
    <div className="bg-white rounded-md shadow p-4">
      <p className="text-sm text-gray-500 mb-4">
        Configure the Auto Line Movement model settings, including thresholds, market applicability, and response
        parameters.
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Default Parameters</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Liability Threshold</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Max Movement</span>
                <span className="text-sm font-medium">15 cents</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Cooldown Period</span>
                <span className="text-sm font-medium">5 minutes</span>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">Model Performance</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Accuracy</span>
                <span className="text-sm font-medium text-green-600">92.4%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Average Response Time</span>
                <span className="text-sm font-medium">1.2 seconds</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Last Calibration</span>
                <span className="text-sm font-medium">Today, 09:15 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Market Coverage</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="border rounded p-2 text-center bg-green-50 border-green-200">
              <div className="text-xs text-green-800">NBA</div>
              <div className="text-sm font-medium">Enabled</div>
            </div>
            <div className="border rounded p-2 text-center bg-green-50 border-green-200">
              <div className="text-xs text-green-800">NFL</div>
              <div className="text-sm font-medium">Enabled</div>
            </div>
            <div className="border rounded p-2 text-center bg-yellow-50 border-yellow-200">
              <div className="text-xs text-yellow-800">MLB</div>
              <div className="text-sm font-medium">Partial</div>
            </div>
            <div className="border rounded p-2 text-center bg-gray-50 border-gray-200">
              <div className="text-xs text-gray-800">NCAAF</div>
              <div className="text-sm font-medium">Disabled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const BlenderWeightingConfig = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Blender Weighting Configuration</h2>
    <div className="bg-white rounded-md shadow p-4">
      <p className="text-sm text-gray-500 mb-4">
        Configure the weighting of different models in the blender system to optimize prediction accuracy across
        different sports and market types.
      </p>

      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">NBA Model Weights</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Statistical Model</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Market-Based Model</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Player Performance Model</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">NFL Model Weights</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Statistical Model</span>
                <span className="text-sm font-medium">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Market-Based Model</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "35%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Weather Impact Model</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-600 h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const CompetitorConfigurationConfig = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Competitor Configuration</h2>
    <div className="bg-white rounded-md shadow p-4">
      <p className="text-sm text-gray-500 mb-4">
        Configure competitor tracking settings, including which competitors to monitor, markets to track, and response
        thresholds.
      </p>

      <div className="space-y-4">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Tracked Competitors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border rounded p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Competitor A</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Priority: High</div>
              <div className="text-xs text-gray-500">Markets: All</div>
            </div>
            <div className="border rounded p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Competitor B</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Priority: Medium</div>
              <div className="text-xs text-gray-500">Markets: NBA, NFL</div>
            </div>
            <div className="border rounded p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">Competitor C</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Inactive</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Priority: Low</div>
              <div className="text-xs text-gray-500">Markets: MLB only</div>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Response Configuration</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Auto-Match Threshold</span>
              <span className="text-sm font-medium">±10 cents</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Match Delay</span>
              <span className="text-sm font-medium">30 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Notification Threshold</span>
              <span className="text-sm font-medium">±20 cents</span>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Market Exclusions</h3>
          <div className="text-sm">
            <ul className="list-disc pl-5 space-y-1">
              <li>Player Props (all sports)</li>
              <li>Live In-Play Markets</li>
              <li>Futures beyond 30 days</li>
              <li>Parlays and Teasers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function ModelConfigurationPage() {
  const [activeTab, setActiveTab] = useState("alm")

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <TopNavigation />

      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Model Configuration</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alm">Auto Line Mover</TabsTrigger>
            <TabsTrigger value="blender">Blender Weighting</TabsTrigger>
            <TabsTrigger value="competitor">Competitor Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="alm">
            <AutoLineMovementConfig />
          </TabsContent>

          <TabsContent value="blender">
            <BlenderWeightingConfig />
          </TabsContent>

          <TabsContent value="competitor">
            <CompetitorConfigurationConfig />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
