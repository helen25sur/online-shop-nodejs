# Online Shop "Candleaf" 🌿

A clean, nature-inspired e-commerce application designed to provide a seamless shopping experience for organic products. The project focuses on minimalist aesthetics combined with backend functionality, including product management, authentication, and shopping cart logic.

Developed using Node.js and Express.js, the app handles dynamic product catalogs, detailed item views, and a functional shopping cart system, ensuring smooth communication between the user interface and server-side logic.

[![wakatime](https://wakatime.com/badge/user/7898c8e2-6b19-4825-b1c2-bbaaba8cace0/project/9087dd26-2c32-4331-a365-95e27617a54a.svg)](https://wakatime.com/badge/user/7898c8e2-6b19-4825-b1c2-bbaaba8cace0/project/9087dd26-2c32-4331-a365-95e27617a54a) 

Coding time tracked during development of this project.

### The main focus areas included:

- Express.js application structure
- database integration and Sequelize models
- authentication and authorization
- product and cart functionality
- security implementation
- deployment configuration

## 🔹 Features

### Customer functionality
- Browse product catalog
- View product details
- Add, remove, and update cart items

### User & security functionality
- Session-based authentication
- Password reset via email
- CSRF protection
- Protected routes

### Product management
- Create, edit, and delete products
- User-based product ownership validation

## 🔹 Tech Stack

**Frontend**: EJS, HTML5, CSS3, JavaScript (ES6+)

**Backend**: Node.js, Express.js

**Data storage**: MySQL Database to the TiDB Cloud

**API**: RESTful routes for products and cart

**Authentication**: Express sessions, bcrypt, CSRF protection

**Email**: Nodemailer

## 🔹 Deployment

**Backend**: Render

**Database**: MySQL-compatible TiDB Cloud

**ORM**: Sequelize

**Environment variables** used for secure configuration

## 🔹 Project Structure

The application follows an MVC-style architecture:

- `routes` — application routes
- `controllers` — business logic
- `models` — Sequelize database models
- `views` — EJS templates
- `middleware` — authentication and security middleware
- `db` — database connection setup

## 🔹 Security

Implemented:

- Session-based authentication

- Password hashing with bcrypt

- CSRF protection

- Protected routes and authorization checks

- Environment variables for sensitive data

## 🔹 Screenshots / Demo

### **Live Demo:** [Link to deployed version](https://candleaf2.onrender.com/)

### Home Page
<img width="1919" height="1000" alt="main page" src="https://github.com/user-attachments/assets/0ead33f2-dc62-4590-9e50-a8eb23ad3279" />

### Product Catalog
<img width="1919" height="1002" alt="product catalogue" src="https://github.com/user-attachments/assets/38d05e4e-32e6-4f8a-9922-249fa7c1068a" />

### Shopping Cart
<img width="1919" height="1002" alt="cart" src="https://github.com/user-attachments/assets/ac709582-50bd-44bf-b615-9b8dbfb25106" />




## 🔹 Getting Started (Local Setup)

Clone the repository:

`git clone https://github.com/helen25sur/online-shop-nodejs.git`

`cd online-shop-nodejs`

Install dependencies:

`npm install`

Start the server:

`npm start`

Open your browser and navigate to:

http://localhost:3000

## 🔹 Future Features

- Search and filter functionality for products

- Order management system

- Checkout and payment integration

- User order history

- Improved product reviews system

## 🔹 Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the project.
