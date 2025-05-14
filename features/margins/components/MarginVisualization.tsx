"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronDown } from "lucide-react"
import type { MarginConfiguration } from "../types"

interface MarginVisualizationProps {
  configurations: MarginConfiguration[]
  onSelectConfiguration: (configuration: MarginConfiguration) => void
}

interface MarginNode {
  config: MarginConfiguration
  children: MarginNode[]
  level: number
}

export function MarginVisualization({ configurations, onSelectConfiguration }: MarginVisualizationProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  // Build hierarchy tree
  const buildHierarchy = (): MarginNode[] => {
    const nodeMap = new Map<string, MarginNode>()
    const rootNodes: MarginNode[] = []

    // First pass: create nodes
    configurations.forEach((config) => {
      nodeMap.set(config.id, {
        config,
        children: [],
        level: 0,
      })
    })

    // Second pass: build hierarchy
    configurations.forEach((config) => {
      const node = nodeMap.get(config.id)
      if (!node) return

      if (config.isInherited && config.inheritedFrom) {
        const parentNode = nodeMap.get(config.inheritedFrom)
        if (parentNode) {
          parentNode.children.push(node)
          node.level = parentNode.level + 1
        } else {
          rootNodes.push(node)
        }
      } else {
        rootNodes.push(node)
      }
    })

    return rootNodes
  }

  const hierarchy = buildHierarchy()

  // Toggle node expansion
  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedNodes(newExpanded)
  }

  // Format margin value as percentage
  const formatMargin = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  // Render a node and its children
  const renderNode = (node: MarginNode) => {
    const { config, children, level } = node
    const hasChildren = children.length > 0
    const isExpanded = expandedNodes.has(config.id)
    const marginLeft = `${level * 20}px`

    return (
      <div key={config.id}>
        <div
          className={`flex items-center p-2 hover:bg-gray-50 cursor-pointer ${level === 0 ? "border-t" : ""}`}
          style={{ marginLeft }}
          onClick={() => onSelectConfiguration(config)}
        >
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 mr-2"
              onClick={(e) => {
                e.stopPropagation()
                toggleNode(config.id)
              }}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          )}
          {!hasChildren && <div className="w-8" />}
          <div className="flex-1">{config.name}</div>
          <div className="font-mono">{formatMargin(config.value)}</div>
        </div>
        {isExpanded && hasChildren && children.map((childNode) => renderNode(childNode))}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Margin Hierarchy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          {hierarchy.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No margin configurations found</div>
          ) : (
            hierarchy.map((node) => renderNode(node))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
