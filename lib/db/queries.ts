"use server"
import { db } from "./index"
import { events, invitees, rsvps, admins } from "./schema"
import { eq } from "drizzle-orm"

// Event queries
export async function getEventById(eventId: string) {
  const result = await db.select().from(events).where(eq(events.id, eventId)).limit(1)
  return result[0] || null
}

export async function getAllEvents() {
  return await db.select().from(events)
}

export async function createEvent(data: {
  name: string
  date: string
  time: string
  location: string
  description?: string
  logoUrl?: string
  primaryColor?: string
  secondaryColor?: string
}) {
  const result = await db
    .insert(events)
    .values({
      name: data.name,
      date: data.date,
      time: data.time,
      location: data.location,
      description: data.description,
      logoUrl: data.logoUrl,
      primaryColor: data.primaryColor || "#1a2f4a",
      secondaryColor: data.secondaryColor || "#22d3ee",
    })
    .returning()
  return result[0]
}

export async function updateEvent(eventId: string, data: any) {
  const updateData: any = {}

  if (data.name !== undefined) updateData.name = data.name
  if (data.date !== undefined) updateData.date = data.date
  if (data.time !== undefined) updateData.time = data.time
  if (data.location !== undefined) updateData.location = data.location
  if (data.description !== undefined) updateData.description = data.description
  if (data.logoUrl !== undefined) updateData.logoUrl = data.logoUrl
  if (data.primaryColor !== undefined) updateData.primaryColor = data.primaryColor
  if (data.secondaryColor !== undefined) updateData.secondaryColor = data.secondaryColor

  updateData.updatedAt = new Date()

  const result = await db.update(events).set(updateData).where(eq(events.id, eventId)).returning()
  return result[0]
}

export async function getFirstEvent() {
  const result = await db.select().from(events).limit(1)
  return result[0] || null
}

// Invitee queries
export async function getInviteeByToken(token: string) {
  const result = await db.select().from(invitees).where(eq(invitees.uniqueToken, token)).limit(1)
  return result[0] || null
}

export async function getInviteesByEventId(eventId: string) {
  return await db.select().from(invitees).where(eq(invitees.eventId, eventId))
}

export async function createInvitee(data: {
  eventId: string
  name: string
  email: string
  phone?: string
  uniqueToken: string
}) {
  const result = await db
    .insert(invitees)
    .values({
      eventId: data.eventId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      uniqueToken: data.uniqueToken,
    })
    .returning()
  return result[0]
}

export async function deleteInvitee(inviteeId: string) {
  await db.delete(invitees).where(eq(invitees.id, inviteeId))
}

export async function markInviteeAsInvited(inviteeId: string) {
  const result = await db.update(invitees).set({ invitedAt: new Date() }).where(eq(invitees.id, inviteeId)).returning()
  return result[0]
}

// RSVP queries
export async function getRsvpByInviteeId(inviteeId: string) {
  const result = await db.select().from(rsvps).where(eq(rsvps.inviteeId, inviteeId)).limit(1)
  return result[0] || null
}

export async function getRsvpsByEventId(eventId: string) {
  return await db.select().from(rsvps).where(eq(rsvps.eventId, eventId))
}

export async function createOrUpdateRsvp(data: {
  inviteeId: string
  eventId: string
  status: string
  guestsCount: number
  dietaryRestrictions?: string
  notes?: string
}) {
  // Check if RSVP already exists
  const existing = await getRsvpByInviteeId(data.inviteeId)

  if (existing) {
    const result = await db
      .update(rsvps)
      .set({
        status: data.status,
        guestsCount: data.guestsCount,
        dietaryRestrictions: data.dietaryRestrictions,
        notes: data.notes,
        respondedAt: new Date(),
      })
      .where(eq(rsvps.inviteeId, data.inviteeId))
      .returning()
    return result[0]
  } else {
    const result = await db
      .insert(rsvps)
      .values({
        inviteeId: data.inviteeId,
        eventId: data.eventId,
        status: data.status,
        guestsCount: data.guestsCount,
        dietaryRestrictions: data.dietaryRestrictions,
        notes: data.notes,
      })
      .returning()
    return result[0]
  }
}

// Admin queries
export async function getAdminByEmail(email: string) {
  const result = await db.select().from(admins).where(eq(admins.email, email)).limit(1)
  return result[0] || null
}

export async function createAdmin(data: { email: string; passwordHash: string }) {
  const result = await db
    .insert(admins)
    .values({
      email: data.email,
      passwordHash: data.passwordHash,
    })
    .returning()
  return result[0]
}

export async function getInviteDetailsByToken(token: string) {
  const result = await db
    .select({
      invitee: invitees,
      event: events,
      rsvp: rsvps,
    })
    .from(invitees)
    .leftJoin(events, eq(invitees.eventId, events.id))
    .leftJoin(rsvps, eq(rsvps.inviteeId, invitees.id))
    .where(eq(invitees.uniqueToken, token))
    .limit(1)

  if (result.length === 0) return null

  return {
    invitee: result[0].invitee,
    event: result[0].event,
    rsvp: result[0].rsvp,
  }
}
