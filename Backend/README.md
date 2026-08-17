# HingeDev Backend

Welcome to the backend service of **HingeDev** (also referred to as **DevTinder**), a professional networking and matchmaking platform designed specifically for developers. This service provides the core RESTful APIs, database integrations, authentication flow, and custom matchmaking algorithms that power the HingeDev application.

---

## 🚀 Tech Stack & Dependencies

The backend is built as a fast, robust, and highly-secure Node.js application:

* **Runtime**: Node.js (supported version `>=22.23.2`)
* **Framework**: Express.js (v5.1.0)
* **Database**: MongoDB & Mongoose ODM (v8.16.1)
* **Authentication**: Cookie-based JSON Web Tokens (JWT) using `cookie-parser` (v1.4.7) and `jsonwebtoken` (v9.0.2)
* **Security & Reliability**:
  * `bcrypt` (v6.0.0): Strong password hashing and salting.
  * `helmet` (v8.3.0): Secures Express apps by setting various HTTP response headers.
  * `express-rate-limit` (v8.6.2): Prevents brute-force attacks and abuse.
  * `cors` (v2.8.5): Configured for cross-origin credentials and session sharing.
  * `morgan` (v1.11.0): Tiny HTTP request logging.
* **Validation**: `joi` (v18.2.3) & `validator` (v13.15.15) for strict input validation, data sanitization, and API schemas.
* **Integrations**: Cloudflare Turnstile CAPTCHA for automated signup/login protection.

---

## 📂 Project Directory Structure

The repository is modularly organized using standard Express conventions:

```text
Backend/
├── .env                         # Production environment configurations
├── .env.local                   # Local development environment configurations
├── apiList.md                   # Quick reference list of endpoints
├── envParser.js                 # Strict environment schema loader & validation
├── package.json                 # Dependency management and npm scripts
├── work.md                      # Developer roadmap and milestones
└── src/
    ├── app.js                   # Primary Express application initialization & DB loader
    ├── index.js                 # Main router aggregator (apiRouter)
    ├── config/
    │   └── database.js          # Mongoose MongoDB connection handler
    ├── middlewares/
    │   ├── auth.js              # Cookie-based JWT authentication verification
    │   ├── errorHandler.js      # Centralized error mapping and standard response format
    │   ├── ipConfig.js          # Utility to retrieve user remote IP address
    │   ├── turnstile.js         # Cloudflare Turnstile token validation middleware
    │   └── validate.js          # Joi-based body schema validation middleware
    ├── models/
    │   ├── connectionRequestSchema.js # Matches, swiping state, and relationship states
    │   ├── profilePromptSchema.js     # Developer prompt Q&As (e.g., currently_building)
    │   ├── userPreferenceSchema.js    # Developer discovery & feed filtration filters
    │   └── userSchema.js        # Core User model with custom methods & geospatial indexes
    ├── routes/
    │   ├── auth.js              # signup, login, logout, account deletion
    │   ├── profile.js           # restore session, edit profile, change password
    │   ├── request.js           # connection swipes (interested/ignored) & review (accepted/rejected)
    │   └── user.js              # user feed, connections, received requests
    ├── schemas/
    │   └── userSchema.js        # Joi schemas for incoming request body validations
    ├── seed/
    │   └── seed.js              # Database seed script for development mock data
    └── utils/
        ├── error.js             # API error responder helper and error constants
        └── matching.js          # Custom matchmaking score composite algorithm
```

---

## ⚙️ Environment Configuration (`envParser.js`)

Environment variables are managed dynamically using the `custom-env` library, which automatically loads `.env` for production and `.env.local` for development environments based on `APP_STATE`.

A Joi schema strictly enforces that all required environment variables are present and valid at startup:

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `APP_STATE` | String | `DEVLOPEMENT` | Environment state. Must be strictly `"DEVLOPEMENT"` (note: spelled with internal 'E') or `"PRODUCTION"`. |
| `MONGODB_URI` | String | *Required* | Complete connection string for MongoDB cluster. |
| `JWT_SECRET` | String | *Required* | Token signing key. Must be a minimum of **32 characters** for security. |
| `PORT` | Number | `8000` | Port on which the Express server listens. |
| `TURNSTILE_SECRET` | String | *Required* | Cloudflare Turnstile API Secret Key. |
| `CLOUDFLARE_TURNSTILE_API` | String | *Required* | Cloudflare Turnstile site verify endpoint URL. |

If validation fails, the server prints the configuration error and shuts down immediately to avoid runtime bugs.

---

## 🗄️ Database Schemas & Models

