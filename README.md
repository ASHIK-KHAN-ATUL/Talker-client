# 🗨️ Talker - AI-Free Social Microblogging Platform

**Talker** is a full-stack social microblog/chat platform built with React, Vite, Node.js, Express, and MongoDB. It allows users to share posts, interact with others, view profiles, and manage their own information. The platform supports profile privacy, dark mode, and responsive UI — all without any AI dependency.

---

## 🚀 Tech Stack

- ⚛️ React + Vite (Frontend)
- 🎨 Tailwind CSS (Styling)
- 🌐 Express.js (Backend)
- 🍃 MongoDB (Database)
- 🔒 JWT Authentication
- 📦 TanStack React Query
- 🔁 Axios for API Calls

---

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 👤 Profile System (Cover + Avatar)
- 📝 Microblog Posts (Text + Image)
- ❤️ Like / 💬 Comment system
- 🔄 Dark/Light Mode toggle
- 📱 Fully Responsive UI
- 👁️ Visit Other Users’ Profile by Clicking Post Author's Image
  - 🔄 View Posts, Photos, Followers, Following
  - ℹ️ If profile is locked, user content is hidden
- 🙋‍♂️ View Your Own Profile and Information
  - ✏️ Edit Personal Info (name, bio, birthdate, etc.)

---

🛠 Backend Overview (API)
Note: Backend runs in a separate repository/project

🧑 User Management (Profile CRUD, Follow System)

📄 Post Management (Post CRUD, likes, comments)

🔐 JWT-Based Protected Routes

📸 Media upload via public URLs

Ensure your .env contains the correct base URL for API calls.

🧑‍💻 Developer Notes
All user and profile operations are role-less (general user-based)

Profile lock system is enforced in UI for privacy

You can expand this with chat, notifications, or AI in the future

