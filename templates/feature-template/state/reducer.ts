/**
 * Feature Reducer
 *
 * This file contains the reducer function for the feature state.
 * It handles all state transitions based on dispatched actions.
 */

import { type FeatureState, type FeatureAction, FeatureActionType } from "../types"

// Initial state
export const initialState: FeatureState = {
  items: [],
  filteredItems: [],
  selectedItem: null,
  filters: {},
  isLoading: false,
  error: null,
}

// Helper function to apply filters
const applyFilters = (items: any[], filters: any) => {
  let result = [...items]

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    result = result.filter(
      (item) => item.name.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower),
    )
  }

  // Apply status filter
  if (filters.status && filters.status.length > 0) {
    result = result.filter((item) => filters.status.includes(item.status))
  }

  // Apply date range filter
  if (filters.dateRange) {
    const { start, end } = filters.dateRange
    result = result.filter((item) => {
      const date = new Date(item.createdAt)
      return date >= new Date(start) && date <= new Date(end)
    })
  }

  // Apply sorting
  if (filters.sortBy) {
    result.sort((a, b) => {
      if (a[filters.sortBy!] < b[filters.sortBy!]) {
        return filters.sortDirection === "asc" ? -1 : 1
      }
      if (a[filters.sortBy!] > b[filters.sortBy!]) {
        return filters.sortDirection === "asc" ? 1 : -1
      }
      return 0
    })
  }

  return result
}

// Reducer function
export function featureReducer(state: FeatureState, action: FeatureAction): FeatureState {
  switch (action.type) {
    case FeatureActionType.FETCH_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case FeatureActionType.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload,
        filteredItems: applyFilters(action.payload, state.filters),
      }

    case FeatureActionType.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    case FeatureActionType.SELECT_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      }

    case FeatureActionType.UPDATE_FILTERS:
      const updatedFilters = {
        ...state.filters,
        ...action.payload,
      }
      return {
        ...state,
        filters: updatedFilters,
        filteredItems: applyFilters(state.items, updatedFilters),
      }

    case FeatureActionType.CREATE_ITEM:
      const itemsAfterCreate = [...state.items, action.payload]
      return {
        ...state,
        items: itemsAfterCreate,
        filteredItems: applyFilters(itemsAfterCreate, state.filters),
      }

    case FeatureActionType.UPDATE_ITEM:
      const itemsAfterUpdate = state.items.map((item) => (item.id === action.payload.id ? action.payload : item))
      return {
        ...state,
        items: itemsAfterUpdate,
        filteredItems: applyFilters(itemsAfterUpdate, state.filters),
        selectedItem: state.selectedItem?.id === action.payload.id ? action.payload : state.selectedItem,
      }

    case FeatureActionType.DELETE_ITEM:
      const itemsAfterDelete = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: itemsAfterDelete,
        filteredItems: applyFilters(itemsAfterDelete, state.filters),
        selectedItem: state.selectedItem?.id === action.payload ? null : state.selectedItem,
      }

    default:
      return state
  }
}
