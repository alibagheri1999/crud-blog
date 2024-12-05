# Blog API

## Overview

The **Blog API** is a backend application built using **Node.js**, **TypeScript**, and **NestJS**, leveraging **Hexagonal Architecture** and **Domain-Driven Design (DDD)** principles. This application is designed to manage blog posts, featuring **PostgreSQL** for database management, **MinIO** for object storage, and **Firebase** for authentication. It uses **TypeORM** for database migrations and is fully containerized using **Docker Compose**.

---

## Features

- **Hexagonal Architecture & DDD**: Ensures separation of concerns and scalability.
- **User Authentication**: Secured with **Firebase Authentication**.
- **Blog Management**: Create, update, delete, and retrieve blog posts.
- **Database Management**: Powered by **PostgreSQL**, with migrations managed by **TypeORM**.
- **Object Storage**: Uses **MinIO** for file storage (e.g., images).
- **Containerized Deployment**: Simplified setup and deployment using **Docker Compose**.

---

## Architecture

### **Hexagonal Architecture**
- **Core Domain**: Contains business logic and domain entities.
- **Application Layer**: Coordinates domain operations and use cases.
- **Infrastructure Layer**: Implements external interfaces (e.g., database, storage).

### **Domain-Driven Design**
- Aggregates, entities, and value objects model the core domain.
- Clear separation between domain and infrastructure layers.

---

## Getting Started

### Prerequisites
- **Node.js**
- **Docker**
- **Docker Compose**
- **Firebase Project**

### Environment Variables

Use `.env` file in the project root

### Please fill with your data :
- **FIREBASE_PRIVATE_KEY_ID**
- **FIREBASE_CLIENT_ID**
- **FIREBASE_PROJECT_ID**
- **FIREBASE_PRIVATE_KEY**
---

## Installation

```bash
# Run containers
docker-compose up

# Install dependencies
npm install

# Start in development mode
npm run start:dev

# Build the project
npm run build

# Start in production mode
npm run start
```

---

## Project Structure

The project follows **Hexagonal Architecture** and **Domain-Driven Design (DDD)** principles for a clean and scalable codebase. Below is the directory structure:

```plaintext
src/
├── core/             # Core of project
├──├── application/   # Application layer for use cases
├──├── domain/        # Core domain entities and business logic
├── infrastructure/   # Infrastructure for persistence, storage, and integrations
├── interfaces/       # Interfaces for controllers and external APIs
├── migrations/       # Database migrations
├── shared/           # Shared utilities and constants

```
---
## Usage

### Endpoints

#### Authentication

| Method | Endpoint               | Description                                      | Authentication |
|--------|------------------------|--------------------------------------------------|----------------|
| POST   | `/auth/sign-in`        | User sign-in and use custom token to get idToken | No             |
| POST   | `/auth/generate-token` | Call this first to get custom token              | No             |

#### Blogs

| Method | Endpoint                  | Description                     | Authentication |
|--------|---------------------------|---------------------------------|----------------|
| GET    | `/blogs/:id`              | Get one blog                    | Yes            |
| GET    | `/blogs`                  | Get all blogs                   | Yes            |
| POST   | `/blogs`                  | Create a new blog post          | Yes            |
| PUT    | `/blogs/upload-image/:id` | Upload an image for a blog post | Yes            |
| PUT    | `/blogs/:id`              | Update a blog post              | Yes            |
| DELETE | `/blogs/:id`              | Delete a blog post              | Yes            |

---
## Challenges Faced

### Combining Hexagonal Architecture and Domain-Driven Design (DDD)
- Designing the system to balance simplicity with scalability was a challenge.
- Modularizing the code to keep the domain logic pure required careful planning.

### Firebase Authentication
- First-time implementation of Firebase for user authentication.
- Learning and integrating Firebase's admin SDK with the application.

### Containerized Infrastructure
- Setting up PostgreSQL, MinIO, and the application in a seamless way using Docker Compose.