### 1. User Model (`src/models/userSchema.js`)
Stores core user information, developer attributes, links, and geospatial location data:
* **Fields**:
  * `firstName`, `lastName`, `displayName` (required name inputs with trimming & length limits).
  * `email` (lowercase, unique, verified via `validator.isEmail`).
  * `password` (hashed, length between 8 and 80 characters).
  * `dateOfBirth` (Date).
  * `gender` (Enum: Woman, Man, Non-binary, Trans-Woman, Trans-Man, etc.).
  * `photoUrl` (Default avatar placeholder, validated URL format).
  * `developerRole` (Enum: `frontend_developer`, `backend_developer`, `fullstack_developer`, `mobile_developer`, `devops_engineer`, `data_engineer`, etc.).
  * `experienceLevel` (Enum: `beginner`, `intermediate`, `advanced`, `expert`).
  * `skills` (Array of Strings, capped at a maximum of 20 elements).
  * `location` (GeoJSON `Point` coordinates: `[longitude, latitude]`).
  * `city`, `state`, `country`, `timezone` (defaulting to `"IST"`).
  * `github` & `linkedin` (objects containing username/profileUrls).
  * `bioEmbedding` (Array of numbers for developer recommendation search).
  * `privacy` (options to hide age, gender, location, social accounts, etc.).
* **Indexes**: Creates a `2dsphere` index on `location` for lightning-fast geospatial distance searches.
* **Instance Methods**:
  * `getJWT()`: Generates a JSON Web Token containing the user's ID and email, expiring in **2 hours**.
  * `getPasswordValid(passwordbyuser)`: Compares an incoming plain password with the hashed password using `bcrypt.compare`.

### 2. ConnectionRequest Model (`src/models/connectionRequestSchema.js`)
Governs connections and matching states between users:
* **Fields**:
  * `fromUserId` / `toUserId`: Mongoose ObjectIds referencing the `User` model.
  * `status`: Enum containing `ignored`, `interested`, `accepted`, `rejected`.
* **Indexes**: Contains a compound index on `{ fromUserId: 1, toUserId: 1 }` to optimize relationship lookup performance.
* **Pre-Save Validation**: Middleware guarantees a user **cannot** send a connection request to themselves.

### 3. ProfilePrompt Model (`src/models/profilePromptSchema.js`)
Allows developers to answer custom icebreakers:
* **Prompts**: `currently_building`, `proudest_project`, `recently_learned`, `favorite_technology`, `looking_for`, `developer_hot_take`, `dream_project`, `favorite_open_source_project`.

### 4. UserPreference Model (`src/models/userPreferenceSchema.js`)
Configures discovery criteria for matching (lookingFor values, age range, max distance in km, collaboration format: remote, hybrid, in-person).

---

## 🔌 API Routes & Endpoints

All APIs are prefixed with `/api/v1`.

### 🔐 1. Authentication Routes (`src/routes/auth.js`)
Handles signups, session creation, and security check verification:
* `POST /signup`: Signs up a new developer.
  * **Middlewares**: `getUserIP`, `validateTurnstile`, `validateBody(userSchema)`.
  * **Result**: Saves hashed password, returns a HTTP-only JWT `token` cookie.
* `POST /login`: Validates credentials.
  * **Middlewares**: `getUserIP`, `validateTurnstile`, `validateBody(loginSchema)`.
  * **Result**: Checks password, returns HTTP-only JWT cookie.
* `POST /logout`: Clears the JWT cookie immediately.
* `DELETE /delete`: Completely destroys the user account.
  * **Middlewares**: `userAuth`.
  * **Behavior**: Clears cookies, then recursively cleans up all related connection requests where the user was sender or recipient.

### 👤 2. Profile Routes (`src/routes/profile.js`)
Allows users to manage and fetch their active profile setup:
* `GET /restore`: Restores active user state on frontend page refresh (using the validated token).
* `PATCH /edit`: Safely updates profile details.
  * **Middlewares**: `userAuth`, `validateBody(updateSchema)`.
* `PATCH /password`: Changes the user's password.
  * **Middlewares**: `userAuth`.
  * **Requirements**: Receives `newPassword` and `reNewPassword`. Performs validation for strong password composition.

### 🤝 3. Connection Request Routes (`src/routes/request.js`)
Manages swipe interactions and match confirmations:
* `POST /request/send/:status/:toUserId`: Swipes on a target user.
  * **Parameters**: `status` (must be `interested` or `ignored`), `toUserId`.
  * **Validation**: Validates that target user exists and that no previous connection request exists in either direction.
