import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowUpRight, CreditCard, IndianRupee, ShieldAlert, ShieldCheck } from "lucide-react"
import { RecentTransactions } from "@/components/recent-transactions"
import { FraudMetricsChart } from "@/components/fraud-metrics-chart"
import { RiskDistributionChart } from "@/components/risk-distribution-chart"
import { AlertsList } from "@/components/alerts-list"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Monitor fraud detection metrics and recent activity</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,546</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹9,45,67,800</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Attempts</CardTitle>
            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">-3% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prevention Rate</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Alert variant="destructive" className="border-destructive/50 text-destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Critical Alert</AlertTitle>
        <AlertDescription>
          3 high-risk transactions detected in the last hour requiring immediate review in Mumbai region.
          <Button variant="outline" size="sm" className="ml-2 h-7 bg-background">
            View Alerts
          </Button>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Fraud Metrics</CardTitle>
                <CardDescription>Fraud detection metrics over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <FraudMetricsChart />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Transaction Risk Distribution</CardTitle>
                <CardDescription>Distribution of transaction risk scores</CardDescription>
              </CardHeader>
              <CardContent>
                <RiskDistributionChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader className="flex flex-row items-center">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest transactions processed by the system</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <RecentTransactions />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader className="flex flex-row items-center">
                <div>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Latest fraud alerts generated by the system</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <AlertsList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed fraud detection analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Advanced analytics content will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view fraud detection reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Reports content will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

