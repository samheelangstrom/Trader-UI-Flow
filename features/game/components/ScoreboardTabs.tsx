"use client"

interface ScoreboardTabsProps {
  activeTab: "scoreboard" | "liabilities" | "suspension" | "alerts"
  onTabChange: (tab: "scoreboard" | "liabilities" | "suspension" | "alerts") => void
}

export function ScoreboardTabs({ activeTab, onTabChange }: ScoreboardTabsProps) {
  return (
    <div className="flex justify-center mb-6">
      <div className="inline-flex rounded-md bg-[#f1f2f3] p-1">
        <button
          className={`px-4 py-2 text-sm rounded-md ${
            activeTab === "scoreboard" ? "bg-white text-[#eb6a2e] shadow-sm" : "text-[#5f6368] hover:text-[#2b2c2d]"
          }`}
          onClick={() => onTabChange("scoreboard")}
        >
          Scoreboard
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-md ${
            activeTab === "liabilities" ? "bg-white text-[#eb6a2e] shadow-sm" : "text-[#5f6368] hover:text-[#2b2c2d]"
          }`}
          onClick={() => onTabChange("liabilities")}
        >
          Liabilities and Stake Factor
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-md ${
            activeTab === "suspension" ? "bg-white text-[#eb6a2e] shadow-sm" : "text-[#5f6368] hover:text-[#2b2c2d]"
          }`}
          onClick={() => onTabChange("suspension")}
        >
          Suspension View
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-md ${
            activeTab === "alerts" ? "bg-white text-[#eb6a2e] shadow-sm" : "text-[#5f6368] hover:text-[#2b2c2d]"
          }`}
          onClick={() => onTabChange("alerts")}
        >
          Alerts
        </button>
      </div>
    </div>
  )
}
