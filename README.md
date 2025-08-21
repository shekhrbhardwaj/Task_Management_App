# MERN App 🚀

A full-stack **MERN (MongoDB, Express, React, Node.js)** application with separate backend and frontend.


## 📂 Project Structure
root
├── server/ # Node.js + Express API
├── client/ # React (Vite/CRA)
├── .env.example # Example environment variables
└── README.md

## 🔧 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/shekhrbhardwaj/Task_Management_App.git
cd your-repo

### 2. Setup Backend

cd server
cp .env.example .env    # Copy env file and update values
npm install
npm run dev             # Start backend in dev mode

### 3. Setup Client
cd client
cp .env.example .env    # Copy env file and update values
npm install
npm run dev             # Start frontend in dev mode

### 4 Env variables server
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your_jwt_secret

### 5 Env variables cleint

# server Url 
VITE_API_BASE_URL=http://localhost:5000




