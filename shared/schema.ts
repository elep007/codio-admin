import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const admins = pgTable("admins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username"),
  email: text("email"),
  phone: text("phone"),
  birthday: text("birthday"),
  photo: text("photo"),
  bankId: varchar("bank_id"),
  ipAddress: text("ip_address"),
  device: text("device"),
  status: text("status").default("active"),
  statusDescription: text("status_description"),
  memberSince: text("member_since"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const targets = pgTable("targets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name"),
  cpf: text("cpf"),
  bankId: varchar("bank_id"),
  bankDetails: text("bank_details"),
  phone: text("phone"),
  device: text("device"),
  ipAddress: text("ip_address"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const banks = pgTable("banks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  accessPassword: text("access_password"),
  paymentPassword: text("payment_password"),
  icon: text("icon"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const verifications = pgTable("verifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  name: text("name"),
  photo: text("photo"),
  document: text("document"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const insertAdminSchema = createInsertSchema(admins).pick({
  email: true,
  password: true,
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertTargetSchema = createInsertSchema(targets).omit({
  id: true,
  createdAt: true,
});

export const insertBankSchema = createInsertSchema(banks).omit({
  id: true,
  createdAt: true,
});

export const insertVerificationSchema = createInsertSchema(verifications).omit({
  id: true,
  createdAt: true,
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Target = typeof targets.$inferSelect;
export type InsertTarget = z.infer<typeof insertTargetSchema>;
export type Bank = typeof banks.$inferSelect;
export type InsertBank = z.infer<typeof insertBankSchema>;
export type Verification = typeof verifications.$inferSelect;
export type InsertVerification = z.infer<typeof insertVerificationSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
