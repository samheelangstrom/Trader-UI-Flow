import { cn } from "@/lib/utils"
import Image from "next/image"

export type SportType = "basketball" | "football" | "baseball" | "hockey" | "soccer" | "tennis" | "golf" | "mma"

interface SportIconProps {
  sport: SportType
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SportIcon({ sport, size = "md", className }: SportIconProps) {
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
  }

  const iconSize = sizeMap[size]

  const sportIconMap: Record<SportType, string> = {
    basketball: "/basketball-icon.png",
    football: "/football-icon.png",
    baseball: "/baseball-icon.png",
    hockey: "/hockey-icon.png",
    soccer: "/soccer-icon.png",
    tennis: "/tennis-icon.png",
    golf: "/golf-icon.png",
    mma: "/mma-icon.png",
  }

  return (
    <div className={cn("relative", className)}>
      <Image
        src={sportIconMap[sport] || "/placeholder.svg"}
        alt={`${sport} icon`}
        width={iconSize}
        height={iconSize}
        className="object-contain"
      />
    </div>
  )
}
