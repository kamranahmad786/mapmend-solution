<div align="center">

# 🌐 MapMend Solution

### _Elevate Your Business Online_

A full-stack **SaaS platform** for local businesses — offering AI-powered website audits, Google Maps SEO optimization, Razorpay-integrated payments, PDF invoice generation, and a premium client + admin dashboard.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payments-0C2451?logo=razorpay&logoColor=white)](https://razorpay.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

**MapMend Solution** is a production-ready **monorepo** web application built for a digital agency that helps local businesses grow online. The platform provides:

- A **marketing website** with hero, services, pricing, testimonials, FAQ, blog, and contact sections.
- A **client dashboard** where registered users can track their websites, view AI-driven SEO analysis, manage invoices, and submit reviews.
- A **full admin panel** for managing users, leads (contact form submissions), websites, payments (online + manual/offline), testimonials, and system metrics.
- **Razorpay payment gateway** integration with webhook support, signature verification, and automated PDF invoice generation.
- **Gemini AI integration** for real-time SEO, speed, and Google Maps performance scoring with actionable recommendations.
- **Transactional email system** via Nodemailer (SMTP/Gmail) with branded HTML templates for welcome emails, payment confirmations, review submissions, status updates, and admin alerts.

---

## ✨ Key Features

### 🏠 Marketing Website
| Feature | Description |
|---------|-------------|
| **Hero Section** | Animated landing with social proof (50+ partners), CTA buttons, and glassmorphism effects |
| **Services** | 6 service cards — Web Design, Google Maps SEO, Redesign, Speed Optimization, Digitization, Landing Pages |
| **Pricing** | 3-tier plans (Starter ₹2,599 / Business ₹4,999 / Enterprise ₹7,599) with live Razorpay checkout |
| **Testimonials** | Dynamic reviews fetched from DB — users submit, admin approves |
| **Blog** | Markdown-powered blog with `react-markdown` and GFM support |
| **City Landing Pages** | SEO-optimized pages for Udaipur, Jaipur, Kota, Delhi, Mumbai |
| **Contact Form** | Saves to DB inbox + sends branded auto-reply email + admin alert |
| **Chatbot** | Floating rule-based FAQ chatbot with WhatsApp integration |
| **SEO** | `react-helmet-async` for dynamic meta tags on every page |
| **Policy Pages** | Refund, Privacy, Terms & Conditions, and Cancellation policies |

### 👤 Client Dashboard (Protected)
| Feature | Description |
|---------|-------------|
| **Dashboard Home** | Welcome screen with quick-access cards |
| **AI Analysis** | Gemini-powered SEO / Speed / Maps scoring with recommendations, strengths, opportunities & keyword suggestions |
| **My Websites** | Track all websites with status (pending/active/completed), handover dates, scores |
| **Invoices** | View payment history, download PDF invoices |
| **Reviews** | Submit a testimonial (one per user, pending admin approval) |
| **Account** | Update name, email, and password |

### 🛡️ Admin Panel
| Feature | Description |
|---------|-------------|
| **Overview** | System metrics — total users, leads, sites, revenue, payments, recent transactions |
| **User Management** | View all users, delete users, impersonate any user to view their dashboard |
| **Leads Inbox** | All contact form submissions with status tracking (unread/read/resolved) |
| **Site Management** | Add/edit/delete websites for any user, update status, scores, handover dates + auto email status updates |
| **Payment Management** | View all payments, record manual/offline payments with PDF invoice email, process Razorpay refunds |
| **Testimonials** | View all (including unapproved), approve/edit/delete reviews, add admin reviews |

### 💰 Payment System
- **Razorpay Checkout** with order creation, signature verification, and webhook handler
- **Manual/Offline Payments** recorded by admin with auto-generated PDF invoice
- **PDF Invoice Generation** using PDFKit — professional A4 invoices with billing details, item table, totals, and authorized signature
- **Webhook Support** for high-reliability production payment capture

### 📧 Email System
- 6 branded HTML email templates with consistent dark-theme branding
- **Welcome Email** — on registration
- **Payment Confirmation** — with PDF invoice attachment
- **Contact Auto-Reply** — echoes user's message
- **Admin Contact Alert** — new lead notification  
- **Review Submitted** — confirmation to reviewer
- **Site Status Update** — when admin changes website status

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS 3.4** | Utility-first styling |
| **React Router DOM 6** | Client-side routing |
| **Framer Motion** | Animations & transitions |
| **React Icons** | Icon library (Feather, Font Awesome) |
| **Axios** | HTTP client with interceptors |
| **react-helmet-async** | Dynamic SEO meta tags |
| **react-markdown + remark-gfm** | Blog post rendering |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT (jsonwebtoken)** | Authentication & authorization |
| **bcryptjs** | Password hashing |
| **Razorpay SDK** | Payment integration |
| **PDFKit** | Invoice PDF generation |
| **Nodemailer** | Transactional email delivery |
| **Axios** | External API calls (Gemini AI, PageSpeed) |

### DevOps & Tooling
| Technology | Purpose |
|------------|---------|
| **Concurrently** | Run frontend + backend simultaneously |
| **Nodemon** | Backend hot-reload in development |
| **Render** | Backend + monorepo deployment |
| **Vercel** | Optional frontend deployment |

---

## 📁 Project Structure

```
mapmend-solution/
├── package.json                  # Root monorepo — scripts, concurrently
├── render.yaml                   # Render deployment blueprint
├── .gitignore
│
├── backend/
│   ├── server.js                 # Express entry point, route mounting, admin seed
│   ├── package.json
│   ├── .env                      # Environment variables (not committed)
│   │
│   ├── config/
│   │   └── db.js                 # MongoDB connection via Mongoose
│   │
│   ├── middleware/
│   │   └── auth.js               # JWT auth + admin role guard
│   │
│   ├── models/
│   │   ├── User.js               # name, email, passwordHash, role (user/admin)
│   │   ├── Site.js               # domain, scores, status, handoverDate
│   │   ├── Payment.js            # Razorpay order/payment IDs, amount, status
│   │   ├── Contact.js            # Contact form submissions (inbox)
│   │   └── Testimonial.js        # User reviews with approval workflow
│   │
│   ├── routes/
│   │   ├── auth.js               # Register, login, profile, password
│   │   ├── sites.js              # CRUD for user websites
│   │   ├── payments.js           # Create order, verify, webhook, invoice PDF
│   │   ├── admin.js              # Admin: users, leads, sites, payments, refunds
│   │   ├── testimonials.js       # Public list, create, admin CRUD
│   │   ├── contact.js            # Contact form submission + emails
│   │   └── ai.js                 # Gemini AI analysis endpoint
│   │
│   ├── services/
│   │   ├── ai.js                 # OpenAI/GPT integration (secondary)
│   │   ├── pagespeed.js          # Google PageSpeed Insights API
│   │   ├── razorpayService.js    # Razorpay order & refund helpers
│   │   ├── invoiceService.js     # PDFKit A4 invoice generator
│   │   └── emailTemplates.js     # 6 branded HTML email templates
│   │
│   └── utils/
│       └── mail.js               # Nodemailer transporter (Gmail/SMTP)
│
└── frontend/
    ├── package.json
    ├── vercel.json               # Vercel SPA rewrites
    ├── .env                      # VITE_API_URL, VITE_RAZORPAY_KEY
    │
    └── src/
        ├── main.jsx              # React entry point
        ├── App.jsx               # Route definitions & layout
        ├── index.css             # Tailwind + custom styles
        │
        ├── utils/
        │   ├── api.js            # Axios instance with auth + impersonation
        │   └── schema.js         # Structured data schemas
        │
        ├── hooks/
        │   └── useAuth.js        # Authentication hook
        │
        ├── components/
        │   ├── Navbar.jsx        # Global navigation
        │   ├── Hero.jsx          # Landing hero section
        │   ├── About.jsx         # About section
        │   ├── WhyChooseUs.jsx   # Trust signals section
        │   ├── Services.jsx      # Service cards
        │   ├── Process.jsx       # How it works timeline
        │   ├── Pricing.jsx       # 3-tier pricing with Razorpay checkout
        │   ├── Testimonials.jsx  # Customer reviews carousel
        │   ├── FAQ.jsx           # Accordion FAQ
        │   ├── ContactForm.jsx   # Contact form with validation
        │   ├── Footer.jsx        # Site footer
        │   ├── Chatbot.jsx       # Floating chatbot with WhatsApp
        │   ├── CityLanding.jsx   # Dynamic city-specific landing pages
        │   ├── SEO.jsx           # Meta tag helper component
        │   ├── Toast.jsx         # Toast notification system
        │   ├── Landing.jsx       # Landing page wrapper
        │   ├── DashboardSidebar.jsx   # Client dashboard sidebar
        │   ├── DashboardLoader.jsx    # Dashboard loading spinner
        │   ├── AdminSidebar.jsx       # Admin panel sidebar
        │   ├── AdminLogin.jsx         # Admin login page
        │   ├── AdminRoute.jsx         # Admin route guard
        │   └── ProtectedRoute.jsx     # Authenticated route guard
        │
        └── pages/
            ├── Login.jsx         # User login
            ├── Register.jsx      # User registration
            ├── Dashboard.jsx     # Dashboard layout with sidebar + impersonation banner
            ├── DashboardHome.jsx # Dashboard welcome page
            ├── AIAnalysis.jsx    # AI-powered SEO analysis page
            ├── MyWebsites.jsx    # User's website tracker
            ├── Invoices.jsx      # Payment history & PDF downloads
            ├── UserReviews.jsx   # Submit testimonial
            ├── Account.jsx       # Profile & password management
            ├── BlogList.jsx      # Blog listing page
            ├── PostPage.jsx      # Individual blog post
            ├── AboutPage.jsx     # Full about page
            ├── RefundPolicy.jsx
            ├── PrivacyPolicy.jsx
            ├── TermsConditions.jsx
            ├── CancellationPolicy.jsx
            ├── AdminPanel.jsx    # Admin layout with sidebar
            └── admin/
                ├── AdminOverview.jsx      # Metrics dashboard
                ├── AdminUsers.jsx         # User management
                ├── AdminLeads.jsx         # Contact inbox
                ├── AdminSites.jsx         # Website management
                ├── AdminPayments.jsx      # Payment management
                └── AdminTestimonials.jsx  # Review moderation
```

---

## 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- **npm** ≥ 9.x (comes with Node.js)
- **MongoDB Atlas** account or local MongoDB instance — [Setup Guide](https://www.mongodb.com/docs/atlas/getting-started/)
- **Razorpay** account (Test/Live keys) — [Dashboard](https://dashboard.razorpay.com/)
- **Gmail App Password** or SMTP credentials for transactional emails

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/kamranahmad786/mapmend-solution.git
cd mapmend-solution
```

### 2. Install All Dependencies

```bash
npm run install:all
```

This installs root, backend, and frontend dependencies in one command.

### 3. Configure Environment Variables

**Backend** — Create `backend/.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/mapmend?retryWrites=true&w=majority

# Auth
JWT_SECRET=your_jwt_secret_key_here

# Razorpay
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXX

# Email (Gmail App Password)
SMTP_SERVICE=gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
EMAIL_FROM=MapMend Solution <your_email@gmail.com>
EMAIL_TO=admin_alert_email@gmail.com

# Admin Seed (auto-creates admin on first run if no users exist)
ADMIN_EMAIL=admin@mapmendsolution.com
ADMIN_PASSWORD=your_admin_password

# AI (Optional — falls back to demo data if not set)
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend** — Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY=rzp_test_XXXXXXXXXXXX
```

### 4. Run in Development

```bash
# From root — starts both backend (nodemon) and frontend (vite) concurrently
npm run dev
```

Or run them separately:

```bash
# Terminal 1 — Backend
npm run dev:server    # → http://localhost:5000

# Terminal 2 — Frontend
npm run dev:client    # → http://localhost:5173
```

### 5. Access the Application

| URL | Description |
|-----|-------------|
| `http://localhost:5173` | Frontend (Vite dev server) |
| `http://localhost:5000` | Backend API |
| `http://localhost:5173/admin/login` | Admin login |
| `http://localhost:5173/dashboard` | Client dashboard (after login) |

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: `5000`) |
| `NODE_ENV` | No | `development` or `production` |
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT token signing |
| `RAZORPAY_KEY_ID` | ✅ | Razorpay Key ID |
| `RAZORPAY_KEY_SECRET` | ✅ | Razorpay Key Secret |
| `RAZORPAY_WEBHOOK_SECRET` | No | Webhook secret (falls back to KEY_SECRET) |
| `SMTP_SERVICE` | No | Set to `gmail` for Gmail |
| `SMTP_HOST` | ✅* | SMTP host (e.g., `smtp.gmail.com`) |
| `SMTP_PORT` | No | SMTP port (default: `587`) |
| `SMTP_USER` | ✅* | SMTP username / email |
| `SMTP_PASS` | ✅* | SMTP password / Gmail App Password |
| `EMAIL_FROM` | No | Sender display name |
| `EMAIL_TO` | No | Admin alert email recipient |
| `ADMIN_EMAIL` | No | Auto-seed admin account email |
| `ADMIN_PASSWORD` | No | Auto-seed admin account password |
| `GEMINI_API_KEY` | No | Google Gemini API key for AI analysis |

> \* Email sending is optional — if SMTP is not configured, emails are silently skipped.

### Frontend (`frontend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ | Backend API base URL |
| `VITE_RAZORPAY_KEY` | No | Razorpay publishable key (for frontend SDK) |

---

## 📡 API Reference

All routes are prefixed with `/api`. Authentication uses `Bearer <token>` in the `Authorization` header.

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ | Register new user (sends welcome email) |
| `POST` | `/login` | ❌ | Login → returns JWT token |
| `GET` | `/me` | ✅ | Get current user profile |
| `PUT` | `/profile` | ✅ | Update name/email |
| `PUT` | `/password` | ✅ | Change password |

### Sites — `/api/sites`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ✅ | Create a new website entry |
| `GET` | `/my` | ✅ | List authenticated user's websites |
| `GET` | `/:id` | ❌ | Get a single site by ID |

### Payments — `/api/payments`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/my` | ✅ | List user's payments |
| `POST` | `/create-order` | ✅ | Create Razorpay order for a plan |
| `POST` | `/verify` | ✅ | Verify payment signature after checkout |
| `POST` | `/webhook` | ❌ | Razorpay webhook (payment.captured event) |
| `GET` | `/:id/invoice` | ✅ | Download PDF invoice for a payment |

### Testimonials — `/api/testimonials`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ❌ | List approved testimonials (public) |
| `GET` | `/my` | ✅ | Get current user's review |
| `POST` | `/` | ✅ | Submit a review (one per user) |
| `GET` | `/all` | 🔒 | Admin: list all (including unapproved) |
| `PUT` | `/:id` | 🔒 | Admin: approve/edit a review |
| `DELETE` | `/:id` | 🔒 | Admin: delete a review |

### Contact — `/api/contact`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ❌ | Submit contact form (saves to DB + emails) |

### AI Analysis — `/api/ai`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/analyze` | ✅ | Run Gemini AI analysis on user's websites |

### Admin — `/api/admin`

> All admin endpoints require **auth + admin role**.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/metrics` | System-wide metrics (users, leads, revenue, etc.) |
| `GET` | `/users` | List all users |
| `GET` | `/users/:id` | Get user by ID |
| `DELETE` | `/users/:id` | Delete user + their sites |
| `GET` | `/contacts` | List all contact submissions |
| `PUT` | `/contacts/:id` | Update lead status |
| `GET` | `/sites` | List all sites (populated with user info) |
| `POST` | `/sites` | Create a site for any user + send status email |
| `PUT` | `/sites/:id` | Update site (status, scores, handover date) + email |
| `DELETE` | `/sites/:id` | Delete a site |
| `GET` | `/payments` | List all payments |
| `POST` | `/payments/manual` | Record manual/offline payment + send invoice email |
| `POST` | `/payments/refund` | Process Razorpay refund |

**Legend:** ❌ = Public | ✅ = Authenticated | 🔒 = Admin Only

---

## 🗄 Database Schema

### User
```javascript
{
  name:         String,
  email:        String (unique, required),
  passwordHash: String (required),
  role:         String ("user" | "admin", default: "user"),
  createdAt:    Date,
  updatedAt:    Date
}
```

### Site
```javascript
{
  user:           ObjectId → User (required),
  name:           String,
  domain:         String,
  pagespeedScore: Number,
  seoScore:       Number,
  status:         String ("pending" | "active" | "completed", default: "pending"),
  handoverDate:   Date,
  lastPaymentId:  ObjectId → Payment,
  createdAt:      Date,
  updatedAt:      Date
}
```

### Payment
```javascript
{
  user:              ObjectId → User,
  userEmail:         String,
  planId:            String,
  planTitle:         String,
  amount:            Number (in paise),
  razorpayOrderId:   String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  status:            String ("created" | "paid" | "refunded"),
  refundId:          String,
  createdAt:         Date,
  updatedAt:         Date
}
```

### Contact
```javascript
{
  name:    String (required),
  business: String,
  email:   String (required),
  phone:   String,
  message: String (required),
  status:  String ("unread" | "read" | "resolved", default: "unread"),
  createdAt: Date,
  updatedAt: Date
}
```

### Testimonial
```javascript
{
  user:     ObjectId → User,
  name:     String,
  review:   String,
  rating:   Number (default: 5),
  approved: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚢 Deployment

### Option 1: Render (Monorepo — Recommended)

The project includes a **`render.yaml`** blueprint for one-click deployment:

1. Push code to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/).
3. Click **New → Blueprint** → Connect your repo.
4. Render will auto-detect `render.yaml` and create the service.
5. Add all environment variables in the Render dashboard.

**Build & Start Commands (already configured):**
```
Build:  NODE_ENV=development npm run install:all && NODE_ENV=development npm run build
Start:  npm start
```

In production, the Express server serves the compiled frontend from `frontend/dist/`.

### Option 2: Split Deployment (Vercel + Render)

**Frontend → Vercel:**
1. Import the `frontend/` directory on [Vercel](https://vercel.com/).
2. Set `VITE_API_URL` to your Render backend URL.
3. The `vercel.json` handles SPA rewrites automatically.

**Backend → Render:**
1. Create a **Web Service** pointing to the `backend/` directory.
2. Set all backend environment variables.
3. Build: `npm install` | Start: `node server.js`

### First Admin User

On first startup, if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set in `.env` and no users exist in the database, an admin account is automatically seeded.

---

## 🖼 Screenshots

> Run the application locally to see the full UI experience including:

- 🏠 **Marketing Homepage** — Dark-themed landing with hero, animated services, pricing cards
- 📊 **Client Dashboard** — AI analysis with score rings, website tracker, invoice manager
- 🛡 **Admin Panel** — Metrics overview, user management with impersonation, lead inbox
- 💳 **Razorpay Checkout** — Secure payment flow with signature verification
- 📧 **Email Templates** — Branded dark-themed HTML emails with receipts

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kamran Ahmad**  
📧 infomapmendsolution@gmail.com  
💬 [WhatsApp: +91 7366890727](https://wa.me/917366890727)  
🌐 [mapmendsolution.com](https://mapmendsolution.com)

---

<div align="center">
  <sub>Built with ❤️ by MapMend Solution — Helping local businesses dominate the digital space.</sub>
</div>

