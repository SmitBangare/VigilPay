import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth-actions"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error in user API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

