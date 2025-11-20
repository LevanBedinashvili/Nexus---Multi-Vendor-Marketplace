# 🛒 Nexus Market - Multi-Vendor Marketplace

A modern, scalable Multi-Vendor E-Commerce Marketplace built with a headless architecture. This platform allows multiple vendors to create shops, manage products, and sell to customers through a unified marketplace.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Authentication](#authentication)
- [Development](#development)

## ✨ Features

### Current Features
- ✅ User Authentication (Register, Login, Logout)
- ✅ Role-Based Access Control (Admin, Vendor, Customer)
- ✅ Modern UI with Tailwind CSS
- ✅ CSRF Protection with Laravel Sanctum
- ✅ RESTful API Architecture

### Planned Features
- 🚧 Vendor Dashboard (Shop Management)
- 🚧 Product Management (CRUD Operations)
- 🚧 Shopping Cart
- 🚧 Order Management
- 🚧 Payment Integration (Stripe)
- 🚧 Search & Filtering
- 🚧 Admin Panel

## 🛠 Tech Stack

### Backend
- **Framework**: Laravel 11 (API Mode)
- **Language**: PHP 8.2+
- **Authentication**: Laravel Sanctum
- **Database**: MySQL 8.0+
- **Package Manager**: Composer

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Package Manager**: npm

### Development Tools
- **Version Control**: Git
- **Code Quality**: ESLint, Laravel Pint

## 🏗 Architecture

This project follows a **Headless Architecture** pattern:

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │    Backend      │
│   (Next.js)     │ ◄─────► │   (Laravel)     │
│   Port: 3000    │  API    │   Port: 8000    │
└─────────────────┘         └─────────────────┘
                                      │
                                      ▼
                              ┌─────────────────┐
                              │    Database     │
                              │    (MySQL)      │
                              └─────────────────┘
```

- **Frontend**: Next.js application running on port 3000
- **Backend**: Laravel API running on port 8000
- **Database**: MySQL database
- **Communication**: RESTful API with JSON responses

## 📁 Project Structure

```
Multi-Vendor MarketPlace/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/ # API Controllers
│   │   └── Models/          # Eloquent Models
│   ├── config/              # Configuration files
│   ├── database/
│   │   └── migrations/      # Database migrations
│   └── routes/
│       └── api.php          # API routes
│
├── frontend/                # Next.js Application
│   ├── app/                 # Next.js App Router
│   │   ├── login/           # Login page
│   │   ├── register/        # Register page
│   │   └── layout.tsx       # Root layout
│   ├── lib/                 # Utilities
│   │   └── axios.ts         # API client
│   └── types/                # TypeScript types
│
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL 8.0+
- XAMPP (or equivalent)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure your `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nexus_market
DB_USERNAME=root
DB_PASSWORD=

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
SESSION_DOMAIN=null
FRONTEND_URL=http://localhost:3000
DB_COLLATION=utf8mb4_unicode_ci
```

6. Run migrations:
```bash
php artisan migrate
```

7. Start the Laravel development server:
```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the Next.js development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/register` | Register a new user | No |
| POST | `/api/login` | Login user | No |
| POST | `/api/logout` | Logout user | Yes |
| GET | `/api/user` | Get authenticated user | Yes |

### Example Request (Register)

```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "role": "customer"
  }'
```

## 🗄 Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `role` - Enum: `admin`, `vendor`, `customer` (default: `customer`)
- `email_verified_at` - Timestamp
- `created_at`, `updated_at` - Timestamps

### Planned Tables
- `shops` - Vendor shop information
- `categories` - Product categories
- `products` - Product listings
- `orders` - Customer orders
- `order_items` - Order line items

## 🔐 Authentication

This project uses **Laravel Sanctum** for SPA (Single Page Application) authentication with cookie-based sessions.

### Authentication Flow

1. Frontend requests CSRF cookie from `/sanctum/csrf-cookie`
2. User submits login/register form
3. Backend validates credentials and creates session
4. Subsequent API requests include session cookie automatically
5. Protected routes check `auth:sanctum` middleware

### CSRF Protection

- CSRF tokens are automatically handled via cookies
- Frontend axios interceptor fetches CSRF cookie before POST/PUT/DELETE requests
- Tokens are included in request headers automatically

## 💻 Development

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
php artisan serve
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Code Style

- **Backend**: Laravel Pint (PHP)
- **Frontend**: ESLint (TypeScript/JavaScript)

## 📝 License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 👤 Author

**Levan Bedinashvili**

- GitHub: [@LevanBedinashvili](https://github.com/LevanBedinashvili)

---

⭐ Star this repo if you find it helpful!
