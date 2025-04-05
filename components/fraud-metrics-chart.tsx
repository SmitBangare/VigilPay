"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function FraudMetricsChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Generate mock data for the chart
    const mockData = Array.from({ length: 30 }).map((_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))

      return {
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        fraudAttempts: Math.floor(Math.random() * 10) + 1,
        preventedFraud: Math.floor(Math.random() * 8) + 1,
        falsePositives: Math.floor(Math.random() * 3),
      }
    })

    setData(mockData)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} style={{ fontSize: "12px" }} />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} style={{ fontSize: "12px" }} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                      <span className="font-bold text-sm">{payload[0].payload.date}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Fraud Attempts</span>
                      <span className="font-bold text-sm">{payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Prevented</span>
                      <span className="font-bold text-sm">{payload[1].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">False Positives</span>
                      <span className="font-bold text-sm">{payload[2].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="fraudAttempts"
          stroke="#ef4444"
          activeDot={{ r: 6, style: { fill: "#ef4444", opacity: 0.8 } }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="preventedFraud"
          stroke="#22c55e"
          activeDot={{ r: 6, style: { fill: "#22c55e", opacity: 0.8 } }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="falsePositives"
          stroke="#f59e0b"
          activeDot={{ r: 6, style: { fill: "#f59e0b", opacity: 0.8 } }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

