import { pgTable, text, timestamp, integer, uuid } from "drizzle-orm/pg-core"

// Events table - stores graduation event details
export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  date: text("date").notNull(), // ISO date string
  time: text("time").notNull(),
  location: text("location").notNull(),
  description: text("description"),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color").default("#1a2f4a"),
  secondaryColor: text("secondary_color").default("#22d3ee"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Invitees table - stores guest information
export const invitees = pgTable("invitees", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventId: uuid("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  uniqueToken: text("unique_token").notNull().unique(),
  invitedAt: timestamp("invited_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// RSVPs table - stores guest responses
export const rsvps = pgTable("rsvps", {
  id: uuid("id").defaultRandom().primaryKey(),
  inviteeId: uuid("invitee_id")
    .references(() => invitees.id, { onDelete: "cascade" })
    .notNull(),
  eventId: uuid("event_id")
    .references(() => events.id, { onDelete: "cascade" })
    .notNull(),
  status: text("status").notNull(), // 'attending', 'not_attending', 'maybe'
  guestsCount: integer("guests_count").default(1).notNull(),
  dietaryRestrictions: text("dietary_restrictions"),
  notes: text("notes"),
  respondedAt: timestamp("responded_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Admins table - stores admin credentials
export const admins = pgTable("admins", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Relations are not required for basic queries to work
