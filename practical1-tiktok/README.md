# Practical 1: Tiktok Clone

A social media-inspired video feed application developed using **Next.js**, **React**, and **Tailwind CSS**. This project showcases essential frontend development skills such as responsive layout design, modular component architecture, and client-side form handling.

## Features

* **Home Feed**: Scrollable TikTok-style video interface
* **Navigation Menu**: Includes pages like For You, Following, Explore, Live, and Profile
* **Auth Pages**: User login and registration functionality with validation
* **Video Upload**: Mock interface for uploading video content
* **Mobile-Friendly**: Optimized for both desktop and mobile devices

## Tech Stack

* **Next.js (v14+)**: Framework with App Router and built-in optimizations
* **React**: Component-driven architecture
* **Tailwind CSS**: CSS utility classes for rapid styling
* **React Hook Form**: Efficient form handling and validations
* **React Icons**: Icon set for UI consistency

## Getting Started

### Requirements

* Node.js >= 14
* npm or yarn
* Git installed

### 1. Clone the Repository

```bash
git clone https://github.com/02230298/SS2025_WEB101_02240365.git
cd practical1-tiktok
```

### 2. Create Next.js App

```bash
npx create-next-app@latest
```

When prompted, use these options:

* Use TypeScript: No
* Enable ESLint: Yes
* Enable Tailwind CSS: Yes
* Use `src/` directory: Yes
* Enable App Router: Yes
* Import alias: No

### 3. Install Required Packages

```bash
npm install react-icons react-hook-form
```

### 4. Set Up Folders

```bash
mkdir -p src/components/layout
mkdir -p src/components/ui
mkdir -p src/lib
mkdir -p src/app/{profile,upload,login,signup,following,explore,live}
```

### 5. Launch Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000` in your browser to see the application.



## Important Components

### MainLayout.jsx

Responsible for the application’s consistent layout:

* Sidebar for easy navigation
* Top bar with search and user interactions
* Mobile-responsive design

### VideoCard.jsx

Encapsulates a single video post:

* Placeholder video
* Author and video details
* Buttons for interactions (like, comment, share)

### VideoFeed.jsx

Displays a collection of `VideoCard` components:

* Scrollable vertical feed
* Responsive behavior

## User Authentication Forms

### Login Page (`/login`)

* Email/password fields with validation
* Error messaging and submission loading states

### Registration Page (`/signup`)

* Fields: email, password, confirm password, terms checkbox
* Validates input formats and matching passwords

### Common Validation Rules

* Mandatory fields
* Email format check using regex
* Minimum password length (8+ characters)
* Confirm password match
* Custom error messages

## Styling & Design

* Tailwind CSS for clean, responsive UI
* Support for hover/focus states
* Customizable theme colors
* Dark mode-ready components

## Navigation Breakdown

* **For You**: Default homepage feed
* **Following**: Videos by followed accounts
* **Explore**: Discovery page for trending content
* **Live**: Placeholder for live streams
* **Profile**: User’s personal dashboard

---

This project serves as an introductory full-stack prototype, integrating modern development tools for building scalable UI applications. Future improvements could include real video streaming, backend integration, and user session management.
