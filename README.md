# MERN App 🚀

A full-stack **MERN (MongoDB, Express, React, Node.js)** application with separate backend and frontend.


## 📂 Project Structure
root/ server/ # Node.js + Express API
root/ client/ # React


## Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/shekhrbhardwaj/Task_Management_App.git
cd your-repo
```
### 2. Setup Backend
```bash

cd server
cp .env.example .env
npm install
npm run dev             
```
### 3. Setup Client
```bash
cd client
cp .env.example .env    
npm install
npm run dev             
```
## 4 Env variables server
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your_jwt_secret
```
### 5 Env variables client
```bash
# server Url 
VITE_API_BASE_URL=http://localhost:5000
```




