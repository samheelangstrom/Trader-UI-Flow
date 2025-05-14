"use client"

/**
 * Feature Context
 *
 * This file contains the React Context for the feature.
 * It provides state and actions to all components in the feature.
 */

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import { featureReducer, initialState } from "../state/reducer"
import type { FeatureState, FeatureAction, FeatureFilter, FeatureItem } from "../types"
import { useFeatureActions } from "../hooks/useFeatureActions"

// Create context with initial state
interface FeatureContextType {
  state: FeatureState
  dispatch: React.Dispatch<FeatureAction>
  actions: {
    fetchItems: () => Promise<void>
    selectItem: (item: FeatureItem | null) => void
    updateFilters: (filters: Partial<FeatureFilter>) => void
    createItem: (item: Omit<FeatureItem, "id">) => Promise<void>
    updateItem: (item: FeatureItem) => Promise<void>
    deleteItem: (id: string) => Promise<void>
  }
}

const FeatureContext = createContext<FeatureContextType | undefined>(undefined)

// Provider component
export function FeatureProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(featureReducer, initialState)
  const actions = useFeatureActions(dispatch)

  return <FeatureContext.Provider value={{ state, dispatch, actions }}>{children}</FeatureContext.Provider>
}

// Custom hook to use the feature context
export function useFeature() {
  const context = useContext(FeatureContext)
  if (context === undefined) {
    throw new Error("useFeature must be used within a FeatureProvider")
  }
  return context
}
