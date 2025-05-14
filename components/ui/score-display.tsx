import { cn } from "@/lib/utils"
import Image from "next/image"

interface TeamScore {
  name: string
  score: number
  logo?: string
}

interface ScoreDisplayProps {
  homeTeam: TeamScore
  awayTeam: TeamScore
  status?: string
  period?: string
  time?: string
  className?: string
  size?: "sm" | "md" | "lg"
  orientation?: "horizontal" | "vertical"
}

export function ScoreDisplay({
  homeTeam,
  awayTeam,
  status,
  period,
  time,
  className,
  size = "md",
  orientation = "horizontal",
}: ScoreDisplayProps) {
  const sizeClasses = {
    sm: {
      container: "text-sm",
      logo: "w-6 h-6",
      score: "text-lg font-bold",
    },
    md: {
      container: "text-base",
      logo: "w-8 h-8",
      score: "text-2xl font-bold",
    },
    lg: {
      container: "text-lg",
      logo: "w-12 h-12",
      score: "text-4xl font-bold",
    },
  }

  if (orientation === "horizontal") {
    return (
      <div className={cn("flex flex-col", className)}>
        <div className="flex items-center justify-between gap-4">
          {/* Home Team */}
          <div className="flex items-center gap-2">
            {homeTeam.logo && (
              <div className={cn("relative", sizeClasses[size].logo)}>
                <Image
                  src={homeTeam.logo || "/placeholder.svg"}
                  alt={`${homeTeam.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className={sizeClasses[size].container}>{homeTeam.name}</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-2">
            <span className={sizeClasses[size].score}>{homeTeam.score}</span>
            <span className={sizeClasses[size].score}>-</span>
            <span className={sizeClasses[size].score}>{awayTeam.score}</span>
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-2">
            <span className={sizeClasses[size].container}>{awayTeam.name}</span>
            {awayTeam.logo && (
              <div className={cn("relative", sizeClasses[size].logo)}>
                <Image
                  src={awayTeam.logo || "/placeholder.svg"}
                  alt={`${awayTeam.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Game Info */}
        {(status || period || time) && (
          <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted">
            {status && <span>{status}</span>}
            {period && <span>{period}</span>}
            {time && <span>{time}</span>}
          </div>
        )}
      </div>
    )
  }

  // Vertical orientation
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Home Team */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {homeTeam.logo && (
            <div className={cn("relative", sizeClasses[size].logo)}>
              <Image
                src={homeTeam.logo || "/placeholder.svg"}
                alt={`${homeTeam.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          )}
          <span className={sizeClasses[size].container}>{homeTeam.name}</span>
        </div>
        <span className={sizeClasses[size].score}>{homeTeam.score}</span>
      </div>

      {/* Away Team */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {awayTeam.logo && (
            <div className={cn("relative", sizeClasses[size].logo)}>
              <Image
                src={awayTeam.logo || "/placeholder.svg"}
                alt={`${awayTeam.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          )}
          <span className={sizeClasses[size].container}>{awayTeam.name}</span>
        </div>
        <span className={sizeClasses[size].score}>{awayTeam.score}</span>
      </div>

      {/* Game Info */}
      {(status || period || time) && (
        <div className="mt-1 flex items-center gap-2 text-sm text-muted">
          {status && <span>{status}</span>}
          {period && <span>{period}</span>}
          {time && <span>{time}</span>}
        </div>
      )}
    </div>
  )
}
