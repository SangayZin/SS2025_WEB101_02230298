# Practical 3: File Upload Implementation

## Overview
This project demonstrates a robust file upload system built with Next.js and React, featuring client-side and server-side validation, progress tracking, and an intuitive drag-and-drop interface.

## Key Features
- **Multipart Form Handling**: Efficient file processing using FormData
- **Comprehensive Validation**: Type and size validation (≤5MB) on both client and server
- **Progress Tracking**: Real-time upload progress visualization
- **Drag-and-Drop Interface**: User-friendly file selection
- **Multiple File Support**: Upload up to 10 files simultaneously
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS

## Technology Stack
- **Frontend**: Next.js, React Hook Form, React Dropzone
- **Backend**: Next.js API Routes, Formidable
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios


## Installation
1. Create a new Next.js project:
```bash
npx create-next-app file-upload
cd file-upload
```
 2.Install dependencies:
 ```bash
npm install react-hook-form formidable axios react-dropzone
(Optional) Install Tailwind CSS:
```

## Configuration
### File Validation
Configure allowed file types and size limits in both:

- pages/index.js (client-side)

- pages/api/upload.js (server-side)

### Upload Directory
Set the storage location in upload.js:
 ```bash
const uploadDir = path.join(process.cwd(), 'uploads');
 ```
 ## Implementation Details
### Client-Side Components
- Uses React Hook Form for form state management

- Implements React Dropzone for drag-and-drop functionality

- Includes progress bars using Axios interceptors

- Provides clear error messages for validation failures

## Usage Instructions
1. Run the development server:

```bash
npm run dev
```
2. Access the application at:
```bash
text
http://localhost:3000
```
3. Upload files by:

- Clicking to browse files

- Dragging files to the drop zone

- Monitoring upload progress
## Security Considerations
- File type whitelisting

- Size limit enforcement

- Server-side re-validation

- Secure file storage practices

- Proper error handling

## Deployment Notes
For production environments:

1. Configure environment variables in .env.local:
```bash
UPLOAD_DIR=/path/to/uploads
MAX_FILE_SIZE=5242880
```
2. Consider:

- Cloud storage integration

- User authentication

- Database for file metadata

- CDN for file distribution

### Troubleshooting
### Common Issues
- File Upload Fails: Check server logs and directory permissions

- Validation Errors: Verify allowed types in both client and server code

- Progress Not Updating: Ensure Axios interceptors are properly configured

## Debugging 
1. Enable detailed logging:
```bash
console.log('Upload progress:', progress);
```
2. Verify file permissions:

```bash
chmod -R 755 uploads/
```
## Future Enhancements
- Image preview generation

- File compression before upload

- Resumable uploads

- Cloud storage integration

- User authentication system

- Virus scanning capability