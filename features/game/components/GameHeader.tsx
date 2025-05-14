import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Game } from "../types"

interface GameHeaderProps {
  game: Game
}

export function GameHeader({ game }: GameHeaderProps) {
  return (
    <>
      {/* Back Button */}
      <Link href="/" className="flex items-center gap-2 mb-4 text-[#5f6368] hover:text-[#2b2c2d]">
        <ArrowLeft className="h-4 w-4" />
        <span>Back to fixtures</span>
      </Link>

      {/* Fixture Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold">
            {game.awayTeam.name} @ {game.homeTeam.name}
          </h1>
          <div className="px-4 py-1 bg-[#62c11e] text-white rounded-full text-sm font-medium">
            {game.status === "in_progress" ? "Open" : game.status}
          </div>
        </div>
        <div className="text-[#5f6368] text-sm">NBA • {game.date}</div>
      </div>
    </>
  )
}
