# Debugging Reflection: Dockerized PostgreSQL Connection Failure

## Overview
This document reflects on a major debugging challenge encountered during the sprint while building a transparent intercity bus ticket cancellation and refund system using Next.js, PostgreSQL, Prisma, Redis, and Docker.

The issue blocked local containerized development and required investigation into Docker networking and environment configuration.

---

## 1. The Debugging Challenge

**Issue:**  
Prisma failed to connect to PostgreSQL when the application was run inside Docker containers.

**Impact:**  
The application crashed on startup, blocking further development and testing in a Dockerized environment.

This was not a simple syntax or typo issue — it required understanding how services communicate inside Docker.

---

## 2. Context and Symptoms

### What I was implementing
I was containerizing the full-stack Next.js application using Docker Compose, running:
- Next.js application
- PostgreSQL database
- Redis cache

The goal was to simulate a production-like environment locally.

---

### Where the issue appeared
- Environment: Local machine
- Setup: Docker containers
- Status: Application failed during startup

---

### Observed behavior

When running:
```bash
docker compose up --build
