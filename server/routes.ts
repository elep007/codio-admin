import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema, insertUserSchema, insertBankSchema, insertVerificationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const admin = await storage.getAdminByEmail(email);
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      // In production, generate a proper JWT token
      const token = `mock-jwt-token-${admin.id}`;
      
      res.json({ 
        token, 
        admin: { 
          id: admin.id, 
          email: admin.email 
        } 
      });
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  // Dashboard metrics
  app.get("/api/dashboard/metrics", async (req, res) => {
    try {
      const metrics = await storage.getDashboardMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar métricas" });
    }
  });

  // Users management
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const userData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(req.params.id, userData);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteUser(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir usuário" });
    }
  });

  // Targets management
  app.get("/api/targets", async (req, res) => {
    try {
      const targets = await storage.getAllTargets();
      res.json(targets);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar targets" });
    }
  });

  // Banks management
  app.get("/api/banks", async (req, res) => {
    try {
      const banks = await storage.getAllBanks();
      res.json(banks);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar bancos" });
    }
  });

  app.post("/api/banks", async (req, res) => {
    try {
      const bankData = insertBankSchema.parse(req.body);
      const bank = await storage.createBank(bankData);
      res.status(201).json(bank);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.put("/api/banks/:id", async (req, res) => {
    try {
      const bankData = insertBankSchema.partial().parse(req.body);
      const bank = await storage.updateBank(req.params.id, bankData);
      if (!bank) {
        return res.status(404).json({ message: "Banco não encontrado" });
      }
      res.json(bank);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  app.delete("/api/banks/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteBank(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Banco não encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erro ao excluir banco" });
    }
  });

  // Verifications management
  app.get("/api/verifications", async (req, res) => {
    try {
      const verifications = await storage.getAllVerifications();
      res.json(verifications);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar verificações" });
    }
  });

  app.put("/api/verifications/:id/status", async (req, res) => {
    try {
      const { status } = z.object({ status: z.string() }).parse(req.body);
      const verification = await storage.updateVerificationStatus(req.params.id, status);
      if (!verification) {
        return res.status(404).json({ message: "Verificação não encontrada" });
      }
      res.json(verification);
    } catch (error) {
      res.status(400).json({ message: "Dados inválidos" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
