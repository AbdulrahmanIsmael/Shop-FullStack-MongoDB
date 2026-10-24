# 🛒 Shop Fullstack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A backend-focused online shop built with **Node.js**, **Express.js**, **EJS**, and **MongoDB** using **Mongoose ODM**. The application follows the **MVC (Model-View-Controller)** architectural pattern and features database-persisted sessions, full authentication, shopping cart and order workflows, an administrative management suite, and serverless deployment support.

---

## ✨ Features

### 🛍️ Customer Shop
- **Home & Product Catalog:** Browse available products on the homepage and products list page.
- **Product Details:** Inspect detailed product views with descriptions, pricing, stock, and imagery.
- **Shopping Cart:** Add products, update quantities dynamically, calculate order totals, and remove items.
- **Orders:** Place orders from cart items and review past order history with timestamps.

### ⚙️ Admin Management
- **Product Creation:** Add products with title, price, quantity, description, and image URL (attributed to the admin user).
- **Product Management:** Dedicated admin dashboard to view and manage all inventory.
- **Edit Products:** Update product information through pre-populated edit forms.
- **Delete Products:** Permanently remove products from the store.

### 🔐 Authentication & Sessions
- **Sign Up:** Register new user accounts with password confirmation checks.
- **Log In / Log Out:** User authentication and session lifecycle management.
- **MongoDB Session Persistence:** Sessions saved in MongoDB using `connect-mongodb-session`.
- **Dynamic UI State:** Navigation bars and available actions adapt dynamically based on authentication state (`isAuth`).

---

## 🛠️ Tech Stack

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/) (v5)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **ODM:** [Mongoose](https://mongoosejs.com/)
- **View Engine:** [EJS](https://ejs.co/) (Embedded JavaScript templates)
- **Session Management:** `express-session` & `connect-mongodb-session`
- **Environment Configuration:** `dotenv`
- **Deployment:** [Vercel](https://vercel.com/) (configured via `vercel.json`)
- **Dev Tooling:** `nodemon`

---

## 📁 Project Structure

```text
shop-fullstack-mongodb/
├── public/                 # Static assets served by Express
│   └── css/                # Page-specific and component stylesheets
├── src/
│   ├── config/             # App configuration and environment variables
│   │   └── env.js
│   ├── controllers/        # Route controllers (MVC pattern)
│   │   ├── admin.js        # Admin operations (add, edit, delete products)
│   │   ├── auth.js         # Authentication logic (login, signup, logout)
│   │   ├── error.js        # 404 page handler
│   │   ├── products.js     # Public product browsing
│   │   └── shop.js         # Cart, orders, and checkout logic
│   ├── models/             # Mongoose schemas & data models
│   │   ├── order.js        # Order model with embedded product snapshots
│   │   ├── product.js      # Product schema with creator reference
│   │   └── user.js         # User schema with cart methods
│   ├── routes/             # Express route definitions
│   │   ├── admin.js        # /admin/* endpoints
│   │   ├── auth.js         # /login, /signup, /logout endpoints
│   │   ├── products.js     # /products endpoints
│   │   └── shop.js         # Shop and order endpoints
│   ├── utils/              # Helper utilities and error handling
│   │   ├── errorHandler.js
│   │   └── path.js
│   ├── views/              # EJS server-rendered templates
│   │   ├── admin/          # Admin views (form-product, products list)
│   │   ├── auth/           # Auth views (login, signup)
│   │   ├── includes/       # Reusable layout partials (header, footer, etc.)
│   │   ├── shop/           # Shop views (index, cart, orders, product details)
│   │   └── 404.ejs         # Error page template
│   └── server.js           # Express app setup and server entry point
├── .env.example            # Sample environment variables
├── eslint.config.cjs       # ESLint configuration
├── package.json            # Project dependencies and npm scripts
└── vercel.json             # Vercel deployment configuration
```

---

## 🚦 Routes & Endpoints

| Area | Method | Path | Description |
|---|---|---|---|
| **Shop** | `GET` | `/` | Shop landing page |
| **Shop** | `GET` | `/cart` | View current user's shopping cart |
| **Shop** | `POST` | `/cart` | Add product to shopping cart |
| **Shop** | `POST` | `/delete-from-cart` | Remove item from shopping cart |
| **Shop** | `GET` | `/orders` | View user's completed orders |
| **Shop** | `POST` | `/orders` | Place order from cart items |
| **Products** | `GET` | `/products` | List all available products |
| **Products** | `GET` | `/products/:productId` | View details for a single product |
| **Auth** | `GET` | `/login` | Render login form |
| **Auth** | `POST` | `/login` | Process user login & establish session |
| **Auth** | `GET` | `/signup` | Render signup form |
| **Auth** | `POST` | `/signup` | Create a new user account |
| **Auth** | `POST` | `/logout` | End session and log out user |
| **Admin** | `GET` | `/admin/products` | View all products in admin catalog |
| **Admin** | `GET` | `/admin/add-product` | Render form to create a new product |
| **Admin** | `POST` | `/admin/add-product` | Save new product to database |
| **Admin** | `GET` | `/admin/edit-product/:productId` | Render edit form for a product |
| **Admin** | `POST` | `/admin/edit-product` | Update an existing product |
| **Admin** | `POST` | `/admin/delete-product/:productId` | Delete a product from inventory |

---

## 🔧 Environment Variables

Create a `.env` file in the project root by copying `.env.example`:

```bash
cp .env.example .env
```

Configure the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret_key
```

- `PORT`: Port number the server listens on (defaults to `3000`).
- `MONGODB_URI`: MongoDB connection string (Local or [MongoDB Atlas](https://www.mongodb.com/atlas)).
- `SESSION_SECRET`: Secret key used by `express-session` to sign the session ID cookie.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- A running MongoDB instance ([MongoDB Atlas](https://www.mongodb.com/atlas) or local MongoDB)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AbdulrahmanIsmael/Shop-FullStack-MongoDB.git
   cd Shop-FullStack-MongoDB
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file as described in the [Environment Variables](#-environment-variables) section.

### Running the Server

- **Development mode (with auto-reload via nodemon):**

  ```bash
  npm run dev
  ```

- **Production mode:**

  ```bash
  npm start
  ```

Once started, access the application at `http://localhost:3000`.

---

## ☁️ Deployment

The project is configured for deployment on [Vercel](https://vercel.com/) via `vercel.json`:

- The app exports `module.exports = app` in `src/server.js` for serverless execution.
- View templates (`src/views/**/*`) are included via Vercel function configuration.
- Set `MONGODB_URI` and `SESSION_SECRET` in your Vercel project's Environment Variables settings.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

Author: **Abdulrahman Ismael**
