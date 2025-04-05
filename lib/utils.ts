import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Mock data generation utilities
export function generateRandomAmount() {
  // Generate larger amounts for Indian context (in rupees)
  return Math.floor(Math.random() * 100000) / 100
}

export function generateRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // No decimal places for INR
  }).format(amount)
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// Risk score calculation (mock)
export function calculateRiskScore(transaction: any) {
  // In a real system, this would use ML models and various factors
  // This is just a simple mock implementation
  const factors = [
    transaction.amount > 50000 ? 30 : 0, // High amount in INR (>50,000)
    transaction.isInternational ? 20 : 0, // International transaction
    transaction.isNewMerchant ? 15 : 0, // New merchant
    transaction.isNewLocation ? 25 : 0, // New location
    Math.random() * 10, // Random factor
  ]

  const score = factors.reduce((sum, factor) => sum + factor, 0)
  return Math.min(Math.round(score), 100) // Cap at 100
}

