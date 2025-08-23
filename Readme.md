# 📌 MERN Chat Application

A **full-stack MERN (MongoDB, Express, React, Node.js)** chat application with real-time messaging, secure authentication, dynamic user profiles, and responsive design. This project demonstrates advanced full-stack development, handling backend, frontend, and real-time communication seamlessly.

---

## 🚀 Key Features & Functionality

- 🔐 **Secure Authentication & Authorization**  
  - JWT-based login/signup with hashed passwords using Bcrypt.  
  - Ensures top-level security for user data.

- 👤 **Dynamic User Profiles**  
  - Personal profiles with bio and profile picture.  
  - Supports default avatars and cloud-hosted images.  
  - Intelligent handling of profile pictures (backend vs external).

- 💬 **Real-time Messaging System**  
  - One-to-one chat functionality with instant updates using WebSockets / Socket.io.  
  - Messages are stored in the backend and can be retrieved anytime.  
  - Auto-scrolls and updates message lists dynamically.

- 🖼️ **Intelligent Media Handling**  
  - Detects default vs custom profile pictures.  
  - Serves backend-hosted images only when necessary.  
  - Smooth user experience with no broken images.

- 📡 **Robust REST API**  
  - Structured endpoints for users, messages, and authentication.  
  - Handles CRUD operations and ensures secure data access.

- 📱 **Responsive & Interactive Frontend**  
  - React + Vite frontend with conditional rendering.  
  - Inline profile picture handling and smooth interactions.  
  - Works seamlessly across devices.

- ✅ **Enhanced User Experience**  
  - Real-time notifications for new messages.  
  - Optimized UI for chat interactions.  
  - Clean, professional design.

---

## 🛠️ Tech Stack

**Frontend:** React, Vite, TailwindCSS/Bootstrap, Axios  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt, Cloudinary (optional)  
**Real-time Communication:** Socket.io / WebSockets

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Backend Setup

- 1 Navigate to the backend folder and install dependencies:
``` bash
cd backend
npm install
```
- 2 Create .env in backend/:

```bash Create a .env file in the backend/ folder with the following content:
PORT=8000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url   # if using Cloudinary
```

- 3 Run the backend server:
```bash
npm run dev
```

### 3️⃣ Frontend Setup

- 1 Navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```

- 2 Create a .env file in the frontend/ folder with the following content:
```bash
VITE_BACKEND_URL=http://localhost:8000
Run the frontend server:
npm run dev
```
