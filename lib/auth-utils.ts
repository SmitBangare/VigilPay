// Utility functions for authentication that can be used on both client and server

/**
 * Simple password validator
 * @param password The password to validate
 * @returns True if the password is valid
 */
export function validatePassword(password: string): boolean {
  return password.length >= 8
}

/**
 * Simple email validator
 * @param email The email to validate
 * @returns True if the email format is valid
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Helper to parse JWT tokens
 * @param token The JWT token to parse
 * @returns The decoded payload or null if invalid
 */
export function parseJwt(token: string): any {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString())
  } catch (e) {
    return null
  }
}

