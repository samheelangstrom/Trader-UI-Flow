/**
 * Feature Module Public API
 *
 * This file exports the public API of the feature module.
 * Only export what should be accessible to other features.
 * Keep implementation details private.
 */

// Export main components
export { FeatureMainView } from "./components/FeatureMainView"
export { FeatureDetailsModal } from "./components/FeatureDetailsModal"
export { FeatureFilters } from "./components/FeatureFilters"

// Export hooks
export { useFeatureState } from "./hooks/useFeatureState"
export { useFeatureActions } from "./hooks/useFeatureActions"

// Export types
export type {
  FeatureItem,
  FeatureStatus,
  FeatureFilter,
} from "./types"

// Export context provider
export { FeatureProvider } from "./context/FeatureContext"