* `POST /request/review/:status/:fromUserId`: Evaluates incoming requests.
  * **Parameters**: `status` (must be `accepted` or `rejected`), `fromUserId`.
  * **Requirements**: Ensures that an incoming request with status `interested` exists from the target sender.

### 📋 4. User Routes (`src/routes/user.js`)
Aggregates profile feeds, connection lists, and pending requests:
* `GET /feed`: Returns list of potential candidates.
  * *Note*: Has active support for an advanced composite match score ranking and pagination (`?page=1&limit=10`), which filters out self, existing connections, ignored users, and already sent requests.
* `GET /connections`: Retrieves all accepted connections.
  * **Populates**: `fromUserId` or `toUserId` depending on who initiated the request.
* `GET /requests/received`: Lists pending requests.
  * **Behavior**: Displays incoming requests with an `interested` status, as well as `rejected` requests sent by the current user to acknowledge updates.

---

## 🧮 Custom Matching Algorithm (`src/utils/matching.js`)

HingeDev uses a mathematical composite algorithm (`calculateMatchScore`) to rank and recommend relevant developers. A candidate's compatibility score (0-100) is calculated based on four weighted metrics:

```text
Match Score = (Skills × 30%) + (Bio Similarity × 30%) + (Experience × 20%) + (Location × 20%)
```

### Match Metric Breakdown:
1. **Skills Overlap (30% Weight)**:
   * Calculated using the **Jaccard Similarity** index.
   * Compares the user's skill set with the candidate's skill set, ignoring case sensitivity:
     $$\text{Overlap \%} = \frac{| \text{User Skills} \cap \text{Candidate Skills} |}{| \text{User Skills} \cup \text{Candidate Skills} |} \times 100$$
2. **Bio Semantic Similarity (30% Weight)**:
   * **Embedding Generation**: Transforms a bio into a fixed 384-dimensional numerical array. In the MVP, this utilizes a deterministic character-sum text hashing distribution vector to map keywords and lengths.
   * **Cosine Similarity**: Compares the user and candidate bio vectors:
     $$\text{Similarity} = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$
   * Scaled linearly from $[-1, 1]$ to a $[0, 100]$ score.
3. **Experience Compatibility (20% Weight)**:
   * Experience tiers are mapped internally as: `beginner` < `intermediate` < `advanced` < `expert`.
   * **Scoring Rules**:
     * Same experience tier: **100%**
     * 1 tier apart: **70%**
     * 2 tiers apart: **40%**
     * 3 tiers apart: **20%**
4. **Location Proximity (20% Weight)**:
   * Compares user location properties.
   * Same City: **100%** compatibility.
   * Same Country: **50%** compatibility.
   * Different Locations: **0%** compatibility.

---

## 🔒 Security & Middleware Layers

1. **`userAuth`**: Intercepts requests, reads the HTTP-only cookie, decodes and verifies the JWT against `JWT_SECRET`, and injects the loaded database user object into `req.user`.
2. **`validateBody`**: High-performance validation wrapper. Integrates with `Joi` definitions to validate and cast incoming payloads on the fly, rejecting incorrect schemas with structured Joi validation errors.
3. **`validateTurnstile`**: Ensures security on high-traffic auth endpoints (`/signup`, `/login`) by executing a server-to-server POST verification check with Cloudflare's Turnstile anti-bot verification API.
4. **`rateLimit`**: Imposes a strict ceiling of **100 requests per 15 minutes** per IP address. Exceeded limits trigger standard `429 Too Many Requests` responses with a dynamic epoch retry reset counter.
5. **`errorHandler`**: An Express global error interceptor that prevents stack trace leaks by logging errors internally and transforming exceptions into normalized JSON error responses.

---

## 🛠️ How to Get Started

### Prerequisites
Make sure you have MongoDB (local instance or MongoDB Atlas cluster) and Node.js installed.

### 1. Installation
Navigate into the Backend directory and install dependencies:
```bash
cd Backend
npm install
```

### 2. Configure Environment Variables
Create a file named `.env.local` inside the `Backend/` directory and set up your local variables:
```env
APP_STATE=DEVLOPEMENT
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hingedev
JWT_SECRET=your_32_characters_long_jwt_secret_key_here
TURNSTILE_SECRET=your_cloudflare_turnstile_secret_key
CLOUDFLARE_TURNSTILE_API=https://challenges.cloudflare.com/turnstile/v0/siteverify
```

### 3. Run the Server

* **Development Mode** (reloads automatically using `nodemon`):
  ```bash
  npm run dev
  ```
* **Production Mode**:
  ```bash
  npm start
  ```
