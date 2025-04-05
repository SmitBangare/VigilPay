import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Credit Card Fraud Detection System",
  description: "Monitor and detect fraudulent credit card transactions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}



import './globals.css'