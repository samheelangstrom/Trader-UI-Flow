"use client"

/**
 * Feature Details Modal
 *
 * This component displays and allows editing of a feature item.
 */

import type React from "react"
import { useState, useEffect } from "react"
import { useFeature } from "../context/FeatureContext"
import { FeatureStatus } from "../types"
import { Modal } from "@/components/ui/modal"
import { Input, Select, Textarea } from "@/components/ui/form-elements"
import { Button } from "@/components/ui/button"

export function FeatureDetailsModal() {
  const { state, actions } = useFeature()
  const { selectedItem } = state

  // Local state for form values
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    status: FeatureStatus.INACTIVE,
    metadata: {},
  })

  // Update form values when selected item changes
  useEffect(() => {
    if (selectedItem) {
      setFormValues({
        name: selectedItem.name,
        description: selectedItem.description,
        status: selectedItem.status,
        metadata: selectedItem.metadata,
      })
    }
  }, [selectedItem])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedItem) return

    const updatedItem = {
      ...selectedItem,
      ...formValues,
      updatedAt: new Date().toISOString(),
    }

    // If it's a new item (empty ID), create it
    if (!selectedItem.id) {
      actions.createItem(updatedItem)
    } else {
      // Otherwise update existing item
      actions.updateItem(updatedItem)
    }

    // Close the modal
    actions.selectItem(null)
  }

  // Handle modal close
  const handleClose = () => {
    actions.selectItem(null)
  }

  if (!selectedItem) return null

  const isNewItem = !selectedItem.id

  return (
    <Modal title={isNewItem ? "Create New Item" : "Edit Item"} isOpen={!!selectedItem} onClose={handleClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input id="name" name="name" value={formValues.name} onChange={handleInputChange} required />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <Select id="status" name="status" value={formValues.status} onChange={handleInputChange}>
            {Object.values(FeatureStatus).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">{isNewItem ? "Create" : "Save Changes"}</Button>
        </div>
      </form>
    </Modal>
  )
}
