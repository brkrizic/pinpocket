# 🔐 Next.js Authentication with Redis + JWT

A authentication system using **Next.js App Router**, **Redis**, and **JWT**.  
This project combines **server-managed sessions** and **stateless JWTs** for a secure, scalable hybrid setup.

---

## 🚀 Features

- ✅ **JWT Authentication** – Protects Next.js page routes via middleware.  
- 🔒 **Redis Sessions** – Stores `sessionId → userId` mappings for API route protection.  
- ⚡ **Hybrid Auth Model** – Combines frontend JWTs and backend Redis sessions.  
- 🍪 **Secure Cookies** – `httpOnly`, `secure`, and `SameSite` options enabled.  
- ⏱️ **Auto Expiration** – Sessions auto-expire in Redis (7 days).  
- 🔁 **Logout Mechanism** – Clears JWT + removes Redis session.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
