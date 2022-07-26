/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import prisma from '../../../../lib/prisma';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }: any) {
      const userConnected = await prisma.user.findFirst({
        where: {
          // @ts-ignore
          email: session.user?.email,
        },
      });
      // eslint-disable-next-line no-param-reassign
      session.user.id = userConnected?.id;

      // Send properties to the client, like an access_token from a provider.

      return session;
    },
  },
});
