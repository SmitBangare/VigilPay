"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { formatDate, generateRandomDate } from "@/lib/utils"
import { AlertTriangle, CreditCard, MapPin, ShoppingBag } from "lucide-react"

type Alert = {
  id: string
  title: string
  description: string
  location?: string
  timestamp: Date
  severity: "low" | "medium" | "high" | "critical"
  type: "location" | "amount" | "frequency" | "merchant"
  transactionId: string
}

export function AlertsList() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // Generate mock alert data with Indian context
    const alertTypes = [
      {
        type: "location" as const,
        title: "Unusual location detected",
        description: "Transaction from previously unseen location",
        locations: [
          "Dubai, UAE", 
          "Singapore", 
          "Bangkok, Thailand",
          "London, UK", 
          "New York, USA"
        ],
        icon: MapPin,
      },
      {
        type: "amount" as const,
        title: "Unusual transaction amount",
        description: "Transaction amount significantly higher than average (₹75,000+)",
        locations: [
          "Mumbai, Maharashtra", 
          "Delhi, Delhi", 
          "Bangalore, Karnataka",
          "Chennai, Tamil Nadu"
        ],
        icon: CreditCard,
      },
      {
        type: "frequency" as const,
        title: "High transaction frequency",
        description: "Multiple transactions in Delhi within 30 minutes",
        locations: [
          "Delhi, Delhi", 
          "Noida, Uttar Pradesh", 
          "Gurgaon, Haryana"
        ],
        icon: AlertTriangle,
      },
      {
        type: "merchant" as const,
        title: "Suspicious merchant",
        description: "Transaction with unverified online merchant",
        locations: [
          "Mumbai, Maharashtra", 
          "Hyderabad, Telangana", 
          "Kolkata, West Bengal"
        ],
        icon: ShoppingBag,
      },
    ]

    const mockAlerts: Alert[] = Array.from({ length: 4 }).map((_, i) => {
      const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
      const severities = ["low", "medium", "high", "critical"] as const
      const severity = severities[Math.floor(Math.random() * severities.length)]
      const location = alertType.locations[Math.floor(Math.random() * alertType.locations.length)]

      return {
        id: `ALT-${Math.floor(Math.random() * 10000)}`,
        title: alertType.title,
        description: alertType.description,
        location: location,
        timestamp: generateRandomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()),
        severity,
        type: alertType.type,
        transactionId: `TRX-${Math.floor(Math.random() * 10000)}`,
      }
    })

    // Sort by timestamp (most recent first)
    mockAlerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    setAlerts(mockAlerts)
  }, [])

  // Severity badge colors
  const severityColors = {
    low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    high: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    critical: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  }

  // Alert type icons
  const alertIcons = {
    location: MapPin,
    amount: CreditCard,
    frequency: AlertTriangle,
    merchant: ShoppingBag,
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const Icon = alertIcons[alert.type]

        return (
          <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
            <div className="mt-0.5 bg-muted p-1.5 rounded-md">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">{alert.title}</div>
                <Badge variant="outline" className={severityColors[alert.severity]}>
                  {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">{alert.description}</div>
              {alert.location && (
                <div className="text-xs text-muted-foreground">
                  Location: {alert.location}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(alert.timestamp)} • Transaction {alert.transactionId}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

