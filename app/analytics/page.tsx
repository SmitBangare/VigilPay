import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Download, Filter } from "lucide-react"
import { FraudMetricsChart } from "@/components/fraud-metrics-chart"
import { RiskDistributionChart } from "@/components/risk-distribution-chart"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Analyze fraud detection metrics and trends</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex flex-col sm:flex-row gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-[240px] justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Last 30 days</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar initialFocus mode="range" defaultMonth={new Date()} numberOfMonths={2} />
            </PopoverContent>
          </Popover>

          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Card Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cards</SelectItem>
              <SelectItem value="visa">Visa</SelectItem>
              <SelectItem value="mastercard">Mastercard</SelectItem>
              <SelectItem value="amex">American Express</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="merchants">Merchants</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fraud Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.82%</div>
                <p className="text-xs text-muted-foreground">-0.12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Loss per Fraud</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$427.35</div>
                <p className="text-xs text-muted-foreground">+$12.45 from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">False Positive Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4%</div>
                <p className="text-xs text-muted-foreground">-0.3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.7%</div>
                <p className="text-xs text-muted-foreground">+1.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Fraud Metrics Over Time</CardTitle>
                <CardDescription>Fraud detection metrics over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <FraudMetricsChart />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Risk Distribution</CardTitle>
                <CardDescription>Distribution of transaction risk scores</CardDescription>
              </CardHeader>
              <CardContent>
                <RiskDistributionChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Top Fraud Categories</CardTitle>
                <CardDescription>Most common types of fraud detected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Card Testing</div>
                      <div className="text-xs text-muted-foreground">Multiple small transactions</div>
                    </div>
                    <div className="font-medium">32%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Account Takeover</div>
                      <div className="text-xs text-muted-foreground">Unauthorized access</div>
                    </div>
                    <div className="font-medium">28%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Identity Theft</div>
                      <div className="text-xs text-muted-foreground">Using stolen credentials</div>
                    </div>
                    <div className="font-medium">24%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Chargeback Fraud</div>
                      <div className="text-xs text-muted-foreground">Disputing legitimate charges</div>
                    </div>
                    <div className="font-medium">10%</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Other</div>
                      <div className="text-xs text-muted-foreground">Miscellaneous fraud types</div>
                    </div>
                    <div className="font-medium">6%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fraud by Time of Day</CardTitle>
                <CardDescription>When fraud attempts most commonly occur</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {Array.from({ length: 24 }).map((_, i) => {
                    // Generate a random height between 10% and 100%
                    const height = 10 + Math.floor(Math.random() * 90)
                    // Higher values during evening hours (18-22)
                    const adjustedHeight = i >= 18 && i <= 22 ? Math.min(height + 30, 100) : height

                    return (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-primary/80 rounded-sm" style={{ height: `${adjustedHeight}%` }} />
                        <div className="text-xs mt-1">{i}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fraud by Day of Week</CardTitle>
                <CardDescription>Distribution of fraud attempts by day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-end gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    // Generate a random height between 30% and 100%
                    const height = 30 + Math.floor(Math.random() * 70)
                    // Higher values during weekends
                    const adjustedHeight = i >= 5 ? Math.min(height + 20, 100) : height

                    return (
                      <div key={day} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-primary/80 rounded-sm" style={{ height: `${adjustedHeight}%` }} />
                        <div className="text-xs mt-1">{day}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Trends</CardTitle>
              <CardDescription>Long-term fraud detection trends and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Trend analysis charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Fraud attempts by geographic location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Geographic distribution map will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Merchant Analysis</CardTitle>
              <CardDescription>Fraud patterns by merchant type and category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Merchant analysis charts will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

