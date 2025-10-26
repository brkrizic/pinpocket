import { redis } from "@/lib/redisClient";
import { createSession } from "@/lib/token";
import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // NextAuth will issue a minimal JWT, we mainly use our own session
  },
  callbacks: {
    async signIn({ user }) {
      // 1️⃣ Find or create DB user
      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = await User.create({
          email: user.email,
          name: user.name,
          passwordHash: "", // leave empty for OAuth users
        });
      }

      // 2️⃣ Check for existing Redis session
      const existingSession = await redis.get(`refreshToken:${dbUser.id}`);
      if (!existingSession) {
        await createSession(dbUser.id); // uses your existing function
      }

      return true; // allow login
    },
    async jwt({ token, user }) {
      if (user) token.userId = user.id; // attach DB userId
      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId; // frontend can read this
      return session;
    },
  },
});

export { handler as GET, handler as POST };