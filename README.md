# Online Shop "Candleaf" 🌿

A clean, nature-inspired e-commerce application designed to provide a seamless shopping experience for organic products. The project focuses on minimalist aesthetics combined with backend functionality, including product management, authentication, and shopping cart logic.

Developed using Node.js and Express.js, the app handles dynamic product catalogs, detailed item views, and a functional shopping cart system, ensuring smooth communication between the user interface and server-side logic.

Approximately [![wakatime](https://wakatime.com/badge/user/7898c8e2-6b19-4825-b1c2-bbaaba8cace0/project/9087dd26-2c32-4331-a365-95e27617a54a.svg)](https://wakatime.com/badge/user/7898c8e2-6b19-4825-b1c2-bbaaba8cace0/project/9087dd26-2c32-4331-a365-95e27617a54a) of coding time were tracked during the development of this project.

The main focus areas included:

- Express.js application structure
- database integration and Sequelize models
- authentication and authorization
- product and cart functionality
- security implementation
- deployment configuration

## 🔹 Features

- Browse a dynamic product catalog
- View detailed product pages with descriptions and images
- Add, remove, and update items in the shopping cart
- Clean and minimalist EJS/HTML frontend
- Database integration with MySQL
- User authentication with sessions
- Password reset functionality via email
- Protected admin routes
- User-based product ownership validation
- CSRF protection for forms

## 🔹 Tech Stack

**Frontend**: EJS, HTML5, CSS3, JavaScript (ES6+)

**Backend**: Node.js, Express.js

**Data storage**: MySQL Database to the TiDB Cloud

**API**: RESTful routes for products and cart

## 🔹 Deployment

**Backend**: Render

**Database**: MySQL (hosted on TiDB Cloud)

**ORM**: Sequelize

**Environment variables** used for secure configuration

## 🔹 Project Structure

The application follows an MVC-style architecture:

- `routes` — application routes
- `controllers` — business logic
- `models` — Sequelize database models
- `views` — EJS templates
- `middleware` — authentication and security middleware

## 🔹 Security

Implemented:

- Session-based authentication

- Password hashing with bcrypt

- CSRF protection

- Protected routes and authorization checks

- Environment variables for sensitive data

## 🔹 Screenshots / Demo

<img width="1919" height="1000" alt="image" src="https://github.com/user-attachments/assets/0ead33f2-dc62-4590-9e50-a8eb23ad3279" />

<img width="1919" height="1002" alt="image" src="https://github.com/user-attachments/assets/38d05e4e-32e6-4f8a-9922-249fa7c1068a" />

**Live Demo:** [Link to deployed version](https://candleaf2.onrender.com/)

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

- Admin panel for managing products and orders

- Search and filter functionality for products

- Order management system

- Checkout and payment integration

- Product search and filtering

- User order history

- Improved product reviews system

## 🔹 Contributing

Contributions are welcome! Feel free to open issues or pull requests to improve the project.
