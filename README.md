# 🛒 Shop Fullstack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-00758F?style=for-the-badge&logo=mongodb&logoColor=green)

A backend-focused online shop built with Node.js, Express, EJS, and MongoDB.
The application uses a MongoDB database connection and follows the **MVC (Model-View-Controller)** pattern.

---

## ✨ Features

### 🛍️ Shop

- **Browse Products:** View all products on the main shop page.
- **Product Details:** View detailed product pages.
- **Shopping Cart:** Add products, update quantities, and remove items.
- **Orders:** Place orders and view past order history.

### ⚙️ Admin

- **Create Products:** Add new products with title, price, description, and image URL.
- **Edit Products:** Update existing product details.
- **Delete Products:** Remove products from the store.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **View Engine:** EJS
- **Driver:** MongoDB Native Driver
- **Database:** MongoDB
- **Environment:** dotenv
- **Middleware:** body-parser

---

## 📁 Project Structure

```text
shop-fullstack-mongodb/
├── config/         # Application configuration (database, server settings)
├── controllers/    # Route handlers and page controllers
├── models/         # MongoDB models for database entities
├── routes/         # Route definitions for admin, shop, and products
├── public/         # Static assets (CSS, client-side JS)
├── views/          # EJS templates for rendering pages
├── data/           # Local JSON files used by some data helpers
├── utils/          # Utility helpers and error handling
├── server.js       # Main application entry point
├── package.json    # Project metadata and dependencies
└── .env            # Local environment variables (not committed)
```

---

## 🔧 Environment Variables

The app requires a local or remote MongoDB instance and the following environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

Create a `.env` file in the project root before running the app.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- A running MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd shop-fullstack-mongodb
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the required database values.

### Running the Application

Start the server:

```bash
npm start
```

Open the app at `http://localhost:3000`
