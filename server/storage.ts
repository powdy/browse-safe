import { scans, reports, users, type User, type InsertUser, type Scan, type InsertScan, type Report, type InsertReport } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Extend the storage interface with CRUD methods for all entities
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Scan methods
  getScan(id: number): Promise<Scan | undefined>;
  getScanByUrl(url: string): Promise<Scan | undefined>;
  createScan(scan: InsertScan): Promise<Scan>;
  updateScan(id: number, scan: Partial<InsertScan>): Promise<Scan | undefined>;
  getRecentScans(limit: number): Promise<Scan[]>;
  
  // Report methods
  getReport(id: number): Promise<Report | undefined>;
  createReport(report: InsertReport): Promise<Report>;
  getReportsByUrl(url: string): Promise<Report[]>;
  updateReport(id: number, status: string): Promise<Report | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scansMap: Map<number, Scan>;
  private reportsMap: Map<number, Report>;
  userCurrentId: number;
  scanCurrentId: number;
  reportCurrentId: number;

  constructor() {
    this.users = new Map();
    this.scansMap = new Map();
    this.reportsMap = new Map();
    this.userCurrentId = 1;
    this.scanCurrentId = 1;
    this.reportCurrentId = 1;

    // Initialize with a few sample scans
    const now = new Date();
    
    this.createScan({
      url: "amazon.com",
      trustScore: 98,
      domainAge: "27 years, 5 months",
      registrationDate: "1995-05-15",
      expirationDate: "2028-05-15",
      registrar: "Amazon Registrar, Inc.",
      registrantCountry: "United States",
      ipAddress: "176.32.103.205",
      ipLocation: "United States",
      nameServers: "ns1.amazon.com, ns2.amazon.com",
      hasValidSSL: true,
      hasDNSSEC: true,
      hasSecurityHeaders: true,
      hasMalware: false,
      hasPhishing: false,
      blacklistStatus: "Not blacklisted",
      suspiciousPatterns: "None",
      userReports: 0,
      relatedSites: 0,
      lastScanned: now,
      status: "safe",
      details: {}
    });
    
    this.createScan({
      url: "paypal-secure-login.com",
      trustScore: 12,
      domainAge: "2 days",
      registrationDate: "2023-08-08",
      expirationDate: "2024-08-08",
      registrar: "NameCheap Inc.",
      registrantCountry: "Panama",
      ipAddress: "185.224.138.29",
      ipLocation: "Netherlands",
      nameServers: "ns1.namecheap.com, ns2.namecheap.com",
      hasValidSSL: false,
      hasDNSSEC: false,
      hasSecurityHeaders: false,
      hasMalware: true,
      hasPhishing: true,
      blacklistStatus: "Blacklisted on 12 services",
      suspiciousPatterns: "Brand impersonation",
      userReports: 28,
      relatedSites: 5,
      lastScanned: now,
      status: "dangerous",
      details: {}
    });
    
    this.createScan({
      url: "ebay.com",
      trustScore: 96,
      domainAge: "25 years, 8 months",
      registrationDate: "1995-09-12",
      expirationDate: "2026-09-12",
      registrar: "CSC Corporate Domains, Inc.",
      registrantCountry: "United States",
      ipAddress: "66.135.202.236",
      ipLocation: "United States",
      nameServers: "ns1.ebay.com, ns2.ebay.com",
      hasValidSSL: true,
      hasDNSSEC: true,
      hasSecurityHeaders: true,
      hasMalware: false,
      hasPhishing: false,
      blacklistStatus: "Not blacklisted",
      suspiciousPatterns: "None",
      userReports: 0,
      relatedSites: 0,
      lastScanned: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      status: "safe",
      details: {}
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Scan methods
  async getScan(id: number): Promise<Scan | undefined> {
    return this.scansMap.get(id);
  }

  async getScanByUrl(url: string): Promise<Scan | undefined> {
    // Normalize URL by removing protocol and www
    const normalizedUrl = url.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '');
    
    return Array.from(this.scansMap.values()).find(
      (scan) => scan.url.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '') === normalizedUrl
    );
  }

  async createScan(insertScan: InsertScan): Promise<Scan> {
    const id = this.scanCurrentId++;
    const scan: Scan = { ...insertScan, id };
    this.scansMap.set(id, scan);
    return scan;
  }

  async updateScan(id: number, scanUpdate: Partial<InsertScan>): Promise<Scan | undefined> {
    const existingScan = this.scansMap.get(id);
    if (!existingScan) return undefined;

    const updatedScan = { ...existingScan, ...scanUpdate };
    this.scansMap.set(id, updatedScan);
    return updatedScan;
  }

  async getRecentScans(limit: number): Promise<Scan[]> {
    return Array.from(this.scansMap.values())
      .sort((a, b) => new Date(b.lastScanned).getTime() - new Date(a.lastScanned).getTime())
      .slice(0, limit);
  }

  // Report methods
  async getReport(id: number): Promise<Report | undefined> {
    return this.reportsMap.get(id);
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const id = this.reportCurrentId++;
    const report: Report = { ...insertReport, id };
    this.reportsMap.set(id, report);
    return report;
  }

  async getReportsByUrl(url: string): Promise<Report[]> {
    // Normalize URL by removing protocol and www
    const normalizedUrl = url.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '');
    
    return Array.from(this.reportsMap.values()).filter(
      (report) => report.url.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '') === normalizedUrl
    );
  }

  async updateReport(id: number, status: string): Promise<Report | undefined> {
    const existingReport = this.reportsMap.get(id);
    if (!existingReport) return undefined;

    const updatedReport = { ...existingReport, status };
    this.reportsMap.set(id, updatedReport);
    return updatedReport;
  }
}

