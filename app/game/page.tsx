"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Search,
  User,
  MoreHorizontal,
  X,
  CheckCircle2,
  Circle,
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from "@/components/sidebar"
import TopNavigation from "@/components/top-navigation"

export default function GamePage() {
  const [carouselView, setCarouselView] = useState("stats")
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [pinnedFixtures, setPinnedFixtures] = useState([{ id: 1, homeTeam: "LAL", awayTeam: "BOS", status: "In Play" }])
  const [scoreboardTab, setScoreboardTab] = useState("scoreboard")
  const [activeMarketFilter, setActiveMarketFilter] = useState("all")
  const [expandedSections, setExpandedSections] = useState({
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

  const [expandedMarketClass, setExpandedMarketClass] = useState(null)

  // Add a new state for the alert details modal
  const [showAlertDetailsModal, setShowAlertDetailsModal] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)

  // Add states for action confirmation modals
  const [showAcceptPreview, setShowAcceptPreview] = useState(false)
  const [showSuspendConfirmation, setShowSuspendConfirmation] = useState(false)
  const [showDismissConfirmation, setShowDismissConfirmation] = useState(false)
  const [alertForAction, setAlertForAction] = useState(null)

  // Add a function to handle opening the alert details modal
  const openAlertDetailsModal = (alert) => {
    setSelectedAlert(alert)
    setShowAlertDetailsModal(true)
  }

  // Add a function to handle closing the alert details modal
  const closeAlertDetailsModal = () => {
    setShowAlertDetailsModal(false)
    setSelectedAlert(null)
  }

  // Functions to handle action confirmations
  const openAcceptPreview = (alert, e) => {
    e.stopPropagation()
    setAlertForAction(alert)
    setShowAcceptPreview(true)
  }

  const openSuspendConfirmation = (alert, e) => {
    e.stopPropagation()
    setAlertForAction(alert)
    setShowSuspendConfirmation(true)
  }

  const openDismissConfirmation = (alert, e) => {
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

  // Functions to handle actual actions
  const confirmAccept = () => {
    // Here you would implement the actual price change logic
    console.log(`Accepted alert ${alertForAction.id}, changing price to recommended`)
    closeActionModals()
  }

  const confirmSuspend = () => {
    // Here you would implement the actual suspension logic
    console.log(`Suspended market for alert ${alertForAction.id}`)
    closeActionModals()
  }

  const confirmDismiss = () => {
    // Here you would implement the actual dismissal logic
    console.log(`Dismissed alert ${alertForAction.id}`)
    closeActionModals()
  }

  // Sample alerts data
  const alerts = [
    {
      id: 1,
      market: "LeBron James Points",
      homeTeam: "BOS",
      awayTeam: "BKN",
      date: "10 Oct",
      badge: "ALM",
      time: "9m",
      taken: "1.222",
      current: "1.222",
      marketAv: "1.333",
      comp: "1.444",
      recommendation: "Adjust price to 1.35",
      severity: "high",
      details: {
        marketId: "LBJ-PTS-O25.5",
        timestamp: "2023-10-10T15:45:00Z",
        triggerReason: "Price deviation from market average",
        liability: "$30,202.11",
        stakeFactor: "1.2x",
        riskLevel: "Medium",
        previousAlerts: 2,
      },
    },
    {
      id: 2,
      market: "LeBron James Points",
      homeTeam: "BOS",
      awayTeam: "BKN",
      date: "10 Oct",
      badge: "ALM",
      time: "9m",
      taken: "1.222",
      current: "1.222",
      marketAv: "1.333",
      comp: "1.444",
      recommendation: "No action required",
      severity: "low",
      details: {
        marketId: "LBJ-PTS-U25.5",
        timestamp: "2023-10-10T15:44:00Z",
        triggerReason: "Competitor price change",
        liability: "$15,780.50",
        stakeFactor: "0.8x",
        riskLevel: "Low",
        previousAlerts: 1,
      },
    },
    {
      id: 3,
      market: "LeBron James Points",
      homeTeam: "BOS",
      awayTeam: "BKN",
      date: "10 Oct",
      badge: "ALM",
      time: "9m",
      taken: "1.222",
      current: "1.222",
      marketAv: "1.333",
      comp: "1.444",
      recommendation: "Suspend market",
      severity: "high",
      details: {
        marketId: "LBJ-PTS-O30.5",
        timestamp: "2023-10-10T15:43:00Z",
        triggerReason: "High liability threshold exceeded",
        liability: "$42,150.75",
        stakeFactor: "1.8x",
        riskLevel: "High",
        previousAlerts: 3,
      },
    },
    {
      id: 4,
      market: "LeBron James Points",
      homeTeam: "BOS",
      awayTeam: "BKN",
      date: "10 Oct",
      badge: "ALM",
      time: "9m",
      taken: "1.222",
      current: "1.222",
      marketAv: "1.333",
      comp: "1.444",
      recommendation: "Adjust price to 1.40",
      severity: "medium",
      details: {
        marketId: "LBJ-PTS-U30.5",
        timestamp: "2023-10-10T15:42:00Z",
        triggerReason: "Price deviation from simulation",
        liability: "$18,920.30",
        stakeFactor: "1.1x",
        riskLevel: "Medium",
        previousAlerts: 0,
      },
    },
  ]

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const toggleMarketClassExpansion = (marketClass) => {
    if (expandedMarketClass === marketClass) {
      setExpandedMarketClass(null)
    } else {
      setExpandedMarketClass(marketClass)
    }
  }

  const addFixture = (fixture) => {
    setPinnedFixtures([...pinnedFixtures, fixture])
  }

  const removeFixture = (id) => {
    setPinnedFixtures(pinnedFixtures.filter((fixture) => fixture.id !== id))
  }

  // Toggle between stats and alerts views
  const toggleCarouselView = (view) => {
    setCarouselView(view)
  }

  // Add carousel styles to document head
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
    .alert-scroller {
      max-height: 400px;
      overflow-y: auto;
      scrollbar-width: thin;
    }
    
    .alert-scroller::-webkit-scrollbar {
      width: 6px;
    }
    
    .alert-scroller::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    .alert-scroller::-webkit-scrollbar-thumb {
      background: #dcdddf;
      border-radius: 3px;
    }
    
    .alert-scroller::-webkit-scrollbar-thumb:hover {
      background: #c1c2c5;
    }
  `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  // Helper function to extract recommended price from recommendation string
  const extractRecommendedPrice = (recommendation) => {
    const match = recommendation.match(/\d+\.\d+/)
    return match ? match[0] : null
  }

  return (
    <div className="bg-[#fafafa] min-h-screen text-[#2b2c2d] flex">
      {/* Sidebar */}
      <Sidebar pinnedFixtures={pinnedFixtures} addFixture={addFixture} removeFixture={removeFixture} />

      <div className="flex-1">
        {/* Top Navigation */}
        <TopNavigation />

        <div className="max-w-7xl mx-auto p-4">
          {/* Back Button */}
          <Link href="/" className="flex items-center gap-2 mb-4 text-[#5f6368] hover:text-[#2b2c2d]">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to fixtures</span>
          </Link>

          {/* Fixture Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold">Los Angeles Lakers @ Boston Celtics</h1>
              <div className="px-4 py-1 bg-[#62c11e] text-white rounded-full text-sm font-medium">Open</div>
            </div>
            <div className="text-[#5f6368] text-sm">NBA • 10 Oct</div>
          </div>

          {/* Header Tabs */}
          <Tabs defaultValue="price-ops" className="mb-6">
            <TabsList className="bg-transparent border-b border-[#dcdddf] w-full justify-start gap-4 p-0 h-auto">
              <TabsTrigger
                value="price-ops"
                className="px-0 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#eb6a2e] data-[state=active]:text-[#eb6a2e] data-[state=active]:shadow-none bg-transparent h-auto"
              >
                Price Ops
              </TabsTrigger>
              <TabsTrigger
                value="settlement"
                className="px-0 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#eb6a2e] data-[state=active]:text-[#eb6a2e] data-[state=active]:shadow-none bg-transparent h-auto"
              >
                Settlement
              </TabsTrigger>
              <TabsTrigger
                value="stats-adjust"
                className="px-0 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#eb6a2e] data-[state=active]:text-[#eb6a2e] data-[state=active]:shadow-none bg-transparent h-auto"
              >
                Stats Adjust
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* This Fixture */}
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center">
              <h2 className="font-medium mr-2">This Fixture</h2>
              <span className="text-xs text-[#5f6368]">ID:78910</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#5f6368]">
              <span>Go to Next Mkt:</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          {/* Scoreboard Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-md bg-[#f1f2f3] p-1">
              <button
                className={`px-4 py-2 text-sm rounded-md ${
                  scoreboardTab === "scoreboard"
                    ? "bg-white text-[#eb6a2e] shadow-sm"
                    : "text-[#5f6368] hover:text-[#2b2c2d]"
                }`}
                onClick={() => setScoreboardTab("scoreboard")}
              >
                Scoreboard
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-md ${
                  scoreboardTab === "liabilities"
                    ? "bg-white text-[#eb6a2e] shadow-sm"
                    : "text-[#5f6368] hover:text-[#2b2c2d]"
                }`}
                onClick={() => setScoreboardTab("liabilities")}
              >
                Liabilities and Stake Factor
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-md ${
                  scoreboardTab === "suspension"
                    ? "bg-white text-[#eb6a2e] shadow-sm"
                    : "text-[#5f6368] hover:text-[#2b2c2d]"
                }`}
                onClick={() => setScoreboardTab("suspension")}
              >
                Suspension View
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-md ${
                  scoreboardTab === "alerts"
                    ? "bg-white text-[#eb6a2e] shadow-sm"
                    : "text-[#5f6368] hover:text-[#2b2c2d]"
                }`}
                onClick={() => setScoreboardTab("alerts")}
              >
                Alerts
              </button>
            </div>
          </div>

          {/* Team Logos and Score - Only show when scoreboard tab is active */}
          {scoreboardTab === "scoreboard" && (
            <>
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col items-center">
                  <img src="/los-angeles-lakers-logo.png" alt="Lakers" width={100} height={100} />
                </div>
                <div className="text-4xl font-bold">102 - 98</div>
                <div className="flex flex-col items-center">
                  <img src="/boston-celtics-logo.png" alt="Celtics" width={100} height={100} />
                </div>
              </div>

              {/* Team Names and Game Status */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-2xl font-bold text-[#eb6a2e]">Lakers</div>
                <div className="text-xl text-[#5f6368]">Q3 - 10:00</div>
                <div className="text-2xl font-bold">Celtics</div>
              </div>

              {/* Scoreboard Content */}
              <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden mb-6">
                {/* Team Stats */}
                <div className="grid grid-cols-3 border-b border-[#dcdddf]">
                  <div className="text-center py-3">2</div>
                  <div className="text-center py-3 font-medium">Timeouts Left</div>
                  <div className="text-center py-3">1</div>
                </div>
                <div className="grid grid-cols-3 border-b border-[#dcdddf]">
                  <div className="text-center py-3">6</div>
                  <div className="text-center py-3 font-medium">Fouls</div>
                  <div className="text-center py-3">9</div>
                </div>
                <div className="grid grid-cols-3 border-b border-[#dcdddf]">
                  <div className="text-center py-3">11</div>
                  <div className="text-center py-3 font-medium">2 Points</div>
                  <div className="text-center py-3">11</div>
                </div>
                <div className="grid grid-cols-3 border-b border-[#dcdddf]">
                  <div className="text-center py-3">9</div>
                  <div className="text-center py-3 font-medium">3 Points</div>
                  <div className="text-center py-3">5</div>
                </div>
                <div className="grid grid-cols-3 border-b border-[#dcdddf]">
                  <div className="text-center py-3">7 (100%)</div>
                  <div className="text-center py-3 font-medium">Free Throws</div>
                  <div className="text-center py-3">5 (55.6%)</div>
                </div>

                {/* Quarter Scores */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                        <th className="py-3 px-4 text-left font-medium"></th>
                        <th className="py-3 px-4 text-center font-medium">1</th>
                        <th className="py-3 px-4 text-center font-medium">2</th>
                        <th className="py-3 px-4 text-center font-medium">Half</th>
                        <th className="py-3 px-4 text-center font-medium">3</th>
                        <th className="py-3 px-4 text-center font-medium">4</th>
                        <th className="py-3 px-4 text-center font-medium">T</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-3 px-4 text-left text-[#eb6a2e] font-medium flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#eb6a2e] mr-2"></span>
                          Lakers
                        </td>
                        <td className="py-3 px-4 text-center">27</td>
                        <td className="py-3 px-4 text-center">29</td>
                        <td className="py-3 px-4 text-center text-[#eb6a2e] font-medium">56</td>
                        <td className="py-3 px-4 text-center">20</td>
                        <td className="py-3 px-4 text-center">-</td>
                        <td className="py-3 px-4 text-center text-[#eb6a2e] font-medium">102</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-left">Celtics</td>
                        <td className="py-3 px-4 text-center">20</td>
                        <td className="py-3 px-4 text-center">22</td>
                        <td className="py-3 px-4 text-center">42</td>
                        <td className="py-3 px-4 text-center">26</td>
                        <td className="py-3 px-4 text-center">-</td>
                        <td className="py-3 px-4 text-center">98</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Liabilities and Stake Factor Content */}
          {scoreboardTab === "liabilities" && (
            <div className="bg-white border border-[#dcdddf] rounded-md p-4 mb-6">
              <h3 className="text-lg font-medium mb-4">Liabilities and Stake Factor</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-[#dcdddf] rounded-md p-4">
                  <h4 className="font-medium mb-2">Market Liabilities</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Moneyline</span>
                      <span>$12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spread</span>
                      <span>$8,320</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Points</span>
                      <span>$15,780</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Player Props</span>
                      <span>$6,240</span>
                    </div>
                  </div>
                </div>

                <div className="border border-[#dcdddf] rounded-md p-4">
                  <h4 className="font-medium mb-2">Stake Factors</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Lakers Win</span>
                      <span className="text-[#eb6a2e]">1.2x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Celtics Win</span>
                      <span>0.8x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Over 200.5</span>
                      <span className="text-[#eb6a2e]">1.5x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Under 200.5</span>
                      <span>0.7x</span>
                    </div>
                  </div>
                </div>

                <div className="border border-[#dcdddf] rounded-md p-4 col-span-2">
                  <h4 className="font-medium mb-2">Risk Assessment</h4>
                  <div className="flex items-center mb-2">
                    <div className="w-full bg-[#f1f2f3] rounded-full h-2.5">
                      <div className="bg-[#eb6a2e] h-2.5 rounded-full w-[65%]"></div>
                    </div>
                    <span className="ml-2">65%</span>
                  </div>
                  <p className="text-sm text-[#5f6368]">
                    Current risk level is moderate. Consider adjusting Lakers moneyline odds.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Suspension View Content */}
          {scoreboardTab === "suspension" && (
            <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden mb-6">
              <div className="p-4 border-b border-[#dcdddf]">
                <h3 className="text-lg font-medium mb-2">Market Suspension Status</h3>
                <p className="text-sm text-[#5f6368] mb-4">
                  Overview of market suspension status from market class to selection level.
                </p>

                {/* Legend */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#62c11e] rounded"></div>
                    <span className="text-xs">Open</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#FFC107] rounded"></div>
                    <span className="text-xs">Partially Suspended</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-[#F44336] rounded"></div>
                    <span className="text-xs">Fully Suspended</span>
                  </div>
                </div>

                {/* Market Class Level */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Market Class</h4>
                  <div className="flex gap-2 flex-wrap">
                    <div
                      className="flex-1 min-w-[120px] p-2 bg-[#62c11e] bg-opacity-20 border border-[#62c11e] rounded text-center cursor-pointer hover:bg-opacity-30"
                      onClick={() => toggleMarketClassExpansion("fixture")}
                    >
                      <div className="text-xs font-medium">Fixture</div>
                      <div className="text-xs text-[#5f6368]">100% Open</div>
                    </div>
                    <div
                      className="flex-1 min-w-[120px] p-2 bg-[#FFC107] bg-opacity-20 border border-[#FFC107] rounded text-center cursor-pointer hover:bg-opacity-30"
                      onClick={() => toggleMarketClassExpansion("player")}
                    >
                      <div className="text-xs font-medium">Player Market</div>
                      <div className="text-xs text-[#5f6368]">75% Open</div>
                    </div>
                    <div
                      className="flex-1 min-w-[120px] p-2 bg-[#F44336] bg-opacity-20 border border-[#F44336] rounded text-center cursor-pointer hover:bg-opacity-30"
                      onClick={() => toggleMarketClassExpansion("matchup")}
                    >
                      <div className="text-xs font-medium">Player Matchup</div>
                      <div className="text-xs text-[#5f6368]">0% Open</div>
                    </div>
                    <div
                      className="flex-1 min-w-[120px] p-2 bg-[#62c11e] bg-opacity-20 border border-[#62c11e] rounded text-center cursor-pointer hover:bg-opacity-30"
                      onClick={() => toggleMarketClassExpansion("milestone")}
                    >
                      <div className="text-xs font-medium">Player Milestone</div>
                      <div className="text-xs text-[#5f6368]">100% Open</div>
                    </div>
                    <div
                      className="flex-1 min-w-[120px] p-2 bg-[#FFC107] bg-opacity-20 border border-[#FFC107] rounded text-center cursor-pointer hover:bg-opacity-30"
                      onClick={() => toggleMarketClassExpansion("firstlast")}
                    >
                      <div className="text-xs font-medium">First Last Next</div>
                      <div className="text-xs text-[#5f6368]">50% Open</div>
                    </div>
                  </div>

                  {/* Heat Map for all market classes */}
                  {expandedMarketClass && (
                    <div className="mt-4 border border-[#dcdddf] rounded-md overflow-hidden">
                      <div className="p-2 bg-[#2b2c2d] text-white text-sm font-medium flex justify-between items-center">
                        <span>
                          {expandedMarketClass === "fixture"
                            ? "Fixture Markets"
                            : expandedMarketClass === "player"
                              ? "Player Markets"
                              : expandedMarketClass === "matchup"
                                ? "Player Matchup Markets"
                                : expandedMarketClass === "milestone"
                                  ? "Player Milestone Markets"
                                  : "First Last Next Markets"}
                        </span>
                        <button onClick={() => setExpandedMarketClass(null)} className="text-white hover:text-gray-300">
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Legend */}
                      <div className="flex items-center gap-4 p-2 bg-[#1a1a1a] text-white text-xs">
                        <div className="flex items-center gap-1">
                          <div className="flex items-center justify-center bg-[#F44336] text-white p-1 rounded">
                            <code className="text-xs">&lt;/&gt;</code>
                          </div>
                          <span>Automatic suspension</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center justify-center bg-[#F44336] text-white p-1 rounded">
                            <User className="h-3 w-3" />
                          </div>
                          <span>Manual suspension</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center justify-center bg-[#62c11e] text-white p-1 rounded">
                            <CheckCircle2 className="h-3 w-3" />
                          </div>
                          <span>Temporary override</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center justify-center bg-[#62c11e] text-white p-1 rounded">
                            <Circle className="h-3 w-3" />
                          </div>
                          <span>Permanent override</span>
                        </div>
                      </div>

                      {/* Heat Map Grid */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-[#2b2c2d] text-white">
                              <th className="p-2 text-left w-16"></th>
                              <th className="p-2 text-center w-16">MM</th>
                              <th className="p-2 text-center w-16">1H</th>
                              <th className="p-2 text-center w-16">1Q</th>
                              <th className="p-2 text-center w-16">2Q</th>
                              <th className="p-2 text-center w-16">3Q</th>
                              <th className="p-2 text-center w-16">4Q</th>
                            </tr>
                          </thead>
                          <tbody>
                            {expandedMarketClass === "fixture" ? (
                              // Fixture Markets Heat Map Content
                              <>
                                <tr className="border-b border-[#444]">
                                  <td className="p-2 bg-[#333] text-white">M</td>
                                  <td className="p-2 bg-[#62c11e]"></td>
                                  <td className="p-2 bg-[#333]"></td>
                                  <td className="p-2 bg-[#333]"></td>
                                  <td className="p-2 bg-[#333]"></td>
                                  <td className="p-2 bg-[#333]"></td>
                                  <td className="p-2 bg-[#333]"></td>
                                </tr>
                                <tr className="border-b border-[#444]">
                                  <td className="p-2 bg-[#333] text-white">S</td>
                                  <td className="p-2 bg-[#333]"></td>
                                  <td className="p-2 bg-[#62c11e]"></td>
                                  <td className="p-2 bg-[#333]"></td>
                                  <td className="p-2 bg-[#333]"></td>
                                  <td className="p-2 bg-[#333]"></td>
                                  <td className="p-2 bg-[#62c11e]"></td>
                                </tr>
                                {/* More rows for fixture markets */}
                              </>
                            ) : expandedMarketClass === "player" ? (
                              // Player Markets Heat Map Content
                              <>
                                <thead>
                                  <tr className="bg-[#2b2c2d] text-white">
                                    <th className="p-2 text-left">Stat Type</th>
                                    <th className="p-2 text-center">Over</th>
                                    <th className="p-2 text-center">Under</th>
                                    <th className="p-2 text-center">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-[#444]">
                                    <td className="p-2 bg-[#333] text-white">Points (O/U 25.5)</td>
                                    <td className="p-2 bg-[#F44336] flex items-center justify-center">
                                      <User className="h-4 w-4 text-white" />
                                    </td>
                                    <td className="p-2 bg-[#F44336] flex items-center justify-center">
                                      <code className="text-white">&lt;/&gt;</code>
                                    </td>
                                    <td className="p-2 text-white text-center">Suspended</td>
                                  </tr>
                                  {/* More rows for player markets */}
                                </tbody>
                              </>
                            ) : (
                              // Other market types would be implemented similarly
                              <tr>
                                <td colSpan={7} className="p-4 text-center text-white">
                                  Heat map data for {expandedMarketClass} markets
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Market Abbreviations Legend */}
                      <div className="p-2 bg-[#f1f2f3] text-xs">
                        <div className="grid grid-cols-3 gap-2">
                          {expandedMarketClass === "fixture" ? (
                            // Fixture Markets Abbreviations
                            <>
                              <div>
                                <strong>M:</strong> Moneyline
                              </div>
                              <div>
                                <strong>S:</strong> Spread
                              </div>
                              <div>
                                <strong>T:</strong> Total
                              </div>
                              {/* More abbreviations */}
                            </>
                          ) : expandedMarketClass === "player" ? (
                            // Player Markets Abbreviations
                            <>
                              <div>
                                <strong>PTS:</strong> Points
                              </div>
                              <div>
                                <strong>REB:</strong> Rebounds
                              </div>
                              <div>
                                <strong>AST:</strong> Assists
                              </div>
                              {/* More abbreviations */}
                            </>
                          ) : (
                            // Other market types abbreviations
                            <div>Abbreviations for {expandedMarketClass} markets</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Market Type Level */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Market Type: Player Props</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="p-2 bg-[#F44336] bg-opacity-20 border border-[#F44336] rounded">
                      <div className="text-xs font-medium">LeBron James Points</div>
                      <div className="text-xs text-[#5f6368]">Suspended</div>
                    </div>
                    <div className="p-2 bg-[#F44336] bg-opacity-20 border border-[#F44336] rounded">
                      <div className="text-xs font-medium">LeBron James Rebounds</div>
                      <div className="text-xs text-[#5f6368]">Suspended</div>
                    </div>
                    <div className="p-2 bg-[#F44336] bg-opacity-20 border border-[#F44336] rounded">
                      <div className="text-xs font-medium">LeBron James Assists</div>
                      <div className="text-xs text-[#5f6368]">Suspended</div>
                    </div>
                    <div className="p-2 bg-[#F44336] bg-opacity-20 border border-[#F44336] rounded">
                      <div className="text-xs font-medium">Anthony Davis Points</div>
                      <div className="text-xs text-[#5f6368]">Suspended</div>
                    </div>
                  </div>
                </div>

                {/* Market Level */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Market: Handicap</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#f1f2f3]">
                          <th className="p-2 text-left font-medium text-xs">Market</th>
                          <th className="p-2 text-left font-medium text-xs">Status</th>
                          <th className="p-2 text-left font-medium text-xs">Selections Open</th>
                          <th className="p-2 text-left font-medium text-xs">Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#dcdddf]">
                          <td className="p-2 text-xs">Handicap (-5.5)</td>
                          <td className="p-2">
                            <span className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">Open</span>
                          </td>
                          <td className="p-2 text-xs">2/2</td>
                          <td className="p-2 text-xs">10:15 AM</td>
                        </tr>
                        <tr className="border-b border-[#dcdddf]">
                          <td className="p-2 text-xs">Handicap (-4.5)</td>
                          <td className="p-2">
                            <span className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">Open</span>
                          </td>
                          <td className="p-2 text-xs">2/2</td>
                          <td className="p-2 text-xs">10:15 AM</td>
                        </tr>
                        <tr className="border-b border-[#dcdddf]">
                          <td className="p-2 text-xs">Handicap (-3.5)</td>
                          <td className="p-2">
                            <span className="px-2 py-0.5 bg-[#FFC107] text-white rounded-full text-xs">Partial</span>
                          </td>
                          <td className="p-2 text-xs">1/2</td>
                          <td className="p-2 text-xs">10:10 AM</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-xs">Handicap (-2.5)</td>
                          <td className="p-2">
                            <span className="px-2 py-0.5 bg-[#F44336] text-white rounded-full text-xs">Suspended</span>
                          </td>
                          <td className="p-2 text-xs">0/2</td>
                          <td className="p-2 text-xs">10:05 AM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Selection Level */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Selections: Handicap (-3.5)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-[#62c11e] bg-opacity-20 border border-[#62c11e] rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs font-medium">Lakers -3.5</div>
                          <div className="text-xs text-[#5f6368]">1.95</div>
                        </div>
                        <div className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">Open</div>
                      </div>
                    </div>
                    <div className="p-3 bg-[#F44336] bg-opacity-20 border border-[#F44336] rounded">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs font-medium">Celtics +3.5</div>
                          <div className="text-xs text-[#5f6368]">1.85</div>
                        </div>
                        <div className="px-2 py-0.5 bg-[#F44336] text-white rounded-full text-xs">Suspended</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Alert Information - Only show when alerts tab is active */}
          {scoreboardTab === "alerts" && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">This Fixture</span>
                  <a href="#" className="text-sm text-[#5f6368] hover:text-[#2b2c2d] underline">
                    All Alerts
                  </a>
                </div>
                <a href="/alerts" className="text-sm text-[#5f6368] hover:text-[#2b2c2d] flex items-center">
                  Go to Alert Hub <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>

              <div className="bg-white border border-[#dcdddf] rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                      <th className="py-3 px-4 text-left font-medium">Alert Information</th>
                      <th className="py-3 px-4 text-left font-medium">Taken</th>
                      <th className="py-3 px-4 text-left font-medium">Current</th>
                      <th className="py-3 px-4 text-left font-medium">Market Av.</th>
                      <th className="py-3 px-4 text-left font-medium">Comp.</th>
                      <th className="py-3 px-4 text-left font-medium">Recommendation</th>
                      <th className="py-3 px-4 text-center font-medium">Actions</th>
                      <th className="py-3 px-4 text-center font-medium">Details</th>
                    </tr>
                  </thead>
                </table>

                {/* Scrollable alerts container */}
                <div className="alert-scroller">
                  <table className="w-full text-sm">
                    <tbody>
                      {alerts.map((alert) => (
                        <tr key={alert.id} className="border-b border-[#dcdddf] hover:bg-[#f9f9f9]">
                          <td className="py-3 px-4">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                {alert.severity === "high" ? (
                                  <div className="w-6 h-6 flex items-center justify-center bg-red-100 rounded-full">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12 9v4M12 17h.01"
                                        stroke="#EF4444"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M10.24 3.95L2.51 17.72c-.7 1.21-.11 2.75 1.3 2.75h16.38c1.41 0 2-1.54 1.3-2.75L13.76 3.95c-.71-1.21-2.83-1.21-3.52 0z"
                                        stroke="#EF4444"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="#FECACA"
                                      />
                                    </svg>
                                  </div>
                                ) : alert.severity === "medium" ? (
                                  <div className="w-6 h-6 flex items-center justify-center bg-orange-100 rounded-full">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12 9v4M12 17h.01"
                                        stroke="#F97316"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M10.24 3.95L2.51 17.72c-.7 1.21-.11 2.75 1.3 2.75h16.38c1.41 0 2-1.54 1.3-2.75L13.76 3.95c-.71-1.21-2.83-1.21-3.52 0z"
                                        stroke="#F97316"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="#FFEDD5"
                                      />
                                    </svg>
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 flex items-center justify-center bg-blue-100 rounded-full">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M12 9v4M12 17h.01"
                                        stroke="#3B82F6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M10.24 3.95L2.51 17.72c-.7 1.21-.11 2.75 1.3 2.75h16.38c1.41 0 2-1.54 1.3-2.75L13.76 3.95c-.71-1.21-2.83-1.21-3.52 0z"
                                        stroke="#3B82F6"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        fill="#DBEAFE"
                                      />
                                    </svg>
                                  </div>
                                )}
                                <div className="font-medium">{alert.market}</div>
                              </div>
                              <div className="flex items-center gap-2 ml-8">
                                <span className="inline-flex items-center">
                                  {alert.homeTeam === "BOS" ||
                                  alert.awayTeam === "BOS" ||
                                  alert.homeTeam === "LAL" ||
                                  alert.awayTeam === "LAL" ||
                                  alert.homeTeam === "BKN" ||
                                  alert.awayTeam === "BKN" ? (
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="mr-1"
                                    >
                                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                      <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                                        stroke="currentColor"
                                        strokeWidth="0"
                                        fill="none"
                                      />
                                      <path
                                        d="M4.93 4.93c-1.41 1.41-2.4 3.16-2.82 5.07h5.1c.18-1.11.53-2.16 1.04-3.09l-3.32-1.98z"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        fill="none"
                                      />
                                      <path
                                        d="M19.07 4.93l-3.32 1.98c.51.93.86 1.98 1.04 3.09h5.1c-.42-1.91-1.41-3.66-2.82-5.07z"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        fill="none"
                                      />
                                      <path
                                        d="M4.93 19.07c1.41 1.41 3.16 2.4 5.07 2.82v-5.1c-1.11-.18-2.16-.53-3.09-1.04l-1.98 3.32z"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        fill="none"
                                      />
                                      <path
                                        d="M19.07 19.07l-1.98-3.32c-.93.51-1.98.86-3.09 1.04v5.1c1.91-.42 3.66-1.41 5.07-2.82z"
                                        stroke="currentColor"
                                        strokeWidth="0.5"
                                        fill="none"
                                      />
                                      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" fill="currentColor" />
                                    </svg>
                                  ) : (
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="mr-1"
                                    >
                                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                  )}
                                  {alert.homeTeam} v {alert.awayTeam}
                                </span>
                                <span className="text-[#5f6368]">10 Oct</span>
                                <span className="px-2 py-0.5 bg-[#FFC107] text-white rounded-full text-xs">
                                  {alert.badge}
                                </span>
                                <span className="text-[#5f6368]">{alert.time}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{alert.taken}</td>
                          <td className="py-3 px-4">{alert.current}</td>
                          <td className="py-3 px-4">{alert.marketAv}</td>
                          <td className="py-3 px-4">{alert.comp}</td>
                          <td className="py-3 px-4">{alert.recommendation}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1">
                              <button
                                className="px-2 py-1 bg-[#62c11e] text-white text-xs rounded"
                                onClick={(e) => openAcceptPreview(alert, e)}
                              >
                                Accept
                              </button>
                              <button
                                className="px-2 py-1 bg-[#FFC107] text-white text-xs rounded"
                                onClick={(e) => openSuspendConfirmation(alert, e)}
                              >
                                Suspend
                              </button>
                              <button
                                className="px-2 py-1 bg-[#F44336] text-white text-xs rounded"
                                onClick={(e) => openDismissConfirmation(alert, e)}
                              >
                                Dismiss
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button className="text-[#5f6368]" onClick={() => openAlertDetailsModal(alert)}>
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Active Markets */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Active Markets</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4 text-sm">
              <div className="flex items-center gap-1">
                <span
                  className={`px-2 py-1 rounded ${activeMarketFilter === "all" ? "bg-[#2b2c2d] text-white" : "border border-[#dcdddf]"}`}
                  onClick={() => setActiveMarketFilter("all")}
                >
                  All Markets
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`px-2 py-1 rounded ${activeMarketFilter === "fixture" ? "bg-[#2b2c2d] text-white" : "border border-[#dcdddf]"}`}
                  onClick={() => setActiveMarketFilter("fixture")}
                >
                  Fixture Markets
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`px-2 py-1 rounded ${activeMarketFilter === "player" ? "bg-[#2b2c2d] text-white" : "border border-[#dcdddf]"}`}
                  onClick={() => setActiveMarketFilter("player")}
                >
                  Player Matchup Handicap
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`px-2 py-1 rounded ${activeMarketFilter === "combined" ? "bg-[#2b2c2d] text-white" : "border border-[#dcdddf]"}`}
                  onClick={() => setActiveMarketFilter("combined")}
                >
                  Player Combined
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`px-2 py-1 rounded ${activeMarketFilter === "most" ? "bg-[#2b2c2d] text-white" : "border border-[#dcdddf]"}`}
                  onClick={() => setActiveMarketFilter("most")}
                >
                  Player Most
                </span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs">Adjusted Only</span>
                <div className="w-8 h-4 bg-[#dcdddf] rounded-full relative">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full border border-[#dcdddf]"></div>
                </div>
                <span className="text-xs">Suspended Only</span>
                <div className="w-8 h-4 bg-[#dcdddf] rounded-full relative">
                  <div className="absolute left-0 top-0 w-4 h-4 bg-white rounded-full border border-[#dcdddf]"></div>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#5f6368]" />
                  <input
                    type="text"
                    placeholder="Search Markets"
                    className="pl-8 pr-2 py-1 border border-[#dcdddf] rounded text-xs w-40"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fixture Markets */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">Fixture Markets</h2>
                <span className="text-xs px-1.5 py-0.5 bg-[#62c11e] text-white rounded">NEW</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex border border-[#dcdddf] rounded overflow-hidden">
                  <button className="px-2 py-1 text-xs bg-[#2b2c2d] text-white">ALL</button>
                  <button className="px-2 py-1 text-xs">1st Half</button>
                  <button className="px-2 py-1 text-xs">2nd Half</button>
                  <button className="px-2 py-1 text-xs">1st Quarter</button>
                  <button className="px-2 py-1 text-xs">2nd Quarter</button>
                  <button className="px-2 py-1 text-xs">3rd Quarter</button>
                  <button className="px-2 py-1 text-xs">4th Quarter</button>
                </div>
              </div>
            </div>

            {/* Moneyline Section */}
            <div className="mb-4">
              <div
                className="flex items-center gap-2 bg-[#f1f2f3] p-2 rounded-t border border-[#dcdddf] cursor-pointer"
                onClick={() => toggleSection("moneyline")}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${!expandedSections.moneyline ? "-rotate-90" : ""}`}
                />
                <span className="font-medium">Moneyline</span>
                <span className="text-xs px-1.5 py-0.5 bg-[#62c11e] text-white rounded">NEW</span>
              </div>

              {expandedSections.moneyline && (
                <div className="border-x border-b border-[#dcdddf] rounded-b">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                        <th className="py-2 px-4 text-left">Line</th>
                        <th className="py-2 px-4 text-center">Output</th>
                        <th className="py-2 px-4 text-center">Sim</th>
                        <th className="py-2 px-4 text-center">Competitor Price</th>
                        <th className="py-2 px-4 text-center">Rec. Price</th>
                        <th className="py-2 px-4 text-center">Liability</th>
                        <th className="py-2 px-4 text-center">% SP</th>
                        <th className="py-2 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">Los Angeles Lakers</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">30,202.11</td>
                        <td className="py-2 px-4 text-center">27</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">OPEN</span>
                        </td>
                      </tr>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">Boston Celtics</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">30,202.11</td>
                        <td className="py-2 px-4 text-center">22</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">OPEN</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="8" className="text-right py-2 px-4">
                          <a href="#" className="text-sm text-[#5f6368] hover:text-[#2b2c2d]">
                            See All
                          </a>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            {/* Handicap Section */}
            <div className="mb-4">
              <div
                className="flex items-center gap-2 bg-[#f1f2f3] p-2 rounded-t border border-[#dcdddf] cursor-pointer"
                onClick={() => toggleSection("handicap")}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${!expandedSections.handicap ? "-rotate-90" : ""}`}
                />
                <span className="font-medium">Handicap</span>
              </div>

              {expandedSections.handicap && (
                <div className="border-x border-b border-[#dcdddf] rounded-b">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                        <th className="py-2 px-4 text-left">Line</th>
                        <th className="py-2 px-4 text-center">Output</th>
                        <th className="py-2 px-4 text-center">Sim</th>
                        <th className="py-2 px-4 text-center">Competitor Price</th>
                        <th className="py-2 px-4 text-center">Rec. Price</th>
                        <th className="py-2 px-4 text-center">Liability</th>
                        <th className="py-2 px-4 text-center">% SP</th>
                        <th className="py-2 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">Los Angeles Lakers -5.5</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">30,202.11</td>
                        <td className="py-2 px-4 text-center">27</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">OPEN</span>
                        </td>
                      </tr>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">Boston Celtics +5.5</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">30,202.11</td>
                        <td className="py-2 px-4 text-center">22</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">OPEN</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="8" className="text-right py-2 px-4">
                          <a href="#" className="text-sm text-[#5f6368] hover:text-[#2b2c2d]">
                            See All
                          </a>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            {/* Match Total Section */}
            <div className="mb-4">
              <div
                className="flex items-center gap-2 bg-[#f1f2f3] p-2 rounded-t border border-[#dcdddf] cursor-pointer"
                onClick={() => toggleSection("matchTotal")}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${!expandedSections.matchTotal ? "-rotate-90" : ""}`}
                />
                <span className="font-medium">Match Total</span>
              </div>

              {expandedSections.matchTotal && (
                <div className="border-x border-b border-[#dcdddf] rounded-b">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                        <th className="py-2 px-4 text-left">Line</th>
                        <th className="py-2 px-4 text-center">Output</th>
                        <th className="py-2 px-4 text-center">Sim</th>
                        <th className="py-2 px-4 text-center">Competitor Price</th>
                        <th className="py-2 px-4 text-center">Rec. Price</th>
                        <th className="py-2 px-4 text-center">Liability</th>
                        <th className="py-2 px-4 text-center">% SP</th>
                        <th className="py-2 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">Over 220.5</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">30,202.11</td>
                        <td className="py-2 px-4 text-center">27</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">OPEN</span>
                        </td>
                      </tr>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">Under 220.5</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>

                        <td className="py-2 px-4 text-center">1.234</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="8" className="text-right py-2 px-4">
                          <a href="#" className="text-sm text-[#5f6368] hover:text-[#2b2c2d]">
                            See All
                          </a>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            {/* Team Total Section */}
            <div className="mb-4">
              <div
                className="flex items-center gap-2 bg-[#f1f2f3] p-2 rounded-t border border-[#dcdddf] cursor-pointer"
                onClick={() => toggleSection("teamTotal")}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${!expandedSections.teamTotal ? "-rotate-90" : ""}`}
                />
                <span className="font-medium">Team Total</span>
              </div>

              {expandedSections.teamTotal && (
                <div className="border-x border-b border-[#dcdddf] rounded-b">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                        <th className="py-2 px-4 text-left">Line</th>
                        <th className="py-2 px-4 text-center">Output</th>
                        <th className="py-2 px-4 text-center">Sim</th>
                        <th className="py-2 px-4 text-center">Competitor Price</th>
                        <th className="py-2 px-4 text-center">Rec. Price</th>
                        <th className="py-2 px-4 text-center">Liability</th>
                        <th className="py-2 px-4 text-center">% SP</th>
                        <th className="py-2 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">Lakers Over 110.5</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">30,202.11</td>
                        <td className="py-2 px-4 text-center">27</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">OPEN</span>
                        </td>
                      </tr>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">Lakers Under 110.5</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">30,202.11</td>
                        <td className="py-2 px-4 text-center">22</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#62c11e] text-white rounded-full text-xs">OPEN</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="8" className="text-right py-2 px-4">
                          <a href="#" className="text-sm text-[#5f6368] hover:text-[#2b2c2d]">
                            See All
                          </a>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Player Markets */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">Player Markets</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex border border-[#dcdddf] rounded overflow-hidden">
                  <button className="px-2 py-1 text-xs bg-[#2b2c2d] text-white">ALL</button>
                  <button className="px-2 py-1 text-xs">Lakers</button>
                  <button className="px-2 py-1 text-xs">Celtics</button>
                </div>
              </div>
            </div>

            {/* LeBron James Section */}
            <div className="mb-4">
              <div
                className="flex items-center gap-2 bg-[#f1f2f3] p-2 rounded-t border border-[#dcdddf] cursor-pointer"
                onClick={() => toggleSection("lebronJames")}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${!expandedSections.lebronJames ? "-rotate-90" : ""}`}
                />
                <span className="font-medium">LeBron James</span>
                <span className="text-xs px-1.5 py-0.5 bg-[#F44336] text-white rounded">SUSPENDED</span>
              </div>

              {expandedSections.lebronJames && (
                <div className="border-x border-b border-[#dcdddf] rounded-b">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#dcdddf] bg-[#f1f2f3]">
                        <th className="py-2 px-4 text-left">Line</th>
                        <th className="py-2 px-4 text-center">Output</th>
                        <th className="py-2 px-4 text-center">Sim</th>
                        <th className="py-2 px-4 text-center">Competitor Price</th>
                        <th className="py-2 px-4 text-center">Rec. Price</th>
                        <th className="py-2 px-4 text-center">Liability</th>
                        <th className="py-2 px-4 text-center">% SP</th>
                        <th className="py-2 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">LeBron James Over 25.5 Points</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">30,202.11</td>
                        <td className="py-2 px-4 text-center">27</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#F44336] text-white rounded-full text-xs">SUSPENDED</span>
                        </td>
                      </tr>
                      <tr className="border-b border-[#dcdddf]">
                        <td className="py-2 px-4">LeBron James Under 25.5 Points</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">1.234</td>
                        <td className="py-2 px-4 text-center">30,202.11</td>
                        <td className="py-2 px-4 text-center">22</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2 py-0.5 bg-[#F44336] text-white rounded-full text-xs">SUSPENDED</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="8" className="text-right py-2 px-4">
                          <a href="#" className="text-sm text-[#5f6368] hover:text-[#2b2c2d]">
                            See All
                          </a>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>

            {/* Player Milestones Section */}
            <div className="mb-4">
              <div
                className="flex items-center gap-2 bg-[#f1f2f3] p-2 rounded-t border border-[#dcdddf] cursor-pointer"
                onClick={() => toggleSection("playerMilestones")}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${!expandedSections.playerMilestones ? "-rotate-90" : ""}`}
                />
                <span className="font-medium">Player Milestones</span>
              </div>

              {expandedSections.playerMilestones && (
                <div className="border-x border-b border-[#dcdddf] rounded-b p-4">
                  <p className="text-sm text-[#5f6368]">Player milestone markets will be displayed here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Alert Details Modal */}
          {showAlertDetailsModal && selectedAlert && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex items-center justify-between p-4 border-b border-[#dcdddf]">
                  <h3 className="text-lg font-medium">Alert Details</h3>
                  <button onClick={closeAlertDetailsModal} className="text-[#5f6368] hover:text-[#2b2c2d]">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-[#5f6368] mb-1">Market</p>
                      <p className="font-medium">{selectedAlert.market}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5f6368] mb-1">Market ID</p>
                      <p className="font-medium">{selectedAlert.details.marketId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5f6368] mb-1">Fixture</p>
                      <p className="font-medium">
                        {selectedAlert.homeTeam} vs {selectedAlert.awayTeam}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5f6368] mb-1">Timestamp</p>
                      <p className="font-medium">{selectedAlert.details.timestamp}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5f6368] mb-1">Trigger Reason</p>
                      <p className="font-medium">{selectedAlert.details.triggerReason}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5f6368] mb-1">Liability</p>
                      <p className="font-medium">{selectedAlert.details.liability}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5f6368] mb-1">Stake Factor</p>
                      <p className="font-medium">{selectedAlert.details.stakeFactor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5f6368] mb-1">Risk Level</p>
                      <p className="font-medium">{selectedAlert.details.riskLevel}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5f6368] mb-1">Previous Alerts</p>
                      <p className="font-medium">{selectedAlert.details.previousAlerts}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-[#5f6368] mb-1">Price Comparison</p>
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#f1f2f3]">
                          <th className="p-2 text-left font-medium">Type</th>
                          <th className="p-2 text-left font-medium">Value</th>
                          <th className="p-2 text-left font-medium">Difference</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#dcdddf]">
                          <td className="p-2">Taken Price</td>
                          <td className="p-2">{selectedAlert.taken}</td>
                          <td className="p-2">-</td>
                        </tr>
                        <tr className="border-b border-[#dcdddf]">
                          <td className="p-2">Current Price</td>
                          <td className="p-2">{selectedAlert.current}</td>
                          <td className="p-2">0.00%</td>
                        </tr>
                        <tr className="border-b border-[#dcdddf]">
                          <td className="p-2">Market Average</td>
                          <td className="p-2">{selectedAlert.marketAv}</td>
                          <td className="p-2 text-[#F44336]">+9.08%</td>
                        </tr>
                        <tr>
                          <td className="p-2">Competitor Price</td>
                          <td className="p-2">{selectedAlert.comp}</td>
                          <td className="p-2 text-[#F44336]">+18.17%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-[#5f6368] mb-1">Recommendation</p>
                    <p className="p-2 bg-[#f1f2f3] rounded">{selectedAlert.recommendation}</p>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={closeAlertDetailsModal}
                      className="px-4 py-2 border border-[#dcdddf] rounded hover:bg-[#f9f9f9]"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        closeAlertDetailsModal()
                        openAcceptPreview(selectedAlert, { stopPropagation: () => {} })
                      }}
                      className="px-4 py-2 bg-[#62c11e] text-white rounded hover:bg-[#52a119]"
                    >
                      Accept Recommendation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Accept Preview Modal */}
          {showAcceptPreview && alertForAction && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-[#dcdddf]">
                  <h3 className="text-lg font-medium">Accept Price Change</h3>
                  <button onClick={closeActionModals} className="text-[#5f6368] hover:text-[#2b2c2d]">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="mb-4">
                    You are about to change the price for <strong>{alertForAction.market}</strong> from{" "}
                    <strong>{alertForAction.current}</strong> to{" "}
                    <strong>{extractRecommendedPrice(alertForAction.recommendation)}</strong>.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Current Price:</span>
                      <span className="font-medium">{alertForAction.current}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>New Price:</span>
                      <span className="font-medium">{extractRecommendedPrice(alertForAction.recommendation)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Change:</span>
                      <span className="font-medium text-[#eb6a2e]">
                        {(
                          ((Number.parseFloat(extractRecommendedPrice(alertForAction.recommendation)) -
                            Number.parseFloat(alertForAction.current)) /
                            Number.parseFloat(alertForAction.current)) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={closeActionModals}
                      className="px-4 py-2 border border-[#dcdddf] rounded hover:bg-[#f9f9f9]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmAccept}
                      className="px-4 py-2 bg-[#62c11e] text-white rounded hover:bg-[#52a119]"
                    >
                      Confirm Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Suspend Confirmation Modal */}
          {showSuspendConfirmation && alertForAction && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-[#dcdddf]">
                  <h3 className="text-lg font-medium">Suspend Market</h3>
                  <button onClick={closeActionModals} className="text-[#5f6368] hover:text-[#2b2c2d]">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="mb-4">
                    You are about to suspend the market <strong>{alertForAction.market}</strong>. This will prevent any
                    new bets from being placed on this market.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Market:</span>
                      <span className="font-medium">{alertForAction.market}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Current Status:</span>
                      <span className="font-medium">Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>New Status:</span>
                      <span className="font-medium text-[#F44336]">Suspended</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={closeActionModals}
                      className="px-4 py-2 border border-[#dcdddf] rounded hover:bg-[#f9f9f9]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmSuspend}
                      className="px-4 py-2 bg-[#FFC107] text-white rounded hover:bg-[#e6af06]"
                    >
                      Confirm Suspension
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dismiss Confirmation Modal */}
          {showDismissConfirmation && alertForAction && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-[#dcdddf]">
                  <h3 className="text-lg font-medium">Dismiss Alert</h3>
                  <button onClick={closeActionModals} className="text-[#5f6368] hover:text-[#2b2c2d]">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="mb-4">
                    You are about to dismiss the alert for <strong>{alertForAction.market}</strong>. This will remove
                    the alert from your list.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Alert ID:</span>
                      <span className="font-medium">{alertForAction.id}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Market:</span>
                      <span className="font-medium">{alertForAction.market}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recommendation:</span>
                      <span className="font-medium">{alertForAction.recommendation}</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={closeActionModals}
                      className="px-4 py-2 border border-[#dcdddf] rounded hover:bg-[#f9f9f9]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDismiss}
                      className="px-4 py-2 bg-[#F44336] text-white rounded hover:bg-[#d32f2f]"
                    >
                      Confirm Dismissal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
