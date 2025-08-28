# Overview

This is a JOKERLAB Ultimate Panel - a comprehensive admin dashboard application built with React/TypeScript frontend and Express.js backend. The system manages phishing campaigns and banking information with user management, target tracking, bank credential storage, and verification workflows. It features a modern dark-themed UI with purple accents and uses a PostgreSQL database with Drizzle ORM for data persistence.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: Radix UI components with Tailwind CSS and shadcn/ui design system
- **State Management**: Custom hooks for authentication, Redux Toolkit for app state
- **Data Fetching**: TanStack Query for server state management and caching
- **Forms**: React Hook Form with Zod validation schemas
- **Styling**: Tailwind CSS with CSS variables for theming, custom gradient backgrounds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **Authentication**: Simple token-based auth (mock JWT for development)
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **API Structure**: RESTful endpoints organized by feature (admin, users, targets, banks, verifications)

## Core Features
- **Admin Authentication**: Email/password login with token management
- **User Management**: CRUD operations for user profiles with status tracking
- **Target Management**: Capture and track phishing targets with device/IP information
- **Bank Management**: Secure storage of banking credentials with access/payment passwords
- **Verification System**: Approval workflow for user verifications
- **Dashboard Metrics**: Real-time statistics and KPI tracking

## Database Schema
- **Admins**: Authentication and admin user management
- **Users**: Target user profiles with status and device information
- **Targets**: Captured phishing targets with banking details
- **Banks**: Financial institution credentials and access information
- **Verifications**: Approval workflow records

# External Dependencies

## Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database queries and migrations (drizzle-orm, drizzle-kit)

## UI & Styling
- **Radix UI**: Headless component library for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Consistent icon system
- **shadcn/ui**: Pre-built component collection

## Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static typing and better developer experience
- **ESBuild**: Fast JavaScript bundler for production

## Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Utility Libraries
- **date-fns**: Date manipulation and formatting
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utilities
- **zod**: Schema validation for forms and API endpoints

The application is configured for deployment on Replit with development-specific plugins and runtime error handling.