"use client"

import type React from "react"

/**
 * useFeatureActions Hook
 *
 * This hook provides actions to manipulate the feature state.
 * It handles API calls and dispatches actions to update the state.
 */

import { useCallback } from "react"
import { type FeatureAction, FeatureActionType, type FeatureItem, type FeatureFilter } from "../types"
import { fetchFeatureItems, createFeatureItem, updateFeatureItem, deleteFeatureItem } from "../services/featureService"

export function useFeatureActions(dispatch: React.Dispatch<FeatureAction>) {
  // Fetch all items
  const fetchItems = useCallback(async () => {
    dispatch({ type: FeatureActionType.FETCH_ITEMS_REQUEST })
    try {
      const items = await fetchFeatureItems()
      dispatch({
        type: FeatureActionType.FETCH_ITEMS_SUCCESS,
        payload: items,
      })
    } catch (error) {
      dispatch({
        type: FeatureActionType.FETCH_ITEMS_FAILURE,
        payload: error instanceof Error ? error.message : "An unknown error occurred",
      })
    }
  }, [dispatch])

  // Select an item
  const selectItem = useCallback(
    (item: FeatureItem | null) => {
      dispatch({
        type: FeatureActionType.SELECT_ITEM,
        payload: item,
      })
    },
    [dispatch],
  )

  // Update filters
  const updateFilters = useCallback(
    (filters: Partial<FeatureFilter>) => {
      dispatch({
        type: FeatureActionType.UPDATE_FILTERS,
        payload: filters,
      })
    },
    [dispatch],
  )

  // Create a new item
  const createItem = useCallback(
    async (item: Omit<FeatureItem, "id">) => {
      try {
        const newItem = await createFeatureItem(item)
        dispatch({
          type: FeatureActionType.CREATE_ITEM,
          payload: newItem,
        })
      } catch (error) {
        // Handle error (could dispatch an error action)
        console.error("Failed to create item:", error)
      }
    },
    [dispatch],
  )

  // Update an existing item
  const updateItem = useCallback(
    async (item: FeatureItem) => {
      try {
        const updatedItem = await updateFeatureItem(item)
        dispatch({
          type: FeatureActionType.UPDATE_ITEM,
          payload: updatedItem,
        })
      } catch (error) {
        // Handle error
        console.error("Failed to update item:", error)
      }
    },
    [dispatch],
  )

  // Delete an item
  const deleteItem = useCallback(
    async (id: string) => {
      try {
        await deleteFeatureItem(id)
        dispatch({
          type: FeatureActionType.DELETE_ITEM,
          payload: id,
        })
      } catch (error) {
        // Handle error
        console.error("Failed to delete item:", error)
      }
    },
    [dispatch],
  )

  return {
    fetchItems,
    selectItem,
    updateFilters,
    createItem,
    updateItem,
    deleteItem,
  }
}
