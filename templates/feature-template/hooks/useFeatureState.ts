/**
 * useFeatureState Hook
 *
 * This hook provides access to the feature state.
 * It's a wrapper around the useFeature context hook.
 */

import { useFeature } from "../context/FeatureContext"
import type { FeatureState } from "../types"

export function useFeatureState(): FeatureState {
  const { state } = useFeature()
  return state
}
