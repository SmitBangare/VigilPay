import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, UserPlus } from "lucide-react"

export default function UsersPage() {
  // Mock users data
  const users = [
    {
      id: "user-001",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "ADMIN",
      status: "ACTIVE",
      lastActive: "2 minutes ago",
      createdAt: "Mar 1, 2025",
    },
    {
      id: "user-002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "USER",
      status: "ACTIVE",
      lastActive: "1 hour ago",
      createdAt: "Mar 2, 2025",
    },
    {
      id: "user-003",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "ANALYST",
      status: "ACTIVE",
      lastActive: "3 hours ago",
      createdAt: "Mar 3, 2025",
    },
    {
      id: "user-004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "USER",
      status: "INACTIVE",
      lastActive: "2 days ago",
      createdAt: "Mar 4, 2025",
    },
    {
      id: "user-005",
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      role: "ANALYST",
      status: "ACTIVE",
      lastActive: "Just now",
      createdAt: "Mar 5, 2025",
    },
    {
      id: "user-006",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      role: "USER",
      status: "PENDING",
      lastActive: "Never",
      createdAt: "Mar 6, 2025",
    },
  ]

  // Role badge colors
  const roleColors = {
    ADMIN: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    USER: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    ANALYST: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  }

  // Status badge colors
  const statusColors = {
    ACTIVE: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    INACTIVE: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    PENDING: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage system users and their permissions</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="pl-8 w-full" />
        </div>

        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>System Users</CardTitle>
          <CardDescription>Manage user accounts and access permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={roleColors[user.role as keyof typeof roleColors]}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[user.status as keyof typeof statusColors]}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Deactivate User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>Manage system roles and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="font-medium">Administrator</div>
                <div className="text-sm text-muted-foreground mt-1">Full system access with all permissions</div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    Edit Role
                  </Button>
                  <Button variant="outline" size="sm">
                    View Users
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="font-medium">Analyst</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Can view and analyze data, but cannot modify system settings
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    Edit Role
                  </Button>
                  <Button variant="outline" size="sm">
                    View Users
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="font-medium">User</div>
                <div className="text-sm text-muted-foreground mt-1">Basic access to view dashboards and reports</div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    Edit Role
                  </Button>
                  <Button variant="outline" size="sm">
                    View Users
                  </Button>
                </div>
              </div>

              <Button className="w-full flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Role
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Recent user activity in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">
                    Updated rule "High Value International Transaction"
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>MW</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Michael Wilson</div>
                  <div className="text-sm text-muted-foreground">Logged in to the system</div>
                  <div className="text-xs text-muted-foreground mt-1">10 minutes ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Jane Smith</div>
                  <div className="text-sm text-muted-foreground">Reviewed and approved alert #ALT-7291</div>
                  <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">Added new user "Sarah Brown"</div>
                  <div className="text-xs text-muted-foreground mt-1">3 hours ago</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>RJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Robert Johnson</div>
                  <div className="text-sm text-muted-foreground">Generated monthly fraud report</div>
                  <div className="text-xs text-muted-foreground mt-1">5 hours ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

