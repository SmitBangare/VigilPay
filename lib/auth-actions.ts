"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { sign } from "jsonwebtoken"

// Helper function to hash passwords using a simple but effective method
// In production, you should use a proper hashing library like bcrypt
function hashPassword(password: string): string {
  // Simple hashing function for demonstration
  // DO NOT use this in production - use bcrypt instead
  return Array.from(password)
    .reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0)
    .toString(16)
}

// Generate a JWT token (simplified version)
function generateToken(userId: string): string {
  // In a real app, use a proper JWT library with secret keys
  // This is a simplified example
  const header = {
    alg: "HS256",
    typ: "JWT",
  }

  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week
  }

  // In a real app, you would sign this token with a secret key
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64").replace(/=/g, "")
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64").replace(/=/g, "")

  // In a real app, you would compute a real signature
  // This is just for demonstration
  const signature = Buffer.from(`${encodedHeader}.${encodedPayload}`).toString("base64").replace(/=/g, "")

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

// Helper function to serialize MongoDB user document
function serializeUser(user: any) {
  if (!user) return null;
  
  // Convert MongoDB document to plain object
  const userObj = typeof user.toObject === 'function' 
    ? user.toObject() 
    : user;
    
  // Make sure _id is converted to id
  if (userObj._id) {
    userObj.id = userObj._id.toString();
    delete userObj._id;
  }
  
  return userObj;
}

// Login user
export async function loginUser(email: string, password: string) {
  try {
    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
    })

    const userObj = serializeUser(user);

    // Check if user exists and password is correct
    if (!userObj || userObj.password !== hashPassword(password)) {
      return { success: false, error: "Invalid email or password" }
    }

    // Generate token
    const token = generateToken(userObj.id)

    // Set cookie
    const cookieStore = cookies()
    await cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
      path: "/",
    })

    return { success: true, userId: userObj.id }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "An error occurred during login" }
  }
}

// Register user
export async function registerUser(name: string, email: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { success: false, error: "Email already in use" }
    }

    // Create new user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword(password),
        role: "USER", // Default role
      },
    })

    const userObj = serializeUser(user);

    // Generate token
    const token = generateToken(userObj.id)

    // Set cookie
    const cookieStore = cookies()
    await cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
      path: "/",
    })

    return { success: true, userId: userObj.id }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "An error occurred during registration" }
  }
}

// Logout user
export async function logoutUser() {
  await cookies().delete("auth-token")
  redirect("/login")
}

// Get current user
export async function getCurrentUser() {
  try {
    const token = (await cookies()).get("auth-token")?.value

    if (!token) {
      return null
    }

    // Validate the token format
    if (token.split(".").length !== 3) {
      await cookies().delete("auth-token")
      return null
    }

    // Decode token (simplified)
    const parts = token.split(".")
    const payload = JSON.parse(Buffer.from(parts[1], "base64").toString())

    // Check if token is expired
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      await cookies().delete("auth-token")
      return null
    }

    // Get user from database
    const user = await db.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return serializeUser(user);
  } catch (error) {
    console.error("Get current user error:", error)
    await cookies().delete("auth-token") // Clear invalid token
    return null
  }
}

