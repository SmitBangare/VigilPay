"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function ModelPerformanceMetrics() {
  // This would typically be fetched from your ML model's evaluation metrics
  const performanceData = {
    accuracy: 0.95,
    precision: 0.92,
    recall: 0.89,
    f1Score: 0.9,
    auc: 0.97,
    confusionMatrix: {
      truePositives: 450,
      falsePositives: 39,
      trueNegatives: 9500,
      falseNegatives: 56,
    },
  }

  const metricsData = [
    { name: "Accuracy", value: performanceData.accuracy },
    { name: "Precision", value: performanceData.precision },
    { name: "Recall", value: performanceData.recall },
    { name: "F1 Score", value: performanceData.f1Score },
    { name: "AUC", value: performanceData.auc },
  ]

  const confusionData = [
    { name: "True Positives", value: performanceData.confusionMatrix.truePositives, color: "#22c55e" },
    { name: "False Positives", value: performanceData.confusionMatrix.falsePositives, color: "#f97316" },
    { name: "True Negatives", value: performanceData.confusionMatrix.trueNegatives, color: "#3b82f6" },
    { name: "False Negatives", value: performanceData.confusionMatrix.falseNegatives, color: "#ef4444" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Model Metrics</CardTitle>
          <CardDescription>Key performance indicators for the fraud detection model</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metricsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip
                formatter={(value) => [(value as number).toFixed(2), "Value"]}
                contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
              />
              <Bar dataKey="value" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confusion Matrix</CardTitle>
          <CardDescription>Distribution of prediction outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={confusionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                labelLine={false}
              >
                {confusionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [value, "Count"]}
                contentStyle={{ backgroundColor: "var(--background)", borderColor: "var(--border)" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

