#  Practical 4: Connecting TikTok Frontend to Server – Reflection Report

##  Key Concepts Applied

### 1. Full-Stack Integration
Connected a **Next.js frontend** to an **Express.js backend**, implementing full-stack functionality such as authentication, video feeds, and user interaction.

### 2. Authentication Architecture
- **JWT Tokens** for stateless authentication
- **React Context API** to manage global auth state
- **Token Storage & Interceptors** for secure API requests
- **Protected Routes** based on login status

### 3. API Client & Services
- Centralized **Axios** setup with interceptors
- **Service modules** for users and videos
- **Global error handling**
- Configured **environment variables** for API URLs

### 4. State Management
- **React Context** for global auth
- **Component-level state** for UI interactions
- Managed **loading, error, and success states**

### 5. Component Architecture
- **Reusable components**: Modal, Forms, VideoCards
- Clear **separation of concerns**
- Organized **props/state flow** between components

### 6. Social Media Features
- "For You" and "Following" feeds
- Like, comment, follow/unfollow
- **Real-time UI updates**
- File upload for videos/thumbnails with validation

---

##  What I Learned

### Technical Skills
- RESTful API integration and transformation
- JWT lifecycle and secure storage
- React Context & hooks for scalable state handling
- Full-stack communication and data flow

###  Conceptual Understanding
- Software architecture patterns (SOA, separation of concerns)
- UX principles (feedback, loading states, responsive design)
- Security practices (token safety, endpoint protection, data validation)

---

## Challenges & Solutions

### 1. CORS Issues
- **Problem**: Backend requests blocked by browser due to CORS.
- **Fix**: Configured CORS in Express with correct origins and headers.
- **Learning**: Proper CORS setup is vital in dev environments.

### 2. Auth State Persistence
- **Problem**: User got logged out on page refresh.
- **Fix**: Used `localStorage` and initialized auth context on app load.
- **Learning**: Persistent auth state requires sync between storage and context.

### 3. Error Handling
- **Problem**: Inconsistent and unclear error messages.
- **Fix**: Added global Axios error interceptor + `react-hot-toast` for UX.
- **Learning**: Unified error strategy improves app reliability.

### 4. Complex Component State
- **Problem**: Props drilling and state sync issues.
- **Fix**: Refactored to use Context + custom hooks for shared logic.
- **Learning**: Good state architecture makes code cleaner and scalable.

### 5. File Upload Difficulties
- **Problem**: Upload failed due to size/format errors.
- **Fix**: Added validation for file type, size, and proper error messages.
- **Learning**: File uploads need user feedback, client checks, and backend support.

---

## Conclusion

This practical enhanced my confidence in building **secure, scalable, and interactive full-stack applications**. I learned to:
- Design reusable components and services
- Handle real-world issues like CORS, token management, and file uploads
- Architect a responsive and interactive frontend powered by a robust backend

 The project simulated real-world engineering tasks — building features, solving bugs, managing state, and maintaining user experience.
