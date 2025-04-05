"use client"

import { useState, useEffect } from "react"
import { Bell, Menu, Moon, Search, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { UserNav } from "@/components/user-nav"

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  // Check system preference on mount
  useEffect(() => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    if (isDark) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  return (
    <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="relative max-w-md w-full hidden md:flex">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search transactions, users, or alerts..." className="pl-8 w-full" />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Notifications</div>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <div className="font-medium">New high-risk transaction detected</div>
                <div className="text-sm text-muted-foreground">Transaction #8294 flagged for manual review</div>
                <div className="text-xs text-muted-foreground">2 minutes ago</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <div className="font-medium">Unusual activity pattern detected</div>
                <div className="text-sm text-muted-foreground">Multiple transactions from unusual location</div>
                <div className="text-xs text-muted-foreground">15 minutes ago</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <div className="font-medium">System update completed</div>
                <div className="text-sm text-muted-foreground">Fraud detection algorithms updated to v2.4</div>
                <div className="text-xs text-muted-foreground">1 hour ago</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <UserNav />
      </div>
    </header>
  )
}

