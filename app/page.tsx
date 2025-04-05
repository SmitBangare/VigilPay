import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { parseJwt } from "@/lib/auth-utils"

export default function Home() {
  // Get the auth token from cookies
  const authToken = cookies().get("auth-token")?.value
  
  // If no token or token is invalid, redirect to login
  if (!authToken) {
    redirect("/login")
  }
  
  try {
    // Validate token
    const payload = parseJwt(authToken)
    if (!payload || payload.exp < Math.floor(Date.now() / 1000)) {
      redirect("/login")
    }
    
    // If token is valid, redirect to dashboard
    redirect("/dashboard")
  } catch (error) {
    // If there's an error parsing the token, redirect to login
    redirect("/login")
  }
}

