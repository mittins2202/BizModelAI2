# Business Path Quiz Application

## Overview

This is a full-stack web application that helps entrepreneurs discover their ideal business path through a comprehensive personality and preference quiz. The application features an AI-powered analysis system that provides personalized business recommendations based on user responses.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared components:

- **Frontend**: React with TypeScript, using Vite for build tooling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: OpenAI API for personalized insights

## Key Components

### Frontend Architecture
- **React SPA**: Built with TypeScript and modern React patterns
- **State Management**: Context API for authentication and paywall state
- **Routing**: React Router for client-side navigation
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions and interactions
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Express Server**: RESTful API with middleware for logging and error handling
- **Storage Layer**: Abstract storage interface with both memory and database implementations
- **Development Tools**: Vite integration for hot reloading in development
- **Session Management**: Express sessions with PostgreSQL store

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Drizzle ORM**: Type-safe database operations with automatic migrations
- **PostgreSQL**: Production database with Neon serverless integration

### AI-Powered Analysis
- **OpenAI Integration**: GPT-based personalized business insights
- **Fallback System**: Mock data when API is unavailable
- **Analysis Types**: Summary, recommendations, challenges, strategies, and action plans

## Data Flow

1. **Quiz Flow**: Users complete a multi-step quiz collecting preferences and personality traits
2. **Scoring Algorithm**: Custom logic calculates fit scores for different business models
3. **AI Enhancement**: OpenAI API generates personalized insights and recommendations
4. **Results Display**: Interactive cards show top business matches with detailed analysis
5. **Paywall Integration**: Premium content locked behind email capture and payment

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **framer-motion**: Animation library
- **react-router-dom**: Client-side routing

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling
- **ESBuild**: Fast JavaScript bundler for production

### AI Services
- **OpenAI API**: Personalized business analysis (optional)
- **Fallback system**: Works without API key using mock data

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with hot reloading
- **Database**: Local PostgreSQL or Neon development database
- **Environment Variables**: `.env` file for API keys and database URLs

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: ESBuild bundles Node.js server
- **Database**: Drizzle migrations applied automatically
- **Deployment**: Single command deployment with build artifacts

### Environment Configuration
- **NODE_ENV**: Development/production mode switching
- **DATABASE_URL**: PostgreSQL connection string
- **VITE_OPENAI_API_KEY**: Optional OpenAI API integration

## Changelog

- July 07, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.