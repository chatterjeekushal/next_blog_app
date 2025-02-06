
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user"; 

interface Credentials {
  username: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GitHub provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    // Credentials provider
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<any> {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { username: credentials.username },
              { email: credentials.username }, // Allows email login as well
            ],
          });

          if (!user) {
            throw new Error("User not found with this username or email");
          }

          if (!user.isverified) {
            throw new Error("Please verify your email before login");
          }

          const isPasswordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordMatch) {
            return user;
          } else {
            throw new Error("Invalid password");
          }
        } catch (error: unknown) {
          throw new Error(error instanceof Error ? error.message : "Unknown error");
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "github") {
        await dbConnect();

        const existingUser = await UserModel.findOne({ email: user.email });

        if (!existingUser) {
          await UserModel.create({
            username: user.name || "github_",
            email: user.email,
            password: "github", // Consider using a more secure default password
            isverified: true,
            isactive: true,
          });
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isverified = user.isverified;
        token.isactive = user.isactive;
        token.username = user.username;
        token.userImage = user.userImage?.toString();
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isverified = token.isverified;
        session.user.isactive = token.isactive;
        session.user.username = token.username;
        session.user.userImage = token.userImage;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
