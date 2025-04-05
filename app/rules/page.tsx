import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Check, Download, Filter, Plus, Search, Trash2 } from "lucide-react"

export default function RulesPage() {
  // Mock rules data
  const rules = [
    {
      id: "rule-001",
      name: "High Value International Transaction",
      description: "Flag international transactions over $1,000",
      conditions: [
        { field: "amount", operator: ">", value: 1000 },
        { field: "isInternational", operator: "==", value: true },
      ],
      action: "FLAG",
      priority: "HIGH",
      status: "ACTIVE",
      createdAt: "Mar 1, 2025",
      effectiveness: 85,
    },
    {
      id: "rule-002",
      name: "Multiple Transactions in Short Period",
      description: "Flag if more than 5 transactions in 10 minutes",
      conditions: [
        { field: "transactionCount", operator: ">", value: 5 },
        { field: "timeWindow", operator: "<", value: "10 minutes" },
      ],
      action: "FLAG",
      priority: "MEDIUM",
      status: "ACTIVE",
      createdAt: "Mar 2, 2025",
      effectiveness: 92,
    },
    {
      id: "rule-003",
      name: "New Merchant High Value",
      description: "Flag transactions over $500 with new merchants",
      conditions: [
        { field: "amount", operator: ">", value: 500 },
        { field: "isNewMerchant", operator: "==", value: true },
      ],
      action: "FLAG",
      priority: "MEDIUM",
      status: "ACTIVE",
      createdAt: "Mar 3, 2025",
      effectiveness: 78,
    },
    {
      id: "rule-004",
      name: "Unusual Location",
      description: "Block transactions from high-risk countries",
      conditions: [{ field: "country", operator: "in", value: ["Nigeria", "Russia", "Ukraine"] }],
      action: "BLOCK",
      priority: "HIGH",
      status: "ACTIVE",
      createdAt: "Mar 4, 2025",
      effectiveness: 95,
    },
    {
      id: "rule-005",
      name: "Suspicious Merchant Category",
      description: "Flag transactions with suspicious merchant categories",
      conditions: [{ field: "merchantCategory", operator: "in", value: ["Gambling", "Cryptocurrency", "Adult"] }],
      action: "FLAG",
      priority: "LOW",
      status: "INACTIVE",
      createdAt: "Mar 5, 2025",
      effectiveness: 65,
    },
  ]

  // Priority badge colors
  const priorityColors = {
    HIGH: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    MEDIUM: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    LOW: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  }

  // Action badge colors
  const actionColors = {
    FLAG: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    BLOCK: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    ALLOW: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  }

  // Status badge colors
  const statusColors = {
    ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    INACTIVE: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Fraud Detection Rules</h1>
        <p className="text-muted-foreground">Manage and monitor fraud detection rules</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search rules..." className="pl-8 w-full" />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Rule
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Rules</TabsTrigger>
          <TabsTrigger value="all">All Rules</TabsTrigger>
          <TabsTrigger value="templates">Rule Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Rules</CardTitle>
              <CardDescription>Rules that are currently active and being applied to transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Rule Name</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Effectiveness</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules
                    .filter((rule) => rule.status === "ACTIVE")
                    .map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">
                          <div>{rule.name}</div>
                          <div className="text-xs text-muted-foreground">{rule.description}</div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={priorityColors[rule.priority as keyof typeof priorityColors]}
                          >
                            {rule.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={actionColors[rule.action as keyof typeof actionColors]}>
                            {rule.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-2 ${
                                rule.status === "ACTIVE" ? "bg-green-500" : "bg-gray-300"
                              }`}
                            />
                            {rule.status}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="bg-muted w-24 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  rule.effectiveness > 80
                                    ? "bg-green-500"
                                    : rule.effectiveness > 60
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${rule.effectiveness}%` }}
                              />
                            </div>
                            <span className="text-sm">{rule.effectiveness}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <AlertTriangle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Rules</CardTitle>
              <CardDescription>All fraud detection rules in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Rule Name</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Effectiveness</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.map((rule) => (
                    <TableRow key={rule.id}>
                      <TableCell className="font-medium">
                        <div>{rule.name}</div>
                        <div className="text-xs text-muted-foreground">{rule.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={priorityColors[rule.priority as keyof typeof priorityColors]}
                        >
                          {rule.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={actionColors[rule.action as keyof typeof actionColors]}>
                          {rule.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch checked={rule.status === "ACTIVE"} />
                          <span>{rule.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{rule.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-muted w-16 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                rule.effectiveness > 80
                                  ? "bg-green-500"
                                  : rule.effectiveness > 60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${rule.effectiveness}%` }}
                            />
                          </div>
                          <span className="text-sm">{rule.effectiveness}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Rule Templates</CardTitle>
              <CardDescription>Pre-defined rule templates that can be used to create new rules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">High Value Transaction</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Flag transactions above a specified amount threshold
                    </p>
                    <div className="mt-4">
                      <Badge variant="outline" className={priorityColors.MEDIUM}>
                        MEDIUM
                      </Badge>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </div>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Unusual Location</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Flag transactions from unusual or high-risk locations
                    </p>
                    <div className="mt-4">
                      <Badge variant="outline" className={priorityColors.HIGH}>
                        HIGH
                      </Badge>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </div>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Velocity Check</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Flag multiple transactions within a short time period
                    </p>
                    <div className="mt-4">
                      <Badge variant="outline" className={priorityColors.MEDIUM}>
                        MEDIUM
                      </Badge>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </div>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">New Merchant</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Flag transactions with merchants not previously used
                    </p>
                    <div className="mt-4">
                      <Badge variant="outline" className={priorityColors.LOW}>
                        LOW
                      </Badge>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </div>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Merchant Category</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">Flag transactions with specific merchant categories</p>
                    <div className="mt-4">
                      <Badge variant="outline" className={priorityColors.MEDIUM}>
                        MEDIUM
                      </Badge>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <Button variant="outline" className="w-full">
                      Use Template
                    </Button>
                  </div>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Custom Rule</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      Create a completely custom rule with your own conditions
                    </p>
                    <div className="mt-4">
                      <Badge variant="outline" className={priorityColors.MEDIUM}>
                        CUSTOM
                      </Badge>
                    </div>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <Button className="w-full">Create Custom</Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

