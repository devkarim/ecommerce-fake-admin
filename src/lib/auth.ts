import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import prisma from '@/lib/prisma';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (!sessionUser) return session;
      session.user.id = sessionUser.id;
      session.user.isAuthenticated = true;
      return session;
    },
    async signIn({ profile }) {
      if (!profile || !profile.email) return false;
      try {
        const { email, name, image: imageUrl } = profile;
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          await prisma.user.create({ data: { email, name, imageUrl } });
        }

        return true;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error signing in: ', error.message);
        }
        return false;
      }
    },
  },
};
