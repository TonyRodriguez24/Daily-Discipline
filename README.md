# Daily Discipline

**Deployed URL:** [https://daily-discipline.vercel.app](https://daily-discipline.vercel.app)

---

## Project Overview

Daily Discipline is a web application for tracking daily habits and routines. Users can log workouts, sleep hours, GitHub commits, screen time, and weight. The app helps users monitor consistency and progress over time.

---

## Features

- **User Authentication:** Users can register and log in to securely save their data.
- **Daily Logs:** Users can submit daily metrics including workouts, sleep, screen time, GitHub commits, and weight.
- **History Page:** Users can view past logs to track trends over time.
- **Custom API:** Backend provides endpoints for managing users and logs without using an ORM.

**Why these features:** Focused on simplicity and core habit tracking metrics that are most relevant for productivity and health.

---

## User Flow

1. Register or log in.
2. Go to the "Daily Log" page.
3. Fill in the form with daily metrics.
4. Submit the log.
5. Check your history to monitor progress.

---

## Technology Stack

- **Frontend:** Vite + React + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL (hosted on Supabase)
- **Deployment:** Vercel (frontend) & Render (backend)
- **Authentication:** JSON Web Tokens (JWT)

---

## API

### Endpoints:

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Log in and receive JWT
- `POST /logs` – Create a daily log
- `GET /logs` – Retrieve all daily logs for the user
- `GET /logs/:id` – Retrieve a single log
- `DELETE /logs/:id` – Delete a log

**Notes:**  
The backend is custom-built without an ORM. Database queries are written directly using `pg` to interact with PostgreSQL.

---

## Environment Variables

- `DATABASE_URL` – Supabase database connection string
- `SECRET_KEY` – JWT secret key
- `VITE_API_BASE_URL` – Frontend API base URL

---
