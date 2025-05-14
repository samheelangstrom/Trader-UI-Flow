/**
 * Feature Service
 *
 * This file contains the API service functions for the feature.
 * It handles all data fetching and manipulation with the backend.
 */

import type { FeatureItem } from "../types"

// Base API URL
const API_BASE_URL = "/api/feature"

// Fetch all feature items
export async function fetchFeatureItems(): Promise<FeatureItem[]> {
  try {
    const response = await fetch(API_BASE_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching feature items:", error)
    throw error
  }
}

// Fetch a single feature item by ID
export async function fetchFeatureItemById(id: string): Promise<FeatureItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching feature item with ID ${id}:`, error)
    throw error
  }
}

// Create a new feature item
export async function createFeatureItem(item: Omit<FeatureItem, "id">): Promise<FeatureItem> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error("Error creating feature item:", error)
    throw error
  }
}

// Update an existing feature item
export async function updateFeatureItem(item: FeatureItem): Promise<FeatureItem> {
  try {
    const response = await fetch(`${API_BASE_URL}/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Error updating feature item with ID ${item.id}:`, error)
    throw error
  }
}

// Delete a feature item
export async function deleteFeatureItem(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  } catch (error) {
    console.error(`Error deleting feature item with ID ${id}:`, error)
    throw error
  }
}
