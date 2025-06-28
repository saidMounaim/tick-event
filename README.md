# 🎟️ TickEvent

**TickEvent** is a clean, minimal event-sharing and ticketing web app built with **Next.js**, **Prisma**, **BetterAuth**, and **ShadCN/UI**. Users can create events, upload images, sell tickets via Stripe, and track orders—all.

## 🚀 Live Demo

🔗 [https://tick-event.vercel.app](https://tick-event.vercel.app)

---

## ✨ Features

- 🔐 Sign up / Sign in with BetterAuth
- 🎉 Create events with title, image, price, and ticket count
- 📸 Upload images using ImageKit
- 💳 Buy tickets with secure Stripe Checkout
- 📊 View your ticket orders in your personal dashboard
- 💅 Fully responsive, clean design using ShadCN/UI and Tailwind CSS

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [BetterAuth](https://www.better-auth.com/)
- [Stripe](https://stripe.com/) — payments
- [ImageKit](https://imagekit.io/) — image uploads

---

## 🛠 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/saidMounaim/tick-event.git
cd tick-event
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgresql://..."

# BetterAuth
BETTER_AUTH_BASE_URL="https://tick-event.vercel.app"
BETTER_AUTH_SECRET="your_betterauth_secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# ImageKit
IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_id"

# App
NEXT_PUBLIC_APP_URL="https://tick-event.vercel.app"
```

### 4. Start the dev server

```bash
npm run dev
```

---

## 💼 Contribution

All contributions are welcome!  
Fork the repo, create a new branch, and submit a pull request.
