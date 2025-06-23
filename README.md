# 🌐 ConnectMe – Frontend

**ConnectMe** is a responsive and dynamic full-stack **MERN-based social media web application**, inspired by key features of Instagram.

Built using **React**, this frontend enables users to:
- Sign in (manual or via Google)
- Share and manage posts
- Follow/unfollow users
- Chat in real-time
- Use mobile-friendly interfaces with a clean UI

This is the **frontend capstone project** complementing the [`ConnectMe_Backend`](https://github.com/omkhot/ConnectMe_Backend).

---

## 🚀 Features

- 🌐 Responsive React UI with **Tailwind CSS**
- 🔐 Manual and Google OAuth login/registration
- 🏠 Personalized dashboard and timeline feed
- 📸 Post creation, editing, deletion, and bookmarking
- ❤️ Like and comment on posts
- 🗣 Real-time messaging using **Socket.IO**
- 👤 Public/private profile toggle and editable user dashboard
- 💾 Save/unsave posts
- 📺 Instagram-style story viewer
- 🚪 Logout and delete account features
- ☁️ Cloudinary integration for image upload

---

## 🛠 Tech Stack

- **React.js**
- **React Router DOM**
- **Axios**
- **Tailwind CSS**
- **Socket.IO Client**
- **Google OAuth**
- **Cloudinary** (via backend)

---

## 📁 Folder Structure

ConnectMe_Frontend/
│
├── public/ # Static files
├── src/
│ ├── assets/ # Images, icons, and videos
│ ├── Atoms/ # Small reusable UI components
│ ├── Molecules/ # Medium reusable UI components
│ ├── Organs/ # Large reusable UI components
│ ├── Pages/ # Route-based screens
│ ├── Contexts/ # Global state using Context API
│ ├── Axios/ # Axios-based API service layer
│ ├── Hooks/ # Custom hooks
│ ├── Utils/ # Helper utility functions
│ ├── App.jsx # Main routing and layout
│ ├── main.jsx # Entry point
│ └── index.css # Global styles
├── .env # Environment variables
├── .gitignore
└── README.md

---

## 📸 Screenshots

### 🔐 Login Page
![Login Page](../Frontend/ScreenShots/laptop_login.png)

### 🏠 Home Feed
![Home Page](../Frontend/ScreenShots/laptop_home.png)
![Home Page](../Frontend/ScreenShots/mobile_home.jpg)

### 👤 Profile
![Profile](../Frontend/ScreenShots/mobile_profilepage.jpg)
![Profile](../Frontend/ScreenShots/laptop_profile.png)

### Chats
![Chats](../Frontend/ScreenShots/mobile_chats.jpg)
![Chats](../Frontend/ScreenShots/mobile_msg.jpg)


## 🔧 Installation & Setup

### 📦 Prerequisites

- Node.js and npm installed
- Backend (`ConnectMe_Backend`) running
- Cloudinary API keys (set on backend)
- Google OAuth client credentials 

---

### 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/omkhot/ConnectMe_Frontend.git
cd ConnectMe_Frontend

# Install dependencies
npm install

# Start the development server
npm run dev

```

### Environment Variables
-create the .env file with-
VITE_BACKEND_URL=your_backend_url

---

## Deployment:
- Deployed on Vercel
- Deployed Link: https://connect-me-frontend-6srt.vercel.app/


