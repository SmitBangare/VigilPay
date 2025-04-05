"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertTriangle, BarChart3, Brain, CreditCard, Home, Settings, Shield, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: CreditCard,
    },
    {
      name: "Alerts",
      path: "/alerts",
      icon: AlertTriangle,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "ML Integration",
      path: "/ml-integration",
      icon: Brain,
    },
    {
      name: "Rules",
      path: "/rules",
      icon: Shield,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="hidden md:flex flex-col w-64 bg-card border-r h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="font-bold text-lg">FraudGuard</h1>
        </div>
      </div>
      <div className="flex flex-col gap-1 p-2">
        {routes.map((route) => (
          <Button
            key={route.path}
            variant={pathname === route.path ? "secondary" : "ghost"}
            className={cn("justify-start", pathname === route.path && "bg-secondary")}
            asChild
          >
            <Link href={route.path}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}

