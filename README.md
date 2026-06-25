# GoalOS 🚀

## Overview

GoalOS is an AI-powered Career Operating System designed to help students and professionals discover the right career paths, learn required skills, follow structured roadmaps, track progress, and make informed career decisions.

The goal of GoalOS is to eliminate information gaps, academic jealousy, lack of mentorship, and scattered career guidance by providing verified career roadmaps, community-driven insights, and personalized recommendations.

---

# Problem Statement

Many students and professionals struggle because they do not know:

* Which career domains exist
* Which skills are required
* What to learn first
* Where to learn from
* Which mistakes to avoid
* How to prepare for internships and jobs
* Which resources are trusted by professionals

Important career information is often hidden, scattered across multiple platforms, or shared only within limited circles.

GoalOS aims to solve this problem through structured guidance, community knowledge, and AI-powered recommendations.

---

# Current Status

### Backend

✅ FastAPI Backend Completed

✅ PostgreSQL Database Connected

✅ SQLAlchemy Integration

✅ JWT Authentication Implemented

✅ Modular Router Architecture

✅ User Registration API

✅ User Login API

✅ Goals API

✅ Roadmap API

✅ Skills API

✅ Progress Tracking API

---

### Frontend

✅ Next.js Frontend Setup

✅ TypeScript Configuration

✅ Tailwind CSS Integration

✅ Landing Page

✅ Login Page

✅ Dashboard Page

✅ Frontend Connected to FastAPI Backend

✅ JWT Authentication Flow Working

---

# Features

## Career Roadmaps

* Step-by-step learning paths
* Domain-specific guidance
* Structured career progression
* Career milestone tracking

## Skills Mapping

* Skills linked to career goals
* Importance levels for each skill
* Learning sequence recommendations
* Skill dependency tracking

## User Progress Tracking

* Mark roadmap steps as completed
* Track overall progress percentage
* Visual growth tracking
* Learning journey management

## Authentication

* User Registration
* User Login
* JWT Token Authentication
* Secure User Sessions

## Dashboard

* Career Overview
* Progress Tracking
* Goal Management
* Personalized User Experience

---

# Community Driven Knowledge (Planned)

GoalOS aims to build a community knowledge network where experienced professionals and students can contribute:

* Career reviews
* Real-world experiences
* Common mistakes to avoid
* Recommended learning paths
* Internship guidance
* Placement preparation tips

Contributors will earn reputation and credibility through valuable contributions.

---

# AI Career Counselor (Planned)

GoalOS will provide:

* Personalized career guidance
* Domain recommendations
* Learning plans
* Skill gap analysis
* Career readiness assessment
* Resource recommendations

---

# Tech Stack

## Backend

* FastAPI
* Python
* PostgreSQL
* SQLAlchemy
* JWT Authentication
* Passlib (bcrypt)

## Frontend

* Next.js 16
* React
* TypeScript
* Tailwind CSS

## Version Control

* Git
* GitHub

---

# Architecture

Frontend (Next.js)

↓

JWT Authentication

↓

FastAPI Backend

↓

PostgreSQL Database

---

# Project Structure

```text
backend/
├── routers/
│   ├── auth.py
│   ├── goals.py
│   └── progress.py
│
├── schemas/
│   └── user.py
│
├── database.py
└── main.py

goalos-frontend/
├── src/
│   └── app/
│       ├── login/
│       ├── dashboard/
│       └── page.tsx
```

# Database Tables

* users
* goals
* skills
* goal_skills
* roadmap_nodes
* user_goals
* user_progress

---

# API Endpoints

## General

* GET /
* GET /goals
* GET /roadmap/{goal_id}
* GET /skills/{goal_id}

## Authentication

* POST /register
* POST /login

## User Goals

* POST /user-goal

## Progress Tracking

* POST /progress
* GET /progress/{user_id}

---

# Future Roadmap

## Phase 1

* Complete Backend APIs
* JWT Protected Routes
* Better Error Handling
* User Profile Management

## Phase 2

* Advanced Dashboard
* Career Goal Selection UI
* Roadmap Visualization
* Progress Analytics

## Phase 3

* AI Career Counselor
* Resource Recommendation Engine
* Personalized Learning Plans
* Skill Gap Analysis

## Phase 4

* Community Reviews
* Mentor Verification
* Reputation System
* Contributor Credits
* Resource Voting System

## Phase 5

* Internship Recommendation Engine
* Job Preparation Tracker
* Resume Analyzer
* Interview Preparation Assistant

---

# Vision

GoalOS aims to become a community-driven AI Career Operating System that provides verified career roadmaps, trusted recommendations, real-world experiences, and personalized guidance for every field and profession.

The long-term vision is to ensure that no student or professional is held back due to lack of guidance, information gaps, or limited access to mentorship.

---

# Author

**Vansh Soni**

B.Tech Computer Science with Data Science

JC Bose University of Science and Technology
