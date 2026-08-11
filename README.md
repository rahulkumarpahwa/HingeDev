# HingeDev

**A Social Discovery Platform for Developers** - Find, Connect, and Collaborate with Other Devs

HingeDev is a modern full-stack web application that bridges developers together, inspired by the concept of a dating app but designed for professional networking. Discover other developers, view their profiles, send connection requests, and build meaningful professional relationships. The discovery feed is ranked by a match-scoring algorithm so you see the most compatible developers first.

---

## Features

- **User Authentication**: Secure signup and login with JWT tokens, password hashing (bcrypt), and Cloudflare Turnstile bot protection
- **Developer Profiles**: Create and customize your developer profile with skills, about section, gender, location, and experience level
- **Smart Discovery Feed**: Browse developer profiles ranked by a match score based on skills overlap, bio similarity, experience level, and location
- **Connection Requests**: Send "Interested" or "Ignore" signals to other developers
- **Connection Management**: View your connections and pending requests
- **Profile Management**: Edit your profile, update password, and delete your account
- **Responsive Design**: Mobile-friendly UI built with React, Tailwind CSS, and DaisyUI
- **Real-time Notifications**: Toast notifications for actions and feedback
- **State Management**: Redux Toolkit for predictable state management
- **Security Hardening**: Helmet, CORS, input validation, and a centralized error handler

---

## Tech Stack

### Frontend

- **React 19.1** - Modern UI library with functional components and hooks
- **Vite 7.1** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **DaisyUI 5.1** - Component library built on Tailwind CSS
- **Redux Toolkit 2.9** - Predictable state container
- **React Redux 9.2** - Official React bindings for Redux
- **React Router 7.8** - Client-side routing
- **Axios 1.11** - HTTP client for API calls
- **React Icons 5.5** - Icon library (Font Awesome, Material Design, etc.)
- **React Hot Toast 2.6** - Toast notifications
- **React Turnstile** - Cloudflare Turnstile widget for bot protection

### Backend

- **Node.js** (v22.23.2 or higher) - JavaScript runtime
- **Express.js 5.1** - Web framework
- **MongoDB** - NoSQL database (Atlas cluster)
- **Mongoose 8.16** - ODM for MongoDB
- **JWT (jsonwebtoken)** - Authentication tokens
- **bcrypt 6.0** - Password hashing and comparison
- **Helmet** - Secure HTTP headers
- **Morgan** - HTTP request logging
- **Joi** - Environment variable validation
- **Cookie Parser** - Parse and manage HTTP cookies
- **CORS** - Cross-Origin Resource Sharing
- **Validator** - Data validation library
- **Dotenv / Custom-env** - Environment variable management

