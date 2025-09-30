import { randomBytes } from "crypto"

export function generateUniqueToken(): string {
  return randomBytes(32).toString("hex")
}

export function generateShortToken(): string {
  // Generate a shorter, more user-friendly token (8 characters)
  return randomBytes(4).toString("hex")
}
