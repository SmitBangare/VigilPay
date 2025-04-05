"use client"

import { useEffect, useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export function RiskDistributionChart() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Generate mock data for the chart
    const mockData = [
      { name: "Low Risk (0-20)", value: 45, color: "#22c55e" },
      { name: "Medium-Low Risk (21-40)", value: 30, color: "#84cc16" },
      { name: "Medium Risk (41-60)", value: 15, color: "#f59e0b" },
      { name: "Medium-High Risk (61-80)", value: 7, color: "#f97316" },
      { name: "High Risk (81-100)", value: 3, color: "#ef4444" },
    ]

    setData(mockData)
  }, [])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-1">
                    <div className="font-medium">{payload[0].name}</div>
                    <div className="text-sm">
                      {payload[0].value} transactions ({((payload[0].value / 100) * 100).toFixed(0)}%)
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

