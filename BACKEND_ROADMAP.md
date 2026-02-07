# Backend Implementation Roadmap

## Overview
This document serves as a reminder for the upcoming transition from frontend mock logic to a real backend implementation.

## Scheduled Tasks
**Trigger:** Two prompts from now (User will give the "green light").

### 1. Database & API Setup
- [ ] Create a local database file (likely JSON or SQLite based on "database file" request, or a proper Supabase/Firebase setup if previously discussed, but user said "database file" specifically).
- [ ] Implement a real API layer to interact with this database.

### 2. Authentication Logic
- [ ] Replace `localStorage` mock tokens with real session management.
- [ ] Store User credentials (`user` / `user2026`) in the database.
- [ ] Store Admin credentials (`admin` / `admin2026`) in the database.
- [ ] Ensure `AuthService` makes real HTTP requests to the backend.

### 3. Product Data
- [ ] Ensure product data is also stored in and retrieved from the database file, not hardcoded in TS files.

## Status
- **Current State:** Frontend Mocks active.
- **Next Step:** Awaiting next prompt (non-green light).
- **Following Step:** "Green light" prompt to begin execution.
