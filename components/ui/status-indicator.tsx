import { cn } from "@/lib/utils"
import { Badge } from "./badge"

export type StatusType = "live" | "upcoming" | "completed" | "suspended" | "delayed" | "cancelled"

interface StatusIndicatorProps {
  status: StatusType
  className?: string
  showPulse?: boolean
  size?: "sm" | "default" | "lg"
}

export function StatusIndicator({ status, className, showPulse = true, size = "default" }: StatusIndicatorProps) {
  const statusConfig = {
    live: {
      label: "Live",
      variant: "success" as const,
      icon: showPulse && (
        <span className="mr-1.5 relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
      ),
    },
    upcoming: {
      label: "Upcoming",
      variant: "outline" as const,
      icon: null,
    },
    completed: {
      label: "Completed",
      variant: "secondary" as const,
      icon: null,
    },
    suspended: {
      label: "Suspended",
      variant: "destructive" as const,
      icon: null,
    },
    delayed: {
      label: "Delayed",
      variant: "warning" as const,
      icon: null,
    },
    cancelled: {
      label: "Cancelled",
      variant: "destructive" as const,
      icon: null,
    },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} size={size} className={cn("flex items-center", className)}>
      {config.icon}
      {config.label}
    </Badge>
  )
}
