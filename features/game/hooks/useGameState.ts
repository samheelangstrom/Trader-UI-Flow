"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Game, Alert } from "../types"

export function useGameState(gameId: string) {
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [scoreboardTab, setScoreboardTab] = useState<"scoreboard" | "liabilities" | "suspension" | "alerts">(
    "scoreboard",
  )
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    moneyline: true,
    handicap: false,
    matchTotal: false,
    teamTotal: false,
    lebronJames: true,
    playerMilestones: false,
    rebounds: false,
    assists: false,
    threePointers: false,
  })
  const [expandedMarketClass, setExpandedMarketClass] = useState<string | null>(null)
  const [showAlertDetailsModal, setShowAlertDetailsModal] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [showAcceptPreview, setShowAcceptPreview] = useState(false)
  const [showSuspendConfirmation, setShowSuspendConfirmation] = useState(false)
  const [showDismissConfirmation, setShowDismissConfirmation] = useState(false)
  const [alertForAction, setAlertForAction] = useState<Alert | null>(null)
  const [activeMarketFilter, setActiveMarketFilter] = useState("all")

  // Fetch game data
  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true)
        // In a real app, this would be an API call
        // For now, we'll simulate a delay and return mock data
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock data
        const mockGame: Game = {
          id: gameId || "1",
          homeTeam: {
            id: "1",
            name: "Boston Celtics",
            abbreviation: "BOS",
            logo: "/boston-celtics-logo.png",
            score: 98,
          },
          awayTeam: {
            id: "2",
            name: "Los Angeles Lakers",
            abbreviation: "LAL",
            logo: "/los-angeles-lakers-logo.png",
            score: 102,
          },
          date: "10 Oct",
          time: "8:00 PM",
          status: "in_progress",
          period: "Q3",
          timeRemaining: "10:00",
          stats: {
            timeoutsLeft: [2, 1],
            fouls: [6, 9],
            twoPoints: [11, 11],
            threePoints: [9, 5],
            freeThrows: ["7 (100%)", "5 (55.6%)"],
            quarterScores: [
              { period: "1", scores: [27, 20] },
              { period: "2", scores: [29, 22] },
              { period: "Half", scores: [56, 42] },
              { period: "3", scores: [20, 26] },
              { period: "4", scores: [0, 0] },
              { period: "T", scores: [102, 98] },
            ],
          },
          markets: [],
          alerts: [],
        }

        setGame(mockGame)
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch game data")
        setLoading(false)
      }
    }

    fetchGame()
  }, [gameId])

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  // Toggle market class expansion
  const toggleMarketClassExpansion = (marketClass: string) => {
    if (expandedMarketClass === marketClass) {
      setExpandedMarketClass(null)
    } else {
      setExpandedMarketClass(marketClass)
    }
  }

  // Alert modal functions
  const openAlertDetailsModal = (alert: Alert) => {
    setSelectedAlert(alert)
    setShowAlertDetailsModal(true)
  }

  const closeAlertDetailsModal = () => {
    setShowAlertDetailsModal(false)
    setSelectedAlert(null)
  }

  // Action confirmation functions
  const openAcceptPreview = (alert: Alert, e: React.MouseEvent) => {
    e.stopPropagation()
    setAlertForAction(alert)
    setShowAcceptPreview(true)
  }

  const openSuspendConfirmation = (alert: Alert, e: React.MouseEvent) => {
    e.stopPropagation()
    setAlertForAction(alert)
    setShowSuspendConfirmation(true)
  }

  const openDismissConfirmation = (alert: Alert, e: React.MouseEvent) => {
    e.stopPropagation()
    setAlertForAction(alert)
    setShowDismissConfirmation(true)
  }

  const closeActionModals = () => {
    setShowAcceptPreview(false)
    setShowSuspendConfirmation(false)
    setShowDismissConfirmation(false)
    setAlertForAction(null)
  }

  // Action confirmation handlers
  const confirmAccept = () => {
    // Here you would implement the actual price change logic
    console.log(`Accepted alert ${alertForAction?.id}, changing price to recommended`)
    closeActionModals()
  }

  const confirmSuspend = () => {
    // Here you would implement the actual suspension logic
    console.log(`Suspended market for alert ${alertForAction?.id}`)
    closeActionModals()
  }

  const confirmDismiss = () => {
    // Here you would implement the actual dismissal logic
    console.log(`Dismissed alert ${alertForAction?.id}`)
    closeActionModals()
  }

  return {
    game,
    loading,
    error,
    scoreboardTab,
    setScoreboardTab,
    expandedSections,
    toggleSection,
    expandedMarketClass,
    toggleMarketClassExpansion,
    showAlertDetailsModal,
    selectedAlert,
    openAlertDetailsModal,
    closeAlertDetailsModal,
    showAcceptPreview,
    showSuspendConfirmation,
    showDismissConfirmation,
    alertForAction,
    openAcceptPreview,
    openSuspendConfirmation,
    openDismissConfirmation,
    closeActionModals,
    confirmAccept,
    confirmSuspend,
    confirmDismiss,
    activeMarketFilter,
    setActiveMarketFilter,
  }
}
