# 🚀 Modern Portfolio & Blog Application

A full-stack web application built with React, TypeScript, Vite, TanStack Router, and Supabase. Features include user authentication with email confirmation, profile management, blog posts, and a beautiful modern UI with glassmorphism design.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Database Setup](#-database-setup)
- [Authentication Flow](#-authentication-flow)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 Authentication & Authorization
- **Email/Password Authentication** with Supabase Auth
- **Email Verification Required** - Users must confirm their email before login
- **Protected Routes** - Secure pages accessible only to authenticated users
- **User Profiles** - Automatic profile creation on signup
- **Session Management** - Persistent login with automatic token refresh
- **Password Reset** - Secure password recovery flow
- **Google OAuth** (Optional) - Social login support

### 👤 User Management
- **Profile Dashboard** - View and edit user information
- **Avatar Upload** - Profile picture management with Supabase Storage
- **Bio & Social Links** - GitHub, LinkedIn, website integration
- **Activity Tracking** - View posts, views, and engagement metrics
- **Role-Based Access** - User and Admin roles

### 📝 Content Management
- **Blog Posts** - Create, edit, and delete blog articles
- **Rich Text Editor** - Format content with ease
- **Tags & Categories** - Organize content effectively
- **Draft/Published States** - Control post visibility
- **View Counter** - Track post engagement
- **Search Functionality** - Find content quickly

### 🎨 Design & UI
- **Modern Glassmorphism** - Beautiful transparent card designs
- **Dark Mode** - Eye-friendly dark theme
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Smooth Animations** - Floating orbs and transitions
- **Custom Components** - Reusable UI components
- **Gradient Effects** - Eye-catching visual elements

### 🛠️ Developer Features
- **TypeScript** - Full type safety
- **Hot Module Replacement** - Fast development
- **Code Splitting** - Optimized bundle sizes
- **Real-time Updates** - Live data with Supabase subscriptions
- **Debug Tools** - Built-in testing and debugging pages
- **Clean Architecture** - Organized file structure

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **TypeScript 5.0** - Type safety
- **Vite 5.0** - Build tool and dev server
- **TanStack Router 1.0** - Type-safe routing
- **CSS3** - Styling with custom properties

### Backend & Database
- **Supabase** - Backend as a Service
  - PostgreSQL Database
  - Authentication & Authorization
  - Storage (File uploads)
  - Real-time subscriptions
  - Row Level Security (RLS)

### Development Tools
- **ESLint** - Code linting
- **Prettier** (Optional) - Code formatting
- **Git** - Version control

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
  ```bash
  node --version  # Should be v16+
  ```

- **npm** or **yarn**
  ```bash
  npm --version   # v7+
  ```

- **Git**
  ```bash
  git --version
  ```

- **Supabase Account**
  - Sign up at [supabase.com](https://supabase.com)
  - Create a new project

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these values:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy **Project URL** and **anon/public key**

---

## 🗄️ Database Setup

### 1. Run SQL Schema

1. Go to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Click **"New query"**
4. Copy and paste the entire SQL schema from `database/schema.sql`
5. Click **"Run"** or press `Ctrl/Cmd + Enter`

This will create:
- ✅ `profiles` table - User profiles
- ✅ `posts` table - Blog posts
- ✅ `comments` table - Post comments
- ✅ `notifications` table - User notifications
- ✅ Storage buckets - For avatars and images
- ✅ RLS policies - Security rules
- ✅ Triggers - Auto-create profiles on signup

### 2. Verify Tables

Run this query to verify tables were created:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;
```

You should see:
- `profiles`
- `posts`
- `comments`
- `notifications`

### 3. Configure Storage Buckets

The SQL script automatically creates storage buckets. Verify in:
- **Storage** section of Supabase Dashboard
- Should see: `avatars` and `posts` buckets

### 4. Configure Redirect URLs

**IMPORTANT:** Add redirect URLs for email confirmation to work:

1. Go to **Authentication** → **URL Configuration**
2. Add the following to **"Redirect URLs"**:
   ```
   http://localhost:5173/auth/confirm-email
   http://localhost:5173/**
   ```
3. For production, also add:
   ```
   https://yourdomain.com/auth/confirm-email
   https://yourdomain.com/**
   ```
4. Click **Save**

### 5. Set Up Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the **"Confirm signup"** template
3. Ensure it includes `{{ .ConfirmationURL }}`

---

## 🔐 Authentication Flow

### ⚠️ IMPORTANT: Email Confirmation Required

**This application requires email confirmation for all new users. Users CANNOT login until they confirm their email address.**

### Complete Sign Up Process

**Step 1: Registration**
- User navigates to `/auth/register`
- Fills out registration form with:
  - Full Name
  - Email Address
  - Password (minimum 8 characters)
  - Password Confirmation
  - Agrees to terms and conditions
- Clicks "Create Account" button

**Step 2: Account Created (Cannot Login Yet)**
- Account is created in Supabase Authentication
- Profile is created in database
- User is NOT logged in at this point
- Email confirmation is required before login

**Step 3: Check Email Page**
- User is automatically redirected to `/auth/check-email`
- Page displays:
  - Confirmation that email was sent
  - The email address used
  - Instructions to check inbox
  - Option to resend confirmation email
  - Reminder to check spam folder

**Step 4: Confirmation Email Sent**
- Supabase sends confirmation email to user's inbox
- Email contains:
  - Welcome message
  - Confirmation link (expires in 24 hours)
  - Instructions
- **NOTE:** Email may arrive in spam folder - users should check there

**Step 5: User Clicks Confirmation Link**
- User opens email and clicks confirmation link
- Browser opens and navigates to `/auth/confirm-email`
- Application processes confirmation:
  - Extracts confirmation token from URL
  - Validates token with Supabase
  - Sets user session
  - Marks email as confirmed in database

**Step 6: Confirmation Success**
- User sees success message on `/auth/confirm-email` page
- User is automatically logged in
- After 2 seconds, automatically redirected to `/profile`
- Navigation bar updates to show:
  - "Profile" link
  - "Sign Out" button

**Step 7: Ready to Use**
- User can now access all features
- Profile is fully set up
- Can create posts, edit profile, upload avatar
- Session persists across page reloads

### Login Process

**Prerequisites:**
- ✅ User account must exist
- ✅ Email must be confirmed (received and clicked confirmation link)

**Login Steps:**

1. **Navigate to Login**
   - Go to `/auth/login`

2. **Enter Credentials**
   - Email address (must be confirmed)
   - Password

3. **Submit Form**
   - Click "Sign In" button
   - Supabase validates credentials

4. **Authentication Success**
   - User session created
   - Profile data loaded from database
   - Redirected to home page or profile

**If Email Not Confirmed:**
- ❌ Login will fail
- ⚠️ Error message: "Email not confirmed"
- 📧 User must check inbox and click confirmation link
- 🔄 Option to resend confirmation email

### Password Reset Flow

1. Click **"Forgot password?"** on login page
2. Enter email address
3. Receive password reset link via email
4. Click link in email
5. Enter new password
6. Password updated
7. Can login with new password

### Session Management

- **Session Duration:** 1 hour (automatically refreshed)
- **Auto Refresh:** JWT tokens refresh automatically before expiration
- **Persistent Login:** Session stored in localStorage
- **Secure Storage:** HttpOnly cookies for sensitive data
- **Cross-Tab Sync:** Login state synced across browser tabs

### Sign Out Process

1. Click "Sign Out" button in navigation
2. Session terminated on client and server
3. Tokens cleared from storage
4. Redirected to home page
5. Navigation updates to show "Login" and "Sign Up"

---

## 📁 Project Structure

```
├── public/                      # Static files
├── src/
│   ├── components/              # React components
│   │   ├── AuthProvider.tsx    # Authentication context
│   │   ├── ProtectedRoute.tsx  # Route protection
│   │   ├── UserProfile.tsx     # Profile component
│   │   ├── DatabaseTest.tsx    # DB connection test
│   │   ├── DebugPage.tsx       # Debug information
│   │   └── AuthTestPage.tsx    # Auth testing suite
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts          # Auth hook
│   │   └── useUserData.ts      # Data fetching hooks
│   │
│   ├── pages/                   # Route pages
│   │   ├── index.tsx           # Route configuration
│   │   ├── root.tsx            # Root layout
│   │   ├── home.tsx            # Home page
│   │   ├── about.tsx           # About page
│   │   ├── page1.tsx           # Services page
│   │   ├── page2.tsx           # Contact page
│   │   ├── login.tsx           # Login page
│   │   ├── register.tsx        # Registration page
│   │   ├── profile.tsx         # User profile page
│   │   ├── debug.tsx           # Debug page
│   │   ├── auth-test.tsx       # Auth test page
│   │   ├── blog/               # Blog pages
│   │   │   ├── index.tsx       # Blog list
│   │   │   └── article.tsx     # Article view
│   │   └── auth/               # Auth pages
│   │       ├── confirm-email.tsx   # Email confirmation handler
│   │       └── check-email.tsx     # Check email prompt page
│   │
│   ├── services/                # Service layer
│   │   ├── supabase.ts         # Supabase client configuration
│   │   ├── database.ts         # Database CRUD operations
│   │   └── api.ts              # API client for external services
│   │
│   ├── router.tsx               # Router configuration
│   ├── main.tsx                 # App entry point
│   └── index.css                # Global styles with CSS variables
│
├── database/
│   └── schema.sql               # Complete database schema
│
├── .env                         # Environment variables (create this)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
└── README.md                    # This documentation
```

---

## 📜 Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Server runs on http://localhost:5173
# Auto-opens browser
# Hot Module Replacement enabled
```

### Build

```bash
# Build for production
npm run build

# TypeScript compilation
# Vite optimization
# Output in /dist folder
# Minified and compressed
```

### Preview

```bash
# Preview production build locally
npm run preview

# Serves production build
# Tests build before deployment
# Runs on http://localhost:4173
```

### Type Check

```bash
# Run TypeScript type checking without build
npm run type-check

# Catches type errors
# No output files generated
# Fast checking
```

### Lint

```bash
# Lint code with ESLint
npm run lint

# Checks code quality
# Enforces style rules
# Reports errors and warnings
```

---

## 📖 Usage Guide

### First-Time Setup

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Visit the application**
   ```
   http://localhost:5173
   ```

3. **Verify database connection**
   - Look for "Database Status" box in bottom-right corner
   - Should display: "✅ Database connected successfully!"
   - Shows connection status, authenticated status, buckets info

4. **Run connection tests (Optional)**
   - Visit: `http://localhost:5173/auth-test`
   - Click "🧪 Run All Tests"
   - All tests should pass (green checkmarks)

### Creating Your First Account

**Step 1: Navigate to Registration Page**
```
http://localhost:5173/auth/register
```

**Step 2: Fill Registration Form**

Required fields:
- **Full Name:** Your name (e.g., "John Doe")
- **Email Address:** Valid email you can access (e.g., "john@example.com")
- **Password:** Minimum 8 characters
  - Should include: letters, numbers, special characters
  - Example: "MySecure123!"
- **Confirm Password:** Must match password exactly
- **Terms Agreement:** Check "I agree to the Terms of Service and Privacy Policy"

**Step 3: Submit Registration**
- Click "Create Account" button
- Wait for success message
- Should see: "Account created successfully! Please check your email."

**Step 4: Check Email Page**
- Automatically redirected to `/auth/check-email`
- Page shows:
  ```
  📧 Confirmation Email Sent
  We've sent a confirmation link to: your-email@example.com
  
  Next Steps:
  1. Check your email inbox (and spam folder)
  2. Click the confirmation link in the email
  3. You'll be redirected back and logged in automatically
  ```

**Step 5: Open Your Email**
- Open your email application
- Look for email from Supabase
- Subject: "Confirm your signup"
- **IMPORTANT:** Check spam/junk folder if not in inbox

**Step 6: Click Confirmation Link**
- Click the confirmation link in email
- Browser opens to: `http://localhost:5173/auth/confirm-email`
- Loading indicator appears
- Processing confirmation...

**Step 7: Confirmation Success**
- Success message appears:
  ```
  ✓ Success!
  Email confirmed successfully! Redirecting...
  ```
- After 2 seconds, automatically redirected to `/profile`
- You are now logged in!

**Step 8: Verify Login**
- Check navigation bar shows:
  - "Profile" link
  - "Sign Out" button
- No more "Login" or "Sign Up" buttons visible
- You can access all features

### Logging In (After Email Confirmation)

**Prerequisites:**
- ✅ Account created
- ✅ Email confirmed (clicked link in email)

**Step 1: Go to Login Page**
```
http://localhost:5173/auth/login
```

**Step 2: Enter Credentials**
- **Email:** The email you registered with
- **Password:** Your password

**Optional:**
- Check "Remember me" to stay logged in longer

**Step 3: Submit**
- Click "Sign In" button
- Authentication processed
- Profile loaded from database

**Step 4: Success**
- Redirected to home page or profile
- Navigation shows "Profile" and "Sign Out"
- Ready to use all features

**If Login Fails:**
- Check email is correct
- Check password is correct
- Verify email was confirmed (check inbox for confirmation email)
- Try password reset if forgotten

### Managing Your Profile

**Step 1: Navigate to Profile**
```
http://localhost:5173/profile
```

**Step 2: View Profile Information**

Profile displays:
- Profile banner with avatar
- User name and email
- Role badge (user/admin)
- Statistics:
  - Total Posts
  - Total Views
  - Member Since date

**Step 3: Edit Profile**
- Click "Edit Profile" button in banner
- Form appears with fields:
  - Name
  - Location
  - Bio (multiline text)
  - Website URL
  - GitHub URL
  - LinkedIn URL

**Step 4: Update Information**
- Fill in or modify fields
- All fields are optional except name
- URLs should include https://

**Step 5: Upload Avatar**
- Click camera icon on profile picture
- Select image file from computer
- Supported formats: JPG, PNG, GIF
- Maximum size: 5MB
- Image automatically uploaded to Supabase Storage
- Avatar updates immediately

**Step 6: Save Changes**
- Click "Save Changes" button
- Changes saved to database
- Success message appears
- Profile view updates automatically

**Step 7: Cancel (Optional)**
- Click "Cancel" to discard changes
- Returns to view mode without saving

### Managing Account Settings

**Tabs Available:**
1. **Overview** - Profile information
2. **Posts** - Your blog posts
3. **Settings** - Notifications and privacy
4. **Security** - Password and 2FA

**Settings Tab:**
- **Notifications:**
  - Email notifications
  - Push notifications
  - Marketing emails
- **Privacy:**
  - Make profile public
  - Show email to others

**Security Tab:**
- **Change Password:**
  - Enter current password
  - Enter new password
  - Confirm new password
  - Submit to update
- **Two-Factor Authentication:**
  - Enable 2FA for extra security
  - Use authenticator app

### Creating Blog Posts

**Step 1: Go to Posts Tab**
- Navigate to `/profile`
- Click "Posts" tab

**Step 2: Create New Post**
- Click "Create New Post" button
- Post editor opens

**Step 3: Fill Post Details**
- **Title:** Post headline (required)
- **Content:** Post body text (required)
- **Excerpt:** Short summary (optional)
- **Tags:** Comma-separated keywords
- **Published:** Toggle to publish/draft

**Step 4: Save Post**
- Click "Save" or "Publish"
- Post saved to database
- Appears in your posts list

**Step 5: Edit Post**
- Click "Edit" on any post
- Modify fields
- Save changes

**Step 6: Delete Post**
- Click "Delete" on post
- Confirm deletion
- Post removed from database

### Using Debug Tools

**Debug Page** (`/debug`):

Shows:
- Current user information
- Current profile data
- All users in database
- All profiles in database
- Manual profile creation option

Actions:
- Refresh data
- Create missing profile
- View detailed user info

**Auth Test Page** (`/auth-test`):

Features:
- Connection status cards
- Run comprehensive tests
- Test signup flow
- Test login flow
- View detailed results
- Sign out functionality

Run tests:
1. Visit `/auth-test`
2. Click "🧪 Run All Tests"
3. Review results
4. Check for any errors

### Signing Out

**Method 1: Navigation Bar**
- Click "Sign Out" button in navigation
- Logged out immediately
- Redirected to home page

**Method 2: Profile Page**
- Go to profile
- Click "Sign Out" button in banner
- Session terminated

**What Happens:**
- Session cleared from storage
- Tokens invalidated
- Profile data cleared
- Navigation updates
- Cannot access protected pages

---

## 🔌 API Documentation

### Authentication API

#### useAuth Hook

```typescript
import { useAuth } from '@/components/AuthProvider'

const {
  user,              // Current user object
  profile,           // User profile data
  session,           // Current session
  loading,           // Loading state
  isAuthenticated,   // Boolean - is user logged in
  isAdmin,           // Boolean - is user admin
  signIn,            // Function to login
  signUp,            // Function to register
  signOut,           // Function to logout
  updateProfile,     // Function to update profile
  refreshUser        // Function to reload user data
} = useAuth()
```

#### Sign Up

```typescript
const { signUp } = useAuth()

const result = await signUp(
  'user@example.com',     // email
  'SecurePassword123!',    // password
  { name: 'John Doe' }     // additional user data
)

// Returns:
// {
//   success: boolean,
//   message?: string,
//   user?: User,
//   session?: Session
// }
```

#### Sign In

```typescript
const { signIn } = useAuth()

const result = await signIn(
  'user@example.com',      // email
  'SecurePassword123!'     // password
)

// Returns:
// {
//   success: boolean,
//   message?: string,
//   user?: User,
//   session?: Session
// }
```

#### Sign Out

```typescript
const { signOut } = useAuth()

await signOut()
// User logged out, session cleared
```

#### Update Profile

```typescript
const { updateProfile } = useAuth()

const result = await updateProfile({
  name: 'New Name',
  bio: 'Updated bio text',
  location: 'New York, NY',
  website: 'https://example.com'
})

// Returns: { success: boolean, message?: string }
```

### Database API

#### Get User Profile

```typescript
import { databaseService } from '@/services/database'

const result = await databaseService.getProfile(userId)

// Returns:
// {
//   success: boolean,
//   profile?: {
//     id: string,
//     name: string,
//     email: string,
//     bio: string,
//     location: string,
//     website: string,
//     github: string,
//     linkedin: string,
//     avatar_url: string,
//     role: 'user' | 'admin',
//     created_at: string,
//     updated_at: string
//   },
//   message?: string
// }
```

#### Update Profile

```typescript
const result = await databaseService.updateProfile(userId, {
  name: 'Updated Name',
  bio: 'New bio',
  location: 'New Location'
})

// Returns: { success: boolean, profile?: Profile, message?: string }
```

#### Create Post

```typescript
const result = await databaseService.createPost(userId, {
  title: 'My Blog Post',
  content: 'Post content here...',
  excerpt: 'Short summary',
  tags: ['react', 'typescript', 'web-dev'],
  published: true
})

// Returns:
// {
//   success: boolean,
//   post?: {
//     id: string,
//     user_id: string,
//     title: string,
//     content: string,
//     excerpt: string,
//     tags: string[],
//     views: number,
//     published: boolean,
//     created_at: string,
//     updated_at: string
//   },
//   message?: string
// }
```

#### Get User Posts

```typescript
const result = await databaseService.getUserPosts(userId)

// Returns:
// {
//   success: boolean,
//   posts?: Post[],
//   message?: string
// }
```

#### Update Post

```typescript
const result = await databaseService.updatePost(postId, {
  title: 'Updated Title',
  content: 'Updated content',
  published: true
})

// Returns: { success: boolean, post?: Post, message?: string }
```

#### Delete Post

```typescript
const result = await databaseService.deletePost(postId)

// Returns: { success: boolean, message?: string }
```

#### Search Posts

```typescript
const result = await databaseService.searchPosts('react tutorial')

// Returns:
// {
//   success: boolean,
//   posts?: Post[],
//   message?: string
// }
```

#### Get Dashboard Data

```typescript
const result = await databaseService.getUserDashboardData(userId)

// Returns:
// {
//   success: boolean,
//   dashboard?: {
//     postsCount: number,
//     totalViews: number,
//     recentPosts: Post[]
//   },
//   message?: string
// }
```

### Storage API

#### Upload File

```typescript
const file = event.target.files[0]

const result = await databaseService.uploadFile(
  file,        // File object
  'avatars'    // Bucket name
)

// Returns:
// {
//   success: boolean,
//   url?: string,      // Public URL of uploaded file
//   path?: string,     // Storage path
//   message?: string
// }
```

#### Delete File

```typescript
const result = await databaseService.deleteFile(
  'path/to/file.jpg',  // File path
  'avatars'             // Bucket name
)

// Returns: { success: boolean, message?: string }
```

### Real-time Subscriptions

#### Subscribe to User Posts

```typescript
const subscription = databaseService.subscribeToUserPosts(
  userId,
  (newPost) => {
    console.log('New post created:', newPost)
    // Update UI with new post
  }
)

// Later, cleanup:
subscription.unsubscribe()
```

#### Subscribe to Post Updates

```typescript
const subscription = databaseService.subscribeToPostUpdates(
  postId,
  (updatedPost) => {
    console.log('Post updated:', updatedPost)
    // Update UI with changes
  }
)

// Cleanup:
subscription.unsubscribe()
```

---

## 🚢 Deployment

### Vercel Deployment

**Step 1: Prepare Repository**
```bash
# Commit all changes
git add .
git commit -m "Prepare for deployment"

# Push to GitHub
git push origin main
```

**Step 2: Import to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite configuration

**Step 3: Configure Environment Variables**
1. In Vercel project settings
2. Go to "Environment Variables"
3. Add:
   ```
   VITE_SUPABASE_URL = https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY = your-anon-key
   ```

**Step 4: Deploy**
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Visit deployment URL

**Step 5: Update Supabase URLs**
1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Add production URL:
   ```
   https://yourapp.vercel.app/auth/confirm-email
   https://yourapp.vercel.app/**
   ```
4. Set Site URL:
   ```
   https://yourapp.vercel.app
   ```
5. Save changes

**Step 6: Test Production**
- Visit your Vercel URL
- Test signup flow
- Test email confirmation
- Test login
- Verify all features work

### Netlify Deployment

**Step 1: Build Project**
```bash
npm run build
```

**Step 2: Install Netlify CLI**
```bash
npm install -g netlify-cli
```

**Step 3: Deploy**
```bash
# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod

# Follow prompts:
# - Build directory: dist
# - Publish directory: dist
```

**Step 4: Configure Environment**
1. Go to Netlify dashboard
2. Site settings → Build & deploy
3. Environment variables
4. Add Supabase credentials

**Step 5: Update Supabase**
- Add Netlify URL to redirect URLs
- Update site URL

### Environment Variables for Production

Required variables:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Optional variables:
```env
VITE_APP_URL=https://yourdomain.com
VITE_API_URL=https://api.yourdomain.com
```

---

## 🐛 Troubleshooting

### Email Confirmation Issues

#### Problem: Confirmation email not arriving

**Possible Causes:**
- Email in spam/junk folder
- Email service delay
- Wrong email address entered
- Email service blocking Supabase

**Solutions:**

1. **Check Spam Folder**
   - Most common issue
   - Look in spam, junk, promotions folders
   - Mark Supabase emails as "Not Spam"

2. **Wait 1-2 Minutes**
   - Email delivery can be delayed
   - Refresh inbox periodically

3. **Verify Email Address**
   - Go to Supabase Dashboard → Authentication → Users
   - Check if email is correct
   - Verify no typos

4. **Resend Confirmation**
   - On `/auth/check-email` page
   - Click "Resend Confirmation Email" button
   - Wait for new email

5. **Check Supabase Logs**
   - Supabase Dashboard → Authentication → Logs
   - Look for email send events
   - Check for errors

6. **Use Test Email Service**
   - Try with temp-mail.org
   - Use guerrillamail.com
   - Test with 10minutemail.com

#### Problem: Confirmation link doesn't work

**Symptoms:**
- Click link but nothing happens
- Error page appears
- Link expired message

**Solutions:**

1. **Check Redirect URL Configuration**
   ```
   Supabase Dashboard → Authentication → URL Configuration
   Add: http://localhost:5173/auth/confirm-email
   Add: http://localhost:5173/**
   Click Save
   ```

2. **Try Incognito/Private Mode**
   - Open link in incognito window
   - Clears cache issues
   - Tests fresh state

3. **Check Browser Console**
   - Open Developer Tools (F12)
   - Look for JavaScript errors
   - Check network tab for failed requests

4. **Verify Route Exists**
   - Make sure `/auth/confirm-email` page is created
   - Check routes in `pages/index.tsx`
   - Verify component imports

5. **Request New Link**
   - Link may be expired (24 hour limit)
   - Click "Resend" on check-email page
   - Use new link from fresh email

6. **Copy Link Manually**
   - Some email clients break long links
   - Copy entire URL from email
   - Paste directly in browser

#### Problem: "Email not confirmed" error on login

**Symptoms:**
- Login fails with email confirmation error
- Cannot access account
- Forgot to confirm email

**Solutions:**

1. **Confirm Your Email First**
   - Check inbox for confirmation email
   - Click the confirmation link
   - Then try logging in again

2. **Resend Confirmation Email**
   - Go to `/auth/check-email`
   - Or request new link at login page

3. **Check Confirmation Status**
   ```
   Supabase Dashboard → Authentication → Users
   Find your user
   Check "Email Confirmed" column
   Should show checkmark if confirmed
   ```

4. **Manual Confirmation (Admin)**
   ```sql
   -- Run in SQL Editor (for testing only)
   UPDATE auth.users 
   SET email_confirmed_at = NOW() 
   WHERE email = 'user@example.com';
   ```

### Database Connection Issues

#### Problem: "Invalid API key"

**Symptoms:**
- Cannot connect to database
- 401 Unauthorized errors
- Authentication fails immediately

**Solutions:**

1. **Check .env File Exists**
   ```bash
   # In project root
   ls -la .env
   
   # Should show .env file
   ```

2. **Verify Environment Variables**
   ```bash
   # View .env contents
   cat .env
   
   # Should show:
   # VITE_SUPABASE_URL=...
   # VITE_SUPABASE_ANON_KEY=...
   ```

3. **Restart Development Server**
   ```bash
   # Stop server (Ctrl+C)
   # Start again
   npm run dev
   ```

4. **Check Variable Names**
   - Must start with `VITE_`
   - Exact spelling matters
   - No spaces around `=`

5. **Get Fresh Keys**
   - Go to Supabase Dashboard
   - Settings → API
   - Copy new Project URL
   - Copy new anon key
   - Update .env file

6. **Clear Browser Cache**
   - Hard refresh: Ctrl+Shift+R
   - Or clear cache in browser settings

#### Problem: "Table does not exist"

**Symptoms:**
- Database queries fail
- "relation does not exist" error
- Tables not found

**Solutions:**

1. **Run SQL Schema**
   - Supabase Dashboard → SQL Editor
   - Copy schema from `database/schema.sql`
   - Execute the query
   - Check for error messages

2. **Verify Tables Created**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

3. **Check Table Names**
   - PostgreSQL is case-sensitive
   - Use exact names: `profiles`, `posts`
   - Not: `Profiles`, `POSTS`

4. **Recreate Tables**
   ```sql
   -- Drop existing tables (careful!)
   DROP TABLE IF EXISTS notifications CASCADE;
   DROP TABLE IF EXISTS comments CASCADE;
   DROP TABLE IF EXISTS posts CASCADE;
   DROP TABLE IF EXISTS profiles CASCADE;
   
   -- Then run full schema again
   ```

#### Problem: "Row Level Security policy violation"

**Symptoms:**
- Cannot read/write data
- "new row violates RLS policy" error
- Access denied to tables

**Solutions:**

1. **Check User is Authenticated**
   - User must be logged in
   - Check `isAuthenticated` is true
   - Verify session exists

2. **Verify RLS Policies Exist**
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename IN ('profiles', 'posts');
   ```

3. **Check Profile Exists**
   - User needs profile in `profiles` table
   - Visit `/debug` to check
   - Create profile if missing

4. **Recreate RLS Policies**
   ```sql
   -- Run the SQL schema again
   -- It will recreate all policies
   ```

5. **Temporary Disable RLS (Testing Only)**
   ```sql
   -- ONLY for testing/debugging
   ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
   
   -- Remember to re-enable!
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ```

### Authentication Issues

#### Problem: Cannot login after signup

**Cause:**
- Email confirmation required
- User hasn't clicked confirmation link

**Solution:**
1. Check inbox for confirmation email
2. Click confirmation link
3. Then login
4. Email MUST be confirmed first

#### Problem: Profile not created automatically

**Symptoms:**
- User exists but no profile
- Profile page shows error
- Login works but no data

**Solutions:**

1. **Check Trigger Exists**
   ```sql
   SELECT * FROM pg_trigger 
   WHERE tgname = 'on_auth_user_created';
   ```

2. **Recreate Trigger**
   ```sql
   -- Run the trigger creation script
   -- From database schema
   ```

3. **Manual Profile Creation**
   - Visit `/debug` page
   - Click "Create Profile Now" button
   - Or run SQL:
   ```sql
   INSERT INTO profiles (id, email, name, role, created_at, updated_at)
   SELECT id, email, COALESCE(raw_user_meta_data->>'name', split_part(email, '@', 1)), 'user', created_at, NOW()
   FROM auth.users
   WHERE id NOT IN (SELECT id FROM profiles);
   ```

#### Problem: Session expires too quickly

**Solutions:**

1. **Check Session Settings**
   - Supabase Dashboard → Authentication → Settings
   - JWT Expiry: Default 3600 seconds (1 hour)

2. **Enable Auto Refresh**
   - Already enabled in `supabase.ts`
   - Tokens refresh automatically

3. **Use "Remember Me"**
   - Check "Remember me" on login
   - Session lasts longer

### Build Issues

#### Problem: Build fails with TypeScript errors

**Solutions:**

1. **Run Type Check**
   ```bash
   npm run type-check
   ```

2. **Fix Type Errors**
   - Review error messages
   - Fix type mismatches
   - Add missing types

3. **Update Dependencies**
   ```bash
   npm update
   ```

#### Problem: Build fails with module errors

**Solutions:**

1. **Clear Cache**
   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

2. **Check Node Version**
   ```bash
   node --version
   # Should be v16 or higher
   ```

3. **Reinstall Dependencies**
   ```bash
   npm ci
   ```

### Performance Issues

#### Problem: Slow page loads

**Solutions:**

1. **Check Database Indexes**
   - Indexes created by schema
   - Run EXPLAIN on slow queries

2. **Optimize Images**
   - Compress avatars before upload
   - Use appropriate image sizes

3. **Enable Caching**
   - Already configured in router
   - Check browser caching

4. **Use Production Build**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
   - Click "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-owner/repo-name.git
   ```

4. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

### Making Changes

1. **Make your changes**
   - Write clean, readable code
   - Follow existing patterns
   - Add comments for complex logic

2. **Test your changes**
   - Test locally
   - Check responsive design
   - Verify database operations
   - Run type checking

3. **Commit changes**
   ```bash
   git add .
   git commit -m "Add: amazing feature"
   ```

### Commit Message Format

Use conventional commits:
- `Add:` New feature
- `Fix:` Bug fix
- `Update:` Updates to existing feature
- `Refactor:` Code refactoring
- `Docs:` Documentation changes
- `Style:` Code style changes
- `Test:` Test updates

### Submitting Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

2. **Create Pull Request**
   - Go to original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in description

3. **Wait for review**
   - Address feedback
   - Make requested changes
   - Update PR

### Code Style Guidelines

**TypeScript:**
- Use TypeScript for all new files
- Define proper interfaces/types
- Avoid `any` type when possible
- Use optional chaining

**React:**
- Use functional components
- Use hooks for state management
- Keep components small and focused
- Extract reusable logic to hooks

**CSS:**
- Use CSS variables from `index.css`
- Follow existing naming patterns
- Keep styles in appropriate files
- Use responsive design

**Naming:**
- Components: PascalCase
- Files: kebab-case.tsx
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE

### Testing Checklist

Before submitting PR:
- [ ] Code runs without errors
- [ ] TypeScript type check passes
- [ ] All features work as expected
- [ ] Authentication flow tested
- [ ] Database operations verified
- [ ] Responsive design checked
- [ ] Browser console has no errors
- [ ] Code is documented
- [ ] Commit messages are clear

---

## 📄 License

This project is licensed under the MIT License.

### MIT License

```
Copyright (c) 2024 Pavan Patel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Technologies
- **React** - A JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **Supabase** - Open source Firebase alternative
- **TanStack Router** - Fully type-safe routing for React
- **TypeScript** - JavaScript with syntax for types

### Resources
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Router Documentation](https://tanstack.com/router)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Community
- React community for amazing ecosystem
- Supabase team for excellent BaaS
- Open source contributors
- Stack Overflow community

---

## 📞 Support

### Get Help

**Documentation:**
- [React Docs](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [TanStack Router Docs](https://tanstack.com/router)
- [Vite Docs](https://vitejs.dev)

**Community:**
- [Supabase Discord](https://discord.supabase.com)
- [React Discord](https://discord.gg/react)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react)

**Issues:**
- Check [Troubleshooting](#-troubleshooting) section
- Visit debug page at `/debug`
- Check browser console for errors
- Review Supabase logs
- Open GitHub issue with details

**Common Questions:**

Q: **Do I need to confirm my email?**
A: Yes, email confirmation is required before you can login.

Q: **How long does the confirmation link last?**
A: Confirmation links expire after 24 hours.

Q: **Can I disable email confirmation?**
A: Yes, in Supabase Dashboard → Authentication → Settings → Disable "Enable email confirmations"

Q: **What if I don't receive the email?**
A: Check spam folder, wait 1-2 minutes, or use the resend button.

Q: **Can I use Google login?**
A: Yes, enable Google OAuth in Supabase Dashboard → Authentication → Providers

---

## 🎯 Quick Reference

### Important URLs

**Local Development:**
- Application: http://localhost:5173
- Login: http://localhost:5173/auth/login
- Register: http://localhost:5173/auth/register
- Profile: http://localhost:5173/profile
- Debug: http://localhost:5173/debug
- Auth Test: http://localhost:5173/auth-test

**Supabase:**
- Dashboard: https://supabase.com/dashboard
- Authentication: Dashboard → Authentication
- Database: Dashboard → Database → Table Editor
- SQL Editor: Dashboard → SQL Editor
- Storage: Dashboard → Storage
- Logs: Dashboard → Authentication → Logs

### Quick Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run preview                # Preview production build

# Testing
npm run type-check             # Check TypeScript types
npm run lint                   # Lint code

# Git
git status                     # Check status
git add .                      # Stage all changes
git commit -m "message"        # Commit with message
git push origin main           # Push to remote

# Database
# Run in Supabase SQL Editor:
SELECT * FROM profiles;        # View all profiles
SELECT * FROM posts;           # View all posts
SELECT * FROM auth.users;      # View all auth users
```

### Environment Variables

```env
# Required
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional
VITE_APP_URL=https://yourdomain.com
```

### Key Features Summary

✅ Email/Password Authentication with confirmation
✅ User Profiles with avatars
✅ Blog Posts management
✅ Protected Routes
✅ Real-time updates
✅ File uploads
✅ Responsive design
✅ Debug tools
✅ Type-safe routing
✅ Modern UI with animations

---

## ⚡ Quick Start Checklist

Complete setup in 10 minutes:

- [ ] **Step 1:** Clone repository
- [ ] **Step 2:** Run `npm install`
- [ ] **Step 3:** Create `.env` with Supabase credentials
- [ ] **Step 4:** Run SQL schema in Supabase
- [ ] **Step 5:** Add redirect URLs in Supabase
- [ ] **Step 6:** Run `npm run dev`
- [ ] **Step 7:** Visit http://localhost:5173
- [ ] **Step 8:** Create account at `/auth/register`
- [ ] **Step 9:** Check email and confirm
- [ ] **Step 10:** Login at `/auth/login`
- [ ] **Done!** Start building 🎉

---

** Pavan Patel**

**Version:** 1.0.0

**Happy Coding! 🚀**