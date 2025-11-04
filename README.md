# HingeDev 💻

**A Social Discovery Platform for Developers** — Find, Connect, and Collaborate with Other Devs

HingeDev is a modern full-stack web application that bridges developers together, inspired by the concept of a dating app but designed for professional networking. Discover other developers, view their profiles, send connection requests, and build meaningful professional relationships.

---

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens and password hashing (bcrypt)
- **Developer Profiles**: Create and customize your developer profile with skills, experience, and about section
- **Discovery Feed**: Browse through developer profiles and connect with others
- **Connection Requests**: Send "Interested" or "Ignore" signals to other developers
- **Connection Management**: View your connections and pending requests
- **Profile Management**: Edit your profile, update password, and manage your presence
- **Responsive Design**: Mobile-friendly UI built with React, Tailwind CSS, and DaisyUI
- **Real-time Notifications**: Toast notifications for actions and feedback
- **State Management**: Redux Toolkit for predictable state management

---

## 🛠️ Tech Stack

### **Frontend**

- **React 19.1** — Modern UI library with functional components and hooks
- **Vite 7.1** — Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** — Utility-first CSS framework
- **DaisyUI 5.1** — Component library built on Tailwind CSS
- **Redux Toolkit 2.9** — Predictable state container
- **React Router 7.8** — Client-side routing
- **Axios 1.11** — HTTP client for API calls
- **React Icons 5.5** — Icon library (Font Awesome, Material Design, etc.)
- **React Hot Toast 2.6** — Toast notifications

### **Backend**

- **Node.js** — JavaScript runtime
- **Express.js 5.1** — Web framework
- **MongoDB** — NoSQL database (Atlas cluster)
- **Mongoose 8.16** — ODM for MongoDB
- **JWT (jsonwebtoken)** — Authentication tokens
- **bcrypt 6.0** — Password hashing and comparison
- **Cookie Parser** — Parse and manage HTTP cookies
- **CORS** — Cross-Origin Resource Sharing
- **Validator** — Data validation library
- **Dotenv** — Environment variable management

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB Atlas** account (free tier available at https://www.mongodb.com/cloud/atlas)

---

## ⚙️ Installation & Setup

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
# MONGODB_URL=your_mongodb_atlas_connection_string
# JWT_SECRET=your_secret_key_for_jwt

# Start the development server
npm run dev
# Server runs on http://localhost:7777
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd Frontend

# Install dependencies
npm install

# Create a .env file (if needed) with:
# VITE_API_BASE_URL=http://localhost:7777

# Start the development server
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📁 Project Structure

```
HingeDev/
├── Backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── config/
│   │   │   └── database.js        # MongoDB connection
│   │   ├── middlewares/
│   │   │   └── auth.js            # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── userSchema.js      # User database schema
│   │   │   └── connectionRequest.js # Connection request schema
│   │   ├── routes/
│   │   │   ├── auth.js            # Auth endpoints (signup, login, logout)
│   │   │   ├── profile.js         # Profile endpoints (view, edit, password)
│   │   │   ├── request.js         # Connection request endpoints
│   │   │   └── user.js            # User endpoints (feed, connections)
│   │   └── utils/
│   │       └── validation.js      # Data validation functions
│   ├── package.json
│   └── .env                       # Environment variables
│
├── Frontend/
│   ├── src/
│   │   ├── main.jsx               # React entry point
│   │   ├── App.jsx                # Main App component
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar with Hinge<DEV/> logo
│   │   │   ├── Marquee.jsx        # Animated marquee with tagline
│   │   │   ├── Card.jsx           # Developer card component
│   │   │   ├── DiasyToast.jsx     # Toast notification wrapper
│   │   │   ├── Footer.jsx         # Footer component
│   │   │   └── ProtectedRoute.jsx # Protected route wrapper
│   │   ├── pages/
│   │   │   ├── Auth.jsx           # Login/Signup page
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
│   │       ├── constants.js       # App constants (API base URL)
│   │       └── fetchUser.js       # Fetch user utility function
│   ├── package.json
│   └── .env                       # Environment variables
│
└── README.md                      # This file
```

---

## 🔌 API Endpoints

### Authentication

- `POST /auth/signup` — Register a new developer account
- `POST /auth/login` — Login with email and password
- `POST /auth/logout` — Logout and clear session

### Profile

- `GET /profile/view` — Get current user's profile
- `PATCH /profile/edit` — Update profile information
- `PATCH /profile/password` — Update password or reset forgotten password

### Connection Requests

- `POST /request/send/:status/:userId` — Send connection request (status: "interested" or "ignored")
- `POST /request/review/:status/:requestId` — Review received request (status: "accepted" or "rejected")

### User Discovery

- `GET /user/feed` — Get feed of developer profiles to discover
- `GET /user/connections` — Get list of accepted connections
- `GET /user/requests/received` — Get pending connection requests

---

## 🎯 How to Use

### 1. Create an Account

- Visit the app and click "Signup"
- Enter your email, password, first name, and last name
- Your account is created and you're logged in

### 2. Set Up Your Profile

- Edit your profile with skills, about section, and photo URL
- Add a professional photo URL from services like Imgur or Cloudinary

### 3. Discover Developers

- Go to the Feed page to see developer profiles
- Click ❤️ (Heart) to show interest or ✕ (X) to ignore
- Cards smoothly animate away when you interact with them

### 4. Manage Connections

- View pending requests in the Requests section
- Accept or reject incoming connection requests
- See all your connections in the Connections section

### 5. Edit Your Profile

- Update your information anytime in the Profile section
- Change your skills, about text, and photo

---

## 🔐 Authentication & Security

- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **JWT Tokens**: Secure token-based authentication with 7-day expiry
- **HTTP Cookies**: Tokens stored securely in HTTP-only cookies
- **Input Validation**: Server-side validation on all endpoints using Validator.js

---

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Tailwind CSS**: Modern utility-first styling
- **DaisyUI Components**: Pre-built accessible components (buttons, cards, modals)
- **React Icons**: Beautiful and consistent icon library
- **Toast Notifications**: Real-time feedback for user actions
- **Smooth Animations**: Card swipe and fade transitions
- **Marquee Animation**: Animated tagline "Because developers deserve their own match."

---

## 🚀 Running the Application

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

## 📝 Available Scripts

### Backend

- `npm start` — Start the production server
- `npm run dev` — Start the development server with hot reload (nodemon)

### Frontend

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run lint` — Run ESLint to check code quality
- `npm run preview` — Preview production build locally

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure your MongoDB Atlas IP whitelist includes your current IP
- Verify your connection string in `.env` is correct
- Check that your MongoDB cluster is active

### CORS Errors

- Ensure backend is running on `http://localhost:7777`
- Check CORS configuration in `Backend/src/app.js`

### Frontend Won't Load

- Clear browser cache (Ctrl+Shift+Delete)
- Ensure Vite dev server is running
- Check browser console for specific errors

### Missing Dependencies

- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

---

## 👨‍💻 Development Workflow

### Adding a New Feature

1. **Backend**: Create API endpoint in appropriate route file
2. **Database**: Update schema if needed
3. **Frontend**: Create component or page for the feature
4. **State**: Add Redux slice if state management needed
5. **Connect**: Wire API calls using Axios
6. **Style**: Use Tailwind CSS classes and DaisyUI components

### Code Quality

- Run ESLint: `npm run lint` in Frontend directory
- Follow existing code patterns
- Use descriptive variable and function names
- Add comments for complex logic

---

## 📄 License

This project is licensed under the ISC License — see the LICENSE file for details.

---

## 👤 Author

**Rahul Kumar**

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📞 Support

For issues, questions, or suggestions, please create an issue in the GitHub repository.

---

## 🎓 Learning Resources

This project is built as a learning exercise in full-stack web development, covering:

- RESTful API design
- Database modeling with MongoDB and Mongoose
- Authentication and authorization
- React component architecture
- State management with Redux
- Responsive design with Tailwind CSS

---

**Happy Coding! 🚀**

Find your next developer connection on HingeDev!
