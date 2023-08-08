import { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/lib/prisma';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: 'read:user user:email' } },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { scope: 'profile email' } },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.given_name,
          email: profile.email,
          image: profile.picture,
        };
      },
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
    async signIn({ user: profile }) {
      if (!profile || !profile.email) return false;
      try {
        const { email, name, image: imageUrl } = profile;
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          await prisma.user.create({ data: { email, name, imageUrl } });
        }
        if (!user?.imageUrl && imageUrl) {
          await prisma.user.update({
            where: { email },
            data: { imageUrl },
          });
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
