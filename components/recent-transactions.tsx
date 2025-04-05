"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { calculateRiskScore, formatCurrency, formatDate, generateRandomAmount, generateRandomDate } from "@/lib/utils"

type Transaction = {
  id: string
  cardLast4: string
  amount: number
  merchant: string
  location: string
  timestamp: Date
  status: "approved" | "declined" | "flagged" | "reviewing"
  isInternational: boolean
  isNewMerchant: boolean
  isNewLocation: boolean
  riskScore: number
}

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    // Generate mock transaction data with Indian merchants
    const merchants = [
      "Flipkart",
      "Reliance Retail",
      "DMart",
      "BigBasket",
      "Myntra",
      "Swiggy",
      "Zomato",
      "MakeMyTrip",
      "IRCTC",
      "Croma",
      "Indian Oil",
      "Cafe Coffee Day",
      "Jio Mart",
      "Paytm Mall",
      "Nykaa",
    ]
    
    // Indian cities for transaction locations
    const locations = [
      "Mumbai, Maharashtra",
      "Delhi, Delhi",
      "Bangalore, Karnataka",
      "Hyderabad, Telangana",
      "Chennai, Tamil Nadu",
      "Kolkata, West Bengal",
      "Ahmedabad, Gujarat",
      "Pune, Maharashtra",
      "Jaipur, Rajasthan",
      "Lucknow, Uttar Pradesh",
      "Chandigarh, Punjab",
      "Kochi, Kerala",
      "Indore, Madhya Pradesh",
      "Bhubaneswar, Odisha",
      "Guwahati, Assam",
    ]
    
    // International locations for some transactions
    const internationalLocations = [
      "Dubai, UAE",
      "Singapore",
      "Bangkok, Thailand",
      "London, UK",
      "New York, USA",
    ]

    const mockTransactions: Transaction[] = Array.from({ length: 5 }).map((_, i) => {
      const isInternational = Math.random() > 0.8
      const isNewMerchant = Math.random() > 0.7
      const isNewLocation = Math.random() > 0.75
      const amount = generateRandomAmount()
      const location = isInternational 
        ? internationalLocations[Math.floor(Math.random() * internationalLocations.length)]
        : locations[Math.floor(Math.random() * locations.length)]

      const transaction = {
        id: `TRX-${Math.floor(Math.random() * 10000)}`,
        cardLast4: `${Math.floor(1000 + Math.random() * 9000)}`,
        amount,
        merchant: merchants[Math.floor(Math.random() * merchants.length)],
        location,
        timestamp: generateRandomDate(new Date(Date.now() - 24 * 60 * 60 * 1000), new Date()),
        isInternational,
        isNewMerchant,
        isNewLocation,
        status: "approved" as const,
        riskScore: 0,
      }

      // Calculate risk score
      transaction.riskScore = calculateRiskScore(transaction)

      // Determine status based on risk score
      if (transaction.riskScore > 80) {
        transaction.status = "declined"
      } else if (transaction.riskScore > 60) {
        transaction.status = "flagged"
      } else if (transaction.riskScore > 40) {
        transaction.status = "reviewing"
      }

      return transaction
    })

    // Sort by timestamp (most recent first)
    mockTransactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

    setTransactions(mockTransactions)
  }, [])

  // Status badge colors
  const statusColors = {
    approved: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    declined: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    flagged: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    reviewing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  }

  // Risk score colors
  const getRiskScoreColor = (score: number) => {
    if (score < 30) return "text-green-600 dark:text-green-400"
    if (score < 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex flex-col">
            <div className="font-medium">{transaction.merchant}</div>
            <div className="text-sm text-muted-foreground">
              Card ending {transaction.cardLast4} • {formatDate(transaction.timestamp)}
            </div>
            <div className="text-xs text-muted-foreground">
              {transaction.location}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="font-medium">{formatCurrency(transaction.amount)}</div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={statusColors[transaction.status]}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </Badge>
              <span className={`text-xs font-medium ${getRiskScoreColor(transaction.riskScore)}`}>
                Risk: {transaction.riskScore}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

