"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

type TransactionData = {
  amount: number
  merchantName: string
  cardLast4: string
  location: string
  isInternational: boolean
  isNewMerchant: boolean
  isNewLocation: boolean
  timeOfDay: string
  dayOfWeek: string
  // Add any other fields your ML model requires
}

type PredictionResult = {
  riskScore: number
  fraudProbability: number
  flagged: boolean
  features: {
    [key: string]: number
  }
}

export function TransactionAnalysisForm() {
  const [transaction, setTransaction] = useState<TransactionData>({
    amount: 0,
    merchantName: "",
    cardLast4: "",
    location: "",
    isInternational: false,
    isNewMerchant: false,
    isNewLocation: false,
    timeOfDay: "",
    dayOfWeek: "",
  })

  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setTransaction({
      ...transaction,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Unknown error occurred")
      }

      setPrediction(data.prediction)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Helper function to get color based on risk score
  const getRiskColor = (score: number) => {
    if (score < 30) return "text-green-600 dark:text-green-400"
    if (score < 60) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Analyze Transaction</CardTitle>
        <CardDescription>Enter transaction details to analyze for potential fraud</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Transaction Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={transaction.amount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="merchantName">Merchant Name</Label>
              <Input
                id="merchantName"
                name="merchantName"
                value={transaction.merchantName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardLast4">Card Last 4 Digits</Label>
              <Input
                id="cardLast4"
                name="cardLast4"
                maxLength={4}
                value={transaction.cardLast4}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={transaction.location} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeOfDay">Time of Day</Label>
              <Input
                id="timeOfDay"
                name="timeOfDay"
                type="time"
                value={transaction.timeOfDay}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dayOfWeek">Day of Week</Label>
              <Input
                id="dayOfWeek"
                name="dayOfWeek"
                value={transaction.dayOfWeek}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isInternational"
                name="isInternational"
                checked={transaction.isInternational}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isInternational">International Transaction</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isNewMerchant"
                name="isNewMerchant"
                checked={transaction.isNewMerchant}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isNewMerchant">New Merchant</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isNewLocation"
                name="isNewLocation"
                checked={transaction.isNewLocation}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="isNewLocation">New Location</Label>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Transaction"
            )}
          </Button>
        </form>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {prediction && (
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-medium">Analysis Results</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Risk Score</div>
                <div className={`text-2xl font-bold ${getRiskColor(prediction.riskScore)}`}>{prediction.riskScore}</div>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Fraud Probability</div>
                <div className={`text-2xl font-bold ${getRiskColor(prediction.fraudProbability * 100)}`}>
                  {(prediction.fraudProbability * 100).toFixed(2)}%
                </div>
              </div>

              <div className="bg-card border rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="mt-1">
                  <Badge
                    variant="outline"
                    className={
                      prediction.flagged
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    }
                  >
                    {prediction.flagged ? "Flagged" : "Approved"}
                  </Badge>
                </div>
              </div>
            </div>

            {prediction.features && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Feature Importance</h4>
                <div className="space-y-2">
                  {Object.entries(prediction.features).map(([feature, value]) => (
                    <div key={feature} className="flex items-center">
                      <div className="w-1/3 text-sm">{feature}</div>
                      <div className="w-2/3 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${Math.abs(value * 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

