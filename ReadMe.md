# 📋 Tasko - Smart Task Management

> Boost productivity with gamified task management and interactive features

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge)](https://tasko-client-ten.vercel.app/)
[![API](https://img.shields.io/badge/API-Active-blue?style=for-the-badge)](https://tasko-server-side.vercel.app/)

## 🚀 Quick Demo
**Email:** `user@example.com` | **Password:** `123456`

## ✨ Features

- 📝 **Smart Task Management** - Create, edit, delete with categories & priorities
- 🎮 **Gamification** - Earn points, spin wheel for random task selection
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔐 **Secure Auth** - JWT authentication with password reset
- ⚡ **Real-time Updates** - Instant UI updates with React Query

## 🛠️ Tech Stack

**Frontend:** Next.js 14 • TypeScript • TailwindCSS • HeroUI  
**Backend:** Node.js • Express • MongoDB • JWT  
**Tools:** React Query • Zod • Nodemailer

## ⚡ Quick Start

```bash
# Clone & Install
git clone https://github.com/habib-153/Softvence.git
cd Softvence

# Server
cd Server && npm install && npm run dev

# Client (new terminal)
cd Client && npm install && npm run dev
```

**Environment Setup:**
```env
# Server/.env
Check .env.example in server folder

# Client/.env.local  
NEXT_PUBLIC_BASE_API=https://tasko-server-side.vercel.app/api/v1
JWT_ACCESS_SECRET=your_secret
NEXT_PUBLIC_JWT_ACCESS_EXPIRES_IN=7d
```

## 🎯 Key Highlights

- **Spin Wheel**: Interactive task category selection
- **Points System**: Gamified task completion
- **Modern UI**: Beautiful, intuitive interface
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized with caching & SSR


---

<p align="center">
  <strong>Made with ❤️ for productivity enthusiasts</strong><br>
  <a href="https://tasko-client-ten.vercel.app/">Live Demo</a> • 
  <a href="https://tasko-server-side.vercel.app/">API</a> • 
  <a href="#-quick-start">Quick Start</a>
</p>