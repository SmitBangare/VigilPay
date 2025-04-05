import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TransactionAnalysisForm } from "@/components/transaction-analysis-form"

export default function MLIntegrationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">ML Integration</h1>
        <p className="text-muted-foreground">Analyze transactions using the machine learning model</p>
      </div>

      <Tabs defaultValue="analyze" className="space-y-4">
        <TabsList>
          <TabsTrigger value="analyze">Analyze Transaction</TabsTrigger>
          <TabsTrigger value="batch">Batch Analysis</TabsTrigger>
          <TabsTrigger value="performance">Model Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze">
          <TransactionAnalysisForm />
        </TabsContent>

        <TabsContent value="batch">
          <Card>
            <CardHeader>
              <CardTitle>Batch Analysis</CardTitle>
              <CardDescription>Upload a CSV file with multiple transactions to analyze in batch</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Implement your batch analysis component here. This would allow uploading a CSV file with transaction
                data to be processed by your ML model.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
              <CardDescription>View the performance metrics of your fraud detection model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Implement your model performance metrics component here. This would display accuracy, precision,
                  recall, F1 score, and other relevant metrics.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

