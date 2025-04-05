"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BatchAnalysisForm() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<any | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    setProgress(0)
    setError(null)

    try {
      // Simulate file reading and processing
      const reader = new FileReader()

      reader.onload = async (event) => {
        if (!event.target?.result) return

        // Parse CSV data
        const csvData = event.target.result as string
        const rows = csvData.split("\n")
        const headers = rows[0].split(",")

        // Convert CSV to JSON
        const transactions = rows
          .slice(1)
          .map((row) => {
            const values = row.split(",")
            const transaction: Record<string, string | number | boolean> = {}

            headers.forEach((header, index) => {
              // Basic type conversion
              const value = values[index]?.trim()
              if (value === "true") transaction[header] = true
              else if (value === "false") transaction[header] = false
              else if (!isNaN(Number(value))) transaction[header] = Number(value)
              else transaction[header] = value
            })

            return transaction
          })
          .filter((transaction) => Object.keys(transaction).length > 0)

        // Simulate progress updates
        const totalBatches = Math.ceil(transactions.length / 100)
        let processedBatches = 0

        // Process in batches of 100
        const results = []
        for (let i = 0; i < transactions.length; i += 100) {
          const batch = transactions.slice(i, i + 100)

          // Call the API with the batch
          const response = await fetch("/api/batch-analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ transactions: batch }),
          })

          if (!response.ok) {
            throw new Error("Failed to process batch")
          }

          const data = await response.json()
          results.push(...data.predictions)

          // Update progress
          processedBatches++
          setProgress(Math.round((processedBatches / totalBatches) * 100))
        }

        setResults({
          total: transactions.length,
          flagged: results.filter((r: any) => r.flagged).length,
          approved: results.filter((r: any) => !r.flagged).length,
          highRisk: results.filter((r: any) => r.riskScore > 80).length,
          mediumRisk: results.filter((r: any) => r.riskScore > 40 && r.riskScore <= 80).length,
          lowRisk: results.filter((r: any) => r.riskScore <= 40).length,
        })

        setLoading(false)
      }

      reader.onerror = () => {
        throw new Error("Error reading file")
      }

      reader.readAsText(file)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file">Upload Transactions CSV</Label>
            <div className="flex items-center gap-2">
              <Input id="file" type="file" accept=".csv" onChange={handleFileChange} disabled={loading} />
              <Button type="submit" disabled={!file || loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload & Analyze
                  </>
                )}
              </Button>
            </div>
          </div>

          {loading && (
            <div className="space-y-2">
              <div className="text-sm">Processing transactions...</div>
              <Progress value={progress} />
              <div className="text-xs text-muted-foreground text-right">{progress}%</div>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {results && (
            <div className="pt-4">
              <h3 className="text-lg font-medium mb-4">Batch Analysis Results</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-card border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Total Transactions</div>
                  <div className="text-2xl font-bold">{results.total}</div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Flagged</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {results.flagged} ({((results.flagged / results.total) * 100).toFixed(1)}%)
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Approved</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {results.approved} ({((results.approved / results.total) * 100).toFixed(1)}%)
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">High Risk</div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {results.highRisk} ({((results.highRisk / results.total) * 100).toFixed(1)}%)
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Medium Risk</div>
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {results.mediumRisk} ({((results.mediumRisk / results.total) * 100).toFixed(1)}%)
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Low Risk</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {results.lowRisk} ({((results.lowRisk / results.total) * 100).toFixed(1)}%)
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button>Download Detailed Report</Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

