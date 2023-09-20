import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/prisma/prisma";
import bcryptjs from "bcryptjs";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { generateFromEmail } from "unique-username-generator";
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
          return null;
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.username = user.username;
        token.image = user.image;
        token.idImage = user.idImage;
      }

      if (account?.provider === "google") {
        const data: any = {
          name: user.name,
          email: user.email,
          image: user.image,
        };

        const userDb = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!userDb) {
          const username = generateFromEmail(data.email, 4);

          const password = await bcryptjs.hash(username, 10);

          const newUser = await prisma.user.create({
            data: {
              name: data.name,
              username: username,
              email: data.email,
              password: password,
              image: data.image,
            },
          });

          token.id = newUser.id;
          token.name = newUser.name;
          token.email = newUser.email;
          token.username = newUser.username;
          token.image = newUser.image;
          token.idImage = newUser.idImage;
        } else {
          token.id = userDb.id;
          token.name = userDb.name;
          token.email = userDb.email;
          token.username = userDb.username;
          token.image = userDb.image;
          token.idImage = userDb.idImage;
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.idImage = token.idImage;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
