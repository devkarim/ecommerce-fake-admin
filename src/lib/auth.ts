import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

import prismadb from '@/lib/prisma';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await prismadb.user.findUnique({
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
        const { email, name } = profile;
        const user = await prismadb.user.findUnique({
          where: { email },
        });
        if (!user) {
          await prismadb.user.create({ data: { email, name } });
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
