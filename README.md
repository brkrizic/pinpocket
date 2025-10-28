# 🔐 Next.js Authentication with Redis + JWT

A authentication system using **Next.js App Router**, **Redis**, and **JWT**.  
This project combines **server-managed sessions** and **stateless JWTs** for a secure, scalable hybrid setup.

---

## 🚀 Features

1️⃣ Login Flow (Google + Redis)

User clicks Login with Google.

NextAuth handles the OAuth flow:

Gets OAuth access token + refresh token from Google.

NextAuth calls your signIn callback:

You check/create the user in MongoDB.

You call createSession(userId) → stores a refresh token in Redis + generates access token cookie.

Browser now has:

accessToken cookie (JWT) → used for API calls.

refreshToken cookie → used to refresh access token in Redis.

2️⃣ Access Token Refresh

Your backend validates the access token on each request.

When it expires:

Client sends the refresh token cookie to your /api/auth/refresh endpoint.

Backend checks Redis for that refresh token.

If valid → generate new access token, optionally update expiry in Redis.

NextAuth doesn’t interfere here — Redis is authoritative.

3️⃣ Logout

You call your /api/auth/logout endpoint:

Deletes Redis refresh token.

Clears cookies (accessToken, refreshToken).

Optionally call signOut() from NextAuth → invalidates OAuth session.


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
