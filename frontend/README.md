🍽️ MERN Restaurant Ordering System

A Full-Stack Restaurant Ordering Web Application built using the MERN Stack:

MongoDB

Express.js

React.js

Node.js

This application simulates a modern online food ordering platform where users can browse menu items, add food to their cart, place orders, and track their order history through a clean and responsive interface.

🚀 Features
👤 User Features

Browse restaurant menu items

View food item details

Add items to cart

Increase or decrease item quantity

Remove items from cart

Checkout and place orders

Choose payment method

View previous order history

Fully responsive UI for mobile and desktop

🛒 Cart System

The cart functionality allows users to manage their selected food items.

Features include:

Add items to cart

Update item quantity

Remove items from cart

Real-time cart updates

Automatic price calculation

Display subtotal and total price

📦 Order Management

The system stores and manages food orders.

Capabilities:

Create new orders

Store orders in MongoDB database

Display user order history

Track order status

Retrieve order details

🔐 Authentication & Security

User authentication ensures secure access to features.

User registration

User login

JWT authentication

Protected backend routes

Secure user data management

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Axios

React Router DOM

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

Development Tools

Git

GitHub

Postman

VS Code / Cursor AI

📂 Project Structure
restaurant-project
│
├── backend
│ │
│ ├── controllers
│ │ ├── cartController.js
│ │ ├── orderController.js
│ │
│ ├── models
│ │ ├── User.js
│ │ ├── FoodItem.js
│ │ ├── Order.js
│ │
│ ├── routes
│ │ ├── cartRoutes.js
│ │ ├── orderRoutes.js
│ │
│ ├── middleware
│ │ ├── authMiddleware.js
│ │
│ └── index.js
│
├── frontend
│ │
│ ├── src
│ │ │
│ │ ├── components
│ │ │ ├── Navbar.jsx
│ │ │ ├── FoodCard.jsx
│ │ │
│ │ ├── pages
│ │ │ ├── Home.jsx
│ │ │ ├── Cart.jsx
│ │ │ ├── Checkout.jsx
│ │ │ ├── Orders.jsx
│ │ │
│ │ ├── context
│ │ │ ├── CartContext.jsx
│ │ │
│ │ └── App.jsx
│ │
│ └── package.json
│
└── README.md
⚙️ Installation & Setup

Follow these steps to run the project locally.

1️⃣ Clone the Repository
git clone https://github.com/yourusername/restaurant-project.git
2️⃣ Install Backend Dependencies
cd backend
npm install
3️⃣ Install Frontend Dependencies
cd frontend
npm install
4️⃣ Configure Environment Variables

Create a .env file inside the backend folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
5️⃣ Start Backend Server
npm start

Server will run on:

http://localhost:5000
6️⃣ Start Frontend Application
npm run dev

Frontend will run on:

http://localhost:5173
🌐 API Endpoints
Cart APIs
Method Endpoint Description
POST /api/cart/add Add item to cart
POST /api/cart/remove Remove item from cart
GET /api/cart/:userId Get user cart
Order APIs
Method Endpoint Description
POST /api/orders/create Create order
GET /api/orders/user/:userId Get user orders
📸 Screenshots

Add screenshots of your application here.

Examples:

Home Page

Menu Page

Cart Page

Checkout Page

Orders Page

🎯 Future Improvements

Planned features for future updates:

Razorpay / Stripe payment integration

Real-time order tracking

Admin dashboard

Restaurant analytics

Coupon & discount system

Order rating system

📚 Learning Outcomes

This project helped in understanding:

Full-stack application development using MERN

Building RESTful APIs

Implementing secure authentication

Managing state in React

Designing scalable backend architecture

👨‍💻 Author

Ritanshu Nijhawan

MCA Student | Full Stack Developer

GitHub
https://github.com/yourusername

LinkedIn
(Add your LinkedIn profile link)

⭐ Support

If you found this project useful:

⭐ Star the repository on GitHub
🍴 Fork the project to build upon it
