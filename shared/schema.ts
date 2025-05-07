import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema remains as is
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Website scans schema
export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  trustScore: integer("trust_score").notNull(),
  domainAge: text("domain_age"),
  registrationDate: text("registration_date"),
  expirationDate: text("expiration_date"),
  registrar: text("registrar"),
  registrantCountry: text("registrant_country"),
  ipAddress: text("ip_address"),
  ipLocation: text("ip_location"),
  nameServers: text("name_servers"),
  hasValidSSL: boolean("has_valid_ssl"),
  hasDNSSEC: boolean("has_dnssec"),
  hasSecurityHeaders: boolean("has_security_headers"),
  hasMalware: boolean("has_malware"),
  hasPhishing: boolean("has_phishing"),
  blacklistStatus: text("blacklist_status"),
  suspiciousPatterns: text("suspicious_patterns"),
  userReports: integer("user_reports"),
  relatedSites: integer("related_sites"),
  lastScanned: timestamp("last_scanned").notNull(),
  status: text("status").notNull(), // "safe", "suspicious", "dangerous"
  details: jsonb("details"), // Additional details that don't fit in the schema
});

export const insertScanSchema = createInsertSchema(scans).omit({
  id: true,
});

export type InsertScan = z.infer<typeof insertScanSchema>;
export type Scan = typeof scans.$inferSelect;

// Reports schema for user-submitted website reports
export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  reason: text("reason").notNull(),
  details: text("details"),
  reportedAt: timestamp("reported_at").notNull(),
  reportedBy: text("reported_by"),
  status: text("status").notNull(), // "pending", "reviewed", "dismissed"
});

export const insertReportSchema = createInsertSchema(reports).omit({
  id: true,
});

export type InsertReport = z.infer<typeof insertReportSchema>;
export type Report = typeof reports.$inferSelect;
