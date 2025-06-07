# Practical 1: TikTok Clone – Reflection Report

## Documentation Overview

This practical involved creating a TikTok-style video-sharing interface using modern web development tools. The primary focus was on implementing a clean architecture with Next.js App Router, responsive layout design using Tailwind CSS, and user interaction through forms and navigation.

---

## ⚙️ Core Implementation Concepts

### 1. App Routing with Next.js (App Router)

I used the latest **App Router architecture** introduced in Next.js:
- **Page Creation**: Each page was defined in a folder with its `page.jsx` for route-based rendering.
- **Persistent Layouts**: A shared layout component (`layout.js`) enabled consistent headers/sidebars.
- **Hybrid Rendering**: Combined client and server components where appropriate for better performance.

---

### 2. Modular React Components

The structure was split into modular React components to support reuse and scalability:
- `MainLayout.jsx` handled global structure and navigation.
- `VideoCard.jsx` and `VideoFeed.jsx` managed video rendering logic.
- Pages like `login`, `signup`, and `upload` were organized as independent route-based components.

---

### 3. Form Handling with React Hook Form

For form validation and submission:
- Fields were registered with `register()` to monitor input state.
- Submission logic used `handleSubmit()` for synchronous validation.
- Custom validation was added, like checking for password confirmation.
- Loading states and dynamic error messages were displayed during submission.

---

### 4. Tailwind CSS for Styling

Tailwind CSS made the UI:
- **Mobile-first**: Using responsive breakpoints like `sm`, `md`, and `lg`.
- **Highly Customizable**: Enabled quick visual iterations with utility classes.
- **Consistent**: Used common styling patterns across components.
- **Interactive**: Applied transitions and states (hover, focus) to enhance UX.

---

### 5. State and Navigation Handling

- **State Hooks**: Used `useState` for controlling UI and form behavior.
- **Navigation**: Leveraged `usePathname()` and `<Link>` for client-side navigation.
- **Dynamic Highlighting**: Active route was visually marked for UX consistency.

---

##   Reflection

###  Key Learnings

#### Next.js + App Router
- The App Router system simplifies route and layout management.
- Server-client component separation enhances performance without compromising interactivity.

#### React Hook Form
- Introduced to declarative, scalable form management.
- Gained hands-on experience with real-time validations, error messaging, and regex.

#### Tailwind CSS
- Internalized mobile-first design thinking.
- Learned how to balance utility classes with component readability.

#### Component Architecture
- Emphasized reusable UI with small, testable components.
- Discovered best practices for data flow using props and hooks.

---

###  Challenges and Resolutions

#### 1. Complex Form Validations

**Issue**: Implementing a form with cross-field checks (e.g., password matching).

**Solution**:
- Used `validate` within the field registration.
- Applied regex for structured email inputs.
  
```js
confirmPassword: {
  required: "Confirm your password",
  validate: (val) => val === password || "Passwords don't match",
}
```
### 2. Responsive UI Breakpoints
Issue: Difficulty maintaining consistent layout on both desktop and mobile.

### Solution:

- Employed flex, grid, and conditional rendering.

- Designed components to collapse or adapt at defined breakpoints.

### 3. Managing Form and UI State
Issue: Synchronizing UI behavior like loading indicators and form resets.

### Solution:

- Utilized useState for controlling submission state.

- Used reset() from React Hook Form after successful form submission.

### 4. Navigation Behavior and Active Link Styling
Issue: Understanding dynamic link behavior with App Router.

### Solution:

- Used usePathname() to compare current path.

- Applied conditional classes to highlight active route dynamically.
```
const isActive = pathname === href;
className={`${isActive ? 'text-red-500 bg-gray-100' : 'text-gray-700'}`}
```
### 5. File & Component Structure
Issue: Project became harder to navigate as components increased.

### Solution:

-Introduced dedicated folders for layout, UI, and page-level logic.

- Grouped related files and maintained naming conventions for clarity.

### Final Takeaway
This practical served as a complete walkthrough of building a full-stack, responsive React-based web application. I learned how to:

- Combine UI libraries and frameworks effectively,

- Manage user input and feedback gracefully,

- Keep code maintainable with modular architecture,

- And deploy responsive design principles efficiently.

Overall, this exercise strengthened both my frontend development skills and confidence in using production-grade tools like Next.js, Tailwind, and React Hook Form.