/**
 * Feature Types
 *
 * This file contains all the TypeScript types and interfaces
 * related to this feature.
 */

// Main data type for the feature
export interface FeatureItem {
  id: string
  name: string
  description: string
  status: FeatureStatus
  createdAt: string
  updatedAt: string
  metadata: Record<string, any>
}

// Status enum for the feature
export enum FeatureStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
  ARCHIVED = "archived",
}

// Filter type for the feature
export interface FeatureFilter {
  search?: string
  status?: FeatureStatus[]
  dateRange?: {
    start: string
    end: string
  }
  sortBy?: keyof FeatureItem
  sortDirection?: "asc" | "desc"
}

// State type for the feature
export interface FeatureState {
  items: FeatureItem[]
  filteredItems: FeatureItem[]
  selectedItem: FeatureItem | null
  filters: FeatureFilter
  isLoading: boolean
  error: string | null
}

// Action types for the feature
export enum FeatureActionType {
  FETCH_ITEMS_REQUEST = "FETCH_ITEMS_REQUEST",
  FETCH_ITEMS_SUCCESS = "FETCH_ITEMS_SUCCESS",
  FETCH_ITEMS_FAILURE = "FETCH_ITEMS_FAILURE",
  SELECT_ITEM = "SELECT_ITEM",
  UPDATE_FILTERS = "UPDATE_FILTERS",
  CREATE_ITEM = "CREATE_ITEM",
  UPDATE_ITEM = "UPDATE_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
}

// Action interfaces
export type FeatureAction =
  | { type: FeatureActionType.FETCH_ITEMS_REQUEST }
  | { type: FeatureActionType.FETCH_ITEMS_SUCCESS; payload: FeatureItem[] }
  | { type: FeatureActionType.FETCH_ITEMS_FAILURE; payload: string }
  | { type: FeatureActionType.SELECT_ITEM; payload: FeatureItem | null }
  | { type: FeatureActionType.UPDATE_FILTERS; payload: Partial<FeatureFilter> }
  | { type: FeatureActionType.CREATE_ITEM; payload: FeatureItem }
  | { type: FeatureActionType.UPDATE_ITEM; payload: FeatureItem }
  | { type: FeatureActionType.DELETE_ITEM; payload: string }
