# GoalOS 🚀

## Overview

GoalOS is an AI-powered career operating system designed to help students and professionals discover the right career paths, learn required skills, follow structured roadmaps, track progress, and make informed career decisions.

The goal of GoalOS is to eliminate information gaps, academic jealousy, and lack of guidance by providing verified career roadmaps, community-driven insights, and personalized recommendations.

---

## Problem Statement

Many students and professionals struggle because they do not know:

* Which career domains exist
* Which skills are required
* What to learn first
* Where to learn from
* Which mistakes to avoid
* How to prepare for internships and jobs
* Which resources are trusted by professionals

Important information is often hidden, scattered across platforms, or shared only within limited circles.

GoalOS aims to solve this problem through structured guidance and community knowledge.

---

## Features

### Career Roadmaps

* Step-by-step learning paths
* Skill progression tracking
* Domain-specific guidance

### Skills Mapping

* Skills linked to career goals
* Importance levels for each skill
* Learning sequence recommendations

### User Progress Tracking

* Mark roadmap steps as completed
* Track overall progress percentage
* Visual growth tracking

### Authentication

* User Registration
* User Login
* JWT Token Generation

### Community Driven Knowledge (Planned)

* Reviews from experienced professionals
* Recommended resources
* Common mistakes to avoid
* Real-world career experiences

### AI Career Counselor (Planned)

* Personalized career guidance
* Domain recommendations
* Learning plans
* Skill gap analysis

---

## Current Tech Stack

### Backend

* FastAPI
* Python

### Database

* PostgreSQL

### ORM / Database Access

* SQLAlchemy

### Authentication

* JWT
* Passlib (bcrypt)

### Version Control

* Git
* GitHub

---

## Database Tables

* users
* goals
* skills
* goal_skills
* roadmap_nodes
* user_goals
* user_progress

---

## API Endpoints

### General

GET /
GET /goals
GET /roadmap/{goal_id}
GET /skills/{goal_id}

### Authentication

POST /register
POST /login

### User Goals

POST /user-goal

### Progress Tracking

POST /progress
GET /progress/{user_id}

---

## Future Roadmap

### Phase 1

* Complete Backend APIs
* JWT Protected Routes
* Better Error Handling

### Phase 2

* Next.js Frontend
* Dashboard UI
* User Profiles

### Phase 3

* AI Career Counselor
* Resource Recommendation Engine
* Personalized Roadmaps

### Phase 4

* Community Reviews
* Mentor Verification
* Reputation System
* Contributor Credits

---

## Vision

GoalOS aims to become a community-driven AI career operating system that provides verified career roadmaps, trusted recommendations, real-world experiences, and personalized guidance for every field and profession.

---

## Author

Vansh Soni

B.Tech Computer Science with Data Science

JC Bose University of Science and Technology
