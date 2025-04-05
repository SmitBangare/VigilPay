import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Download, Filter, Search } from "lucide-react"

export default function TransactionsPage() {
  // Mock transaction data with Indian context
  const transactions = [
    {
      id: "TRX-4829",
      cardLast4: "4532",
      amount: "₹18,550",
      merchant: "Flipkart",
      location: "Mumbai, Maharashtra",
      date: "Mar 5, 2025",
      time: "14:30:25",
      status: "approved",
      riskScore: 12,
    },
    {
      id: "TRX-4828",
      cardLast4: "7865",
      amount: "₹95,450",
      merchant: "Croma",
      location: "Bangalore, Karnataka",
      date: "Mar 5, 2025",
      time: "13:45:12",
      status: "flagged",
      riskScore: 68,
    },
    {
      id: "TRX-4827",
      cardLast4: "9012",
      amount: "₹6,999",
      merchant: "Zomato",
      location: "Delhi, Delhi",
      date: "Mar 5, 2025",
      time: "12:15:45",
      status: "approved",
      riskScore: 5,
    },
    {
      id: "TRX-4826",
      cardLast4: "6543",
      amount: "₹2,75,000",
      merchant: "Tanishq",
      location: "Chennai, Tamil Nadu",
      date: "Mar 5, 2025",
      time: "11:22:33",
      status: "reviewing",
      riskScore: 45,
    },
    {
      id: "TRX-4825",
      cardLast4: "2109",
      amount: "₹2,50,000",
      merchant: "Unknown Merchant",
      location: "Bangkok, Thailand",
      date: "Mar 5, 2025",
      time: "10:05:17",
      status: "declined",
      riskScore: 92,
    },
    {
      id: "TRX-4824",
      cardLast4: "8765",
      amount: "₹9,575",
      merchant: "Swiggy",
      location: "Hyderabad, Telangana",
      date: "Mar 5, 2025",
      time: "09:30:00",
      status: "approved",
      riskScore: 8,
    },
    {
      id: "TRX-4823",
      cardLast4: "5432",
      amount: "₹5,250",
      merchant: "Cafe Coffee Day",
      location: "Pune, Maharashtra",
      date: "Mar 5, 2025",
      time: "08:45:22",
      status: "approved",
      riskScore: 3,
    },
    {
      id: "TRX-4822",
      cardLast4: "3210",
      amount: "₹85,000",
      merchant: "Dubai Duty Free",
      location: "Dubai, UAE",
      date: "Mar 4, 2025",
      time: "23:15:10",
      status: "flagged",
      riskScore: 72,
    },
  ]

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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">View and manage all credit card transactions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Browse and filter all transactions processed by the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search transactions..." className="pl-8 w-full" />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="declined">Declined</SelectItem>
                    <SelectItem value="flagged">Flagged</SelectItem>
                    <SelectItem value="reviewing">Reviewing</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>

                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Card</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>•••• {transaction.cardLast4}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>{transaction.merchant}</TableCell>
                      <TableCell>{transaction.location}</TableCell>
                      <TableCell>
                        <div>{transaction.date}</div>
                        <div className="text-xs text-muted-foreground">{transaction.time}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusColors[transaction.status as keyof typeof statusColors]}
                        >
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getRiskScoreColor(transaction.riskScore)}`}>
                          {transaction.riskScore}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>1</strong> to <strong>8</strong> of <strong>256</strong> transactions
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