// Database implementation of the storage interface
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Scan methods
  async getScan(id: number): Promise<Scan | undefined> {
    const [scan] = await db.select().from(scans).where(eq(scans.id, id));
    return scan || undefined;
  }

  async getScanByUrl(url: string): Promise<Scan | undefined> {
    // Normalize URL by removing protocol and www
    const normalizedUrl = url.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '');
    
    const results = await db.select().from(scans);
    return results.find(
      (scan) => scan.url.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '') === normalizedUrl
    );
  }

  async createScan(insertScan: InsertScan): Promise<Scan> {
    const [scan] = await db
      .insert(scans)
      .values(insertScan)
      .returning();
    return scan;
  }

  async updateScan(id: number, scanUpdate: Partial<InsertScan>): Promise<Scan | undefined> {
    const [updatedScan] = await db
      .update(scans)
      .set(scanUpdate)
      .where(eq(scans.id, id))
      .returning();
    return updatedScan || undefined;
  }

  async getRecentScans(limit: number): Promise<Scan[]> {
    return db
      .select()
      .from(scans)
      .orderBy(desc(scans.lastScanned))
      .limit(limit);
  }

  // Report methods
  async getReport(id: number): Promise<Report | undefined> {
    const [report] = await db.select().from(reports).where(eq(reports.id, id));
    return report || undefined;
  }

  async createReport(insertReport: InsertReport): Promise<Report> {
    const [report] = await db
      .insert(reports)
      .values(insertReport)
      .returning();
    return report;
  }

  async getReportsByUrl(url: string): Promise<Report[]> {
    // Normalize URL by removing protocol and www
    const normalizedUrl = url.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '');
    
    const results = await db.select().from(reports);
    return results.filter(
      (report) => report.url.toLowerCase()
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '') === normalizedUrl
    );
  }

  async updateReport(id: number, status: string): Promise<Report | undefined> {
    const [updatedReport] = await db
      .update(reports)
      .set({ status })
      .where(eq(reports.id, id))
      .returning();
    return updatedReport || undefined;
  }
}

// Initialize the database storage
export const storage = new DatabaseStorage();

// Seed initial data
async function seedDatabase() {
  try {
    // Check if we already have data
    const existingScans = await storage.getRecentScans(1);
    if (existingScans.length > 0) {
      console.log("Database already has data, skipping seed");
      return;
    }

    const now = new Date();
    
    // Add sample website scans
    await storage.createScan({
      url: "amazon.com",
      trustScore: 98,
      domainAge: "27 years, 5 months",
      registrationDate: "1995-05-15",
      expirationDate: "2028-05-15",
      registrar: "Amazon Registrar, Inc.",
      registrantCountry: "United States",
      ipAddress: "176.32.103.205",
      ipLocation: "United States",
      nameServers: "ns1.amazon.com, ns2.amazon.com",
      hasValidSSL: true,
      hasDNSSEC: true,
      hasSecurityHeaders: true,
      hasMalware: false,
      hasPhishing: false,
      blacklistStatus: "Not blacklisted",
      suspiciousPatterns: "None",
      userReports: 0,
      relatedSites: 0,
      lastScanned: now,
      status: "safe",
      details: {}
    });
    
    await storage.createScan({
      url: "paypal-secure-login.com",
      trustScore: 12,
      domainAge: "2 days",
      registrationDate: "2023-08-08",
      expirationDate: "2024-08-08",
      registrar: "NameCheap Inc.",
      registrantCountry: "Panama",
      ipAddress: "185.224.138.29",
      ipLocation: "Netherlands",
      nameServers: "ns1.namecheap.com, ns2.namecheap.com",
      hasValidSSL: false,
      hasDNSSEC: false,
      hasSecurityHeaders: false,
      hasMalware: true,
      hasPhishing: true,
      blacklistStatus: "Blacklisted on 12 services",
      suspiciousPatterns: "Brand impersonation",
      userReports: 28,
      relatedSites: 5,
      lastScanned: now,
      status: "dangerous",
      details: {}
    });
    
    await storage.createScan({
      url: "ebay.com",
      trustScore: 96,
      domainAge: "25 years, 8 months",
      registrationDate: "1995-09-12",
      expirationDate: "2026-09-12",
      registrar: "CSC Corporate Domains, Inc.",
      registrantCountry: "United States",
      ipAddress: "66.135.202.236",
      ipLocation: "United States",
      nameServers: "ns1.ebay.com, ns2.ebay.com",
      hasValidSSL: true,
      hasDNSSEC: true,
      hasSecurityHeaders: true,
      hasMalware: false,
      hasPhishing: false,
      blacklistStatus: "Not blacklisted",
      suspiciousPatterns: "None",
      userReports: 0,
      relatedSites: 0,
      lastScanned: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      status: "safe",
      details: {}
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Execute seed function
seedDatabase();
