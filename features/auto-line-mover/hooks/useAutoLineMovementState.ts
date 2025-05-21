"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import type { AutoLineMovementRule, AutoLineMovementRuleFormValues, AutoLineMovementMode } from "../types"

export function useAutoLineMovementState(initialRules: AutoLineMovementRule[] = []) {
  const [rules, setRules] = useState<AutoLineMovementRule[]>(initialRules)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<AutoLineMovementRule | null>(null)
  const [filters, setFilters] = useState<any>({})

  const handleAddRule = () => {
    setEditingRule(null)
    setIsModalOpen(true)
  }

  const handleEditRule = (rule: AutoLineMovementRule) => {
    setEditingRule(rule)
    setIsModalOpen(true)
  }

  const handleDeleteRule = (ruleId: string) => {
    setRules(rules.filter((rule) => rule.id !== ruleId))
  }

  const handleToggleMode = (ruleId: string, mode: AutoLineMovementMode) => {
    setRules(rules.map((rule) => (rule.id === ruleId ? { ...rule, mode, updatedAt: new Date().toISOString() } : rule)))
  }

  const handleSaveRule = (formValues: AutoLineMovementRuleFormValues) => {
    const now = new Date().toISOString()

    if (editingRule) {
      // Update existing rule
      setRules(
        rules.map((rule) =>
          rule.id === editingRule.id
            ? {
                ...rule,
                ...formValues,
                updatedAt: now,
              }
            : rule,
        ),
      )
    } else {
      // Add new rule
      const newRule: AutoLineMovementRule = {
        id: uuidv4(),
        ...formValues,
        createdAt: now,
        updatedAt: now,
        createdBy: "Current User", // This would come from auth context in a real app
        priority: rules.length + 1, // New rules get lowest priority by default
      }
      setRules([...rules, newRule])
    }

    setIsModalOpen(false)
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const filteredRules = rules.filter((rule) => {
    // Apply filters here
    if (filters.sport && rule.sport !== filters.sport) return false
    if (filters.marketClass && rule.marketClass !== filters.marketClass) return false
    if (filters.mode && rule.mode !== filters.mode) return false
    return true
  })

  return {
    rules: filteredRules,
    editingRule,
    isModalOpen,
    handleAddRule,
    handleEditRule,
    handleDeleteRule,
    handleToggleMode,
    handleSaveRule,
    setIsModalOpen,
    handleFilterChange,
  }
}