---

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v22.23.2 or higher)
- **npm** (v9 or higher)
- **MongoDB Atlas** account (free tier available at https://www.mongodb.com/cloud/atlas)
- **Cloudflare Turnstile** site key and secret key (free at https://dash.cloudflare.com)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rahulkumarpahwa/HingeDev.git
cd HingeDev
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create a .env file in Backend directory with:
# APP_STATE=DEVLOPEMENT
# MONGODB_URI=your_mongodb_atlas_connection_string
# JWT_SECRET=your_secret_key_for_jwt (min 32 characters)
# PORT=8000
# TURNSTILE_SECRET=your_cloudflare_turnstile_secret
# CLOUDFLARE_TURNSTILE_API=https://challenges.cloudflare.com/turnstile/v0/siteverify

# For development, the envParser also loads Backend/.env.local

# Start the development server
npm run dev
# Server runs on the PORT defined in your .env (default: 8000)
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd Frontend

# Install dependencies
npm install

# Create a .env file with:
# VITE_URL=http://localhost:8000
# VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key

# Start the development server
npm run dev
# Frontend runs on http://localhost:5173
```

---

## Project Structure

```
HingeDev/
├── Backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── index.js               # API router mounting all route modules
│   │   ├── envParser.js           # Env variable parsing and Joi validation
│   │   ├── config/
│   │   │   └── database.js        # MongoDB connection
│   │   ├── middlewares/
│   │   │   ├── auth.js            # JWT authentication middleware
│   │   │   ├── errorHandler.js    # Centralized error handler
│   │   │   ├── ipConfig.js        # Client IP extraction middleware
│   │   │   └── turnstile.js       # Cloudflare Turnstile verification
│   │   ├── models/
│   │   │   ├── userSchema.js      # User database schema
│   │   │   └── connectionRequest.js # Connection request schema
│   │   ├── routes/
│   │   │   ├── auth.js            # Auth endpoints (signup, login, logout, delete)
│   │   │   ├── profile.js         # Profile endpoints (view, edit, password)
│   │   │   ├── request.js         # Connection request endpoints
│   │   │   └── user.js            # User endpoints (feed, connections)
│   │   ├── seed/
│   │   │   └── seed.js            # Database seeding script
│   │   └── utils/
│   │       ├── validation.js      # Data validation functions
│   │       ├── matching.js        # Match scoring algorithm utilities
│   │       └── error.js           # Error response helpers
│   ├── package.json
│   └── .env                       # Environment variables
│
├── Frontend/
│   ├── src/
│   │   ├── main.jsx               # React entry point
│   │   ├── App.jsx                # Main App component with routing
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar with Hinge<DEV/> logo
│   │   │   ├── Marquee.jsx        # Animated marquee with tagline
│   │   │   ├── Card.jsx           # Developer card component
│   │   │   ├── DiasyToast.jsx     # Toast notification wrapper
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   └── ProtectedRoute.jsx # Protected route wrapper
│   │   ├── pages/
│   │   │   ├── Auth.jsx           # Unified Login/Signup page with Turnstile
│   │   │   ├── Body.jsx           # Main layout wrapper
│   │   │   ├── Feed.jsx           # Discovery feed page
│   │   │   ├── Profile.jsx        # User profile view page
│   │   │   ├── EditProfile.jsx    # Profile editing page
│   │   │   ├── Connections.jsx    # Connections list page
│   │   │   ├── Requests.jsx       # Pending requests page
│   │   │   └── Home.jsx           # Home page
│   │   └── utils/
│   │       ├── appStore.js        # Redux store configuration
│   │       ├── userSlice.js       # Redux slice for user state
│   │       ├── feedSlice.js       # Redux slice for feed state
│   │       ├── connectionsSlice.js # Redux slice for connections
│   │       ├── requestsSlice.js   # Redux slice for requests
│   │       ├── signupProfileReducer.js # Signup form reducer
│   │       ├── updateProfileReducer.js # Profile update reducer
│   │       ├── constants.js       # App constants (API base URL, Turnstile key)
│   │       └── fetchUser.js       # Fetch user utility function
│   ├── package.json
│   └── .env                       # Environment variables
│
└── README.md                      # This file
```

---

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Authentication

- `POST /api/v1/signup` - Register a new developer account (Turnstile protected)
- `POST /api/v1/login` - Login with email and password (Turnstile protected)
- `POST /api/v1/logout` - Logout and clear session
- `DELETE /api/v1/delete` - Delete your account and related connection requests

### Profile

- `GET /api/v1/profile/view` - Get current user's profile
- `PATCH /api/v1/profile/edit` - Update profile information
- `PATCH /api/v1/profile/password` - Update password or reset forgotten password

### Connection Requests

- `POST /api/v1/request/send/:status/:userId` - Send connection request (status: "interested" or "ignored")
- `POST /api/v1/request/review/:status/:fromUserId` - Review received request (status: "accepted" or "rejected")

### User Discovery

- `GET /api/v1/user/feed?page=1&limit=10` - Get ranked feed of developer profiles (ordered by match score, paginated)
- `GET /api/v1/user/connections` - Get list of accepted connections
- `GET /api/v1/user/requests/received` - Get pending and rejected connection requests

---

## How to Use

### 1. Create an Account

- Visit the app and click "Signup"
- Enter your email, password, first name, and last name
- Complete the Cloudflare Turnstile check
- Your account is created and you're logged in

### 2. Set Up Your Profile

- Edit your profile with skills, about section, gender, location, experience level, and photo URL
- Add a professional photo URL from services like Imgur or Cloudinary

### 3. Discover Developers

- Go to the Feed page to see developer profiles
- Profiles are ranked by match score based on shared skills, bio similarity, experience level, and location
- Click the Heart button to show interest or the X button to ignore
- Cards smoothly animate away when you interact with them

### 4. Manage Connections

- View pending requests in the Requests section
- Accept or reject incoming connection requests
- See all your connections in the Connections section

### 5. Edit Your Profile

- Update your information anytime in the Profile section
- Change your skills, about text, and photo

---

## Authentication & Security

- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **JWT Tokens**: Secure token-based authentication with 2-hour expiry
- **HTTP Cookies**: Tokens stored securely in HTTP-only cookies with 1-hour expiry
- **Cloudflare Turnstile**: Bot protection on signup and login flows
- **Input Validation**: Server-side validation on all endpoints using Validator.js
- **Helmet**: Sets secure HTTP headers to protect against common vulnerabilities
- **Centralized Error Handling**: Consistent error responses through the error handler middleware
- **Environment Validation**: Joi schema validation fails fast on missing or invalid environment variables

---

## UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Tailwind CSS**: Modern utility-first styling
- **DaisyUI Components**: Pre-built accessible components (buttons, cards, modals)
- **React Icons**: Beautiful and consistent icon library
- **Toast Notifications**: Real-time feedback for user actions
- **Smooth Animations**: Card swipe and fade transitions
- **Marquee Animation**: Animated tagline "Because developers deserve their own match."

---

## Running the Application

### Development Mode

**Terminal 1 (Backend):**

```bash
cd Backend
npm run dev
```

**Terminal 2 (Frontend):**

```bash
cd Frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Production Build

**Frontend:**

```bash
cd Frontend
npm run build
npm run preview
```

---

## Available Scripts

### Backend

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload (nodemon)

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

---

## Troubleshooting

### MongoDB Connection Issues

- Ensure your MongoDB Atlas IP whitelist includes your current IP
- Verify your connection string in `.env` is correct
- Check that your MongoDB cluster is active

### CORS Errors

- Ensure the backend is running on the port set in `VITE_URL`
- Check CORS configuration in `Backend/src/app.js`

### Environment Validation Errors

- Ensure all required variables are present in `Backend/.env` (or `Backend/.env.local` for development)
- `JWT_SECRET` must be at least 32 characters
- Check `APP_STATE` is set to either "DEVLOPEMENT" or "PRODUCTION"

### Turnstile / Login Issues

- Verify `VITE_TURNSTILE_SITE_KEY` is set in the frontend `.env`
- Verify `TURNSTILE_SECRET` and `CLOUDFLARE_TURNSTILE_API` are set in the backend `.env`
- Ensure your domain is added in the Cloudflare Turnstile dashboard

### Frontend Won't Load

- Clear browser cache (Ctrl+Shift+Delete)
- Ensure Vite dev server is running
- Check browser console for specific errors

### Missing Dependencies

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

---

## Development Workflow

### Adding a New Feature

1. **Backend**: Create API endpoint in the appropriate route file
2. **Database**: Update schema if needed
3. **Frontend**: Create component or page for the feature
4. **State**: Add Redux slice if state management needed
5. **Connect**: Wire API calls using Axios
6. **Style**: Use Tailwind CSS classes and DaisyUI components

### Code Quality

- Run ESLint: `npm run lint` in the Frontend directory
- Follow existing code patterns
- Use descriptive variable and function names
- Add comments for complex logic

---

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## Author

**Rahul Kumar**

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## Support

For issues, questions, or suggestions, please create an issue in the GitHub repository.

---

## Learning Resources

This project is built as a learning exercise in full-stack web development, covering:

- RESTful API design with versioned routing
- Database modeling with MongoDB and Mongoose
- Authentication and authorization
- Match-scoring algorithms and relevance ranking
- React component architecture
- State management with Redux
- Responsive design with Tailwind CSS
- Security best practices (Helmet, Turnstile, input validation)

---

**Happy Coding!**

Find your next developer connection on HingeDev!
