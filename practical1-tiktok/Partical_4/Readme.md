#  Practical 4: Connecting TikTok Frontend to Backend

This practical explores how to connect a TikTok-style frontend built with **Next.js** to a backend powered by **Express.js**, focusing on core features like authentication, video handling, and social interactions.

---

##  Prerequisites

To complete this integration, the following are required:

- Node.js installed
- Functional **Next.js frontend** project
- Working **Express.js backend** with exposed APIs
- Familiarity with React, Axios, and JWT-based authentication

---

##  Installation

Install required frontend packages:

```bash
npm install axios jwt-decode react-hot-toast
```
Also, create an .env.local file in the root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## Integration Steps
### 1️. Setting Up API Communication
**File**: src/lib/api-config.js

- Created an Axios instance with a pre-configured base URL

- Attached request interceptors to include JWT in headers

- Globally handled API errors (e.g., 401 Unauthorized)

### 2️. Authentication Context
**File**: src/contexts/authContext.jsx

- Created a React context for managing user state across the app

- Functions for login, logout, and token decoding

- Handled persistence using localStorage

**Update**: Wrap the app with <AuthProvider /> in src/app/layout.js

### 3️. Authentication Components
**Files**:

- **src/components/auth/AuthForms.jsx**: Contains login and signup forms with validation

- **src/components/auth/AuthModal.jsx**: Combines modal and form

- **src/components/ui/Modal.jsx**: Reusable modal component for popups

### 4️.Layout Enhancements
**File** : src/components/layout/MainLayout.jsx

- Displayed login/logout buttons conditionally

- Protected navigation routes from unauthenticated access

- Used useContext(AuthContext) to track authentication status

### 5️.Video Services Layer
**File**: src/services/videoService.js

- Abstracted functions for:

- Fetching videos

- Liking/unliking

- Posting comments

- Ensured token was included in all video-related API calls

### 6️.User Services Layer
**File** : src/services/userService.js

- Managed:

   -  User discovery

    -   Follow/unfollow

    - Profile retrieval and update

### 7️. VideoCard Enhancements
**File**: src/components/ui/VideoCard.jsx

- Added real-time like/comment interactions

- Displayed uploader’s info and caption

- Included video controls for better UX

### 8️. Video Feed Display
**File**: src/components/ui/VideoFeed.jsx

- Fetched video list from the backend using videoService

- Differentiated between "Following" and "For You" feeds

- Included loading indicators and error messages

### 9️. Following Feed Page
**File**: src/app/following/page.jsx

- Rendered videos only from users the current user follows

- Displayed fallback UI if no follows exist

### 10. User Discovery Page
**File**: src/app/explore-users/page.jsx

- Provided list of all users

- Enabled follow/unfollow directly from the page

- Added basic search functionality

1️1.  Dynamic User Profile Page
**File**: src/app/profile/[userId]/page.jsx

- Created a dynamic route based on user ID

- Displayed:

  - Uploaded videos

  - User statistics

  - Follow button

### 1️2.  Video Upload Functionality
**File**: src/app/upload/page.jsx

- Built a form to upload video files

- Included input fields for caption and thumbnail

- Added validations for supported file types and size

## Key Features
###  Authentication
- Login & signup using JWT

- Token persistence via localStorage

- Protected routes for logged-in users only

## Video System
- Uploading, liking, and commenting on videos

- Display of video feed

- Real-time interaction handling

## Social Features
- Follow/unfollow users

- Personalized feed (Following tab)

- Dynamic user profiles

## API Integration
- Axios instance with centralized config

- Request interceptors and global error handling

- Reusable service layers for cleaner code

## Testing Checklist
### Authentication
 - Register multiple accounts

 - Test login/logout flow

 - Ensure token is correctly stored and refreshed

## Video Upload & Display
 - Upload videos from different accounts

 - View uploaded videos with correct metadata

## Social Interactions
 - Follow and unfollow users

 - Verify Following feed changes accordingly

 - View accurate profile details

##  Comments & Likes
 - Like/unlike videos

 - Add and view comments in real-time

## Navigation
 - Access control for protected routes

 - Dynamic updates based on login state

 ## Troubleshooting

 | Issue               | Solution                                                |
| ------------------- | ------------------------------------------------------- |
| CORS Errors         | Ensure Express backend allows frontend origin           |
| JWT Expired/Invalid | Check localStorage and backend expiration logic         |
| File Upload Fails   | Verify accepted file types and size limits on both ends |
| API 404/500 Errors  | Double-check Axios URLs and backend routes              |


## Useful References
- Next.js Docs

- Axios GitHub

- React Hook Form

- JWT Authentication

- Express.js Guide

- Prisma ORM

 