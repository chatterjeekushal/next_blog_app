import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user"; // Your User model for database

export const authOptions: NextAuthOptions = {
  providers: [
    // GitHub provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string, // GitHub OAuth client ID
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, // GitHub OAuth client secret // Scopes to request from GitHub
    }),

    // Credentials provider
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { username: credentials?.username },
              { password: credentials?.password },
            ],
          });

          if (!user) {
            throw new Error("User not found with this username or password");
          }

          if (user.isverified == false) {
            throw new Error("Please verify your email before login");
          }

          const isPasswordMatch = await bcrypt.compare(
            credentials?.password,
            user.password
          );

          if (isPasswordMatch) {
            return user;
          } else {
            throw new Error("Invalid password");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],

  callbacks: {
    // Callback when a user signs in (either GitHub or Credentials provider)
    async signIn({ user, account, profile }) {
      if (account?.provider === "github") {
        await dbConnect();

        console.log("user github", user);

        // Check if the user already exists by GitHub email or username
        const existingUser = await UserModel.findOne({ username: user.name });

        if (!existingUser) {
          // Create a new user if they do not exist
          await UserModel.create({
            username: user.name || "github_", // GitHub username (fallback to email username if missing)
            email: user.email, // GitHub email
            password: "github", // Set password to empty string since GitHub OAuth doesn't use a password
            verified: "12345", // You can set this to true by default since GitHub OAuth user is considered verified
            verifyexpires: Date.now(), // Set verifyexpires to null if not applicable
            isverified: true, // Set isverified to true since the user is authenticated via GitHub OAuth
            isactive: true, // Set isactive to true since the user is authenticated via GitHub
          });
        }
      }
      return true;
    },

    // JWT callback
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isverified = user.isverified;
        token.isactive = user.isactive;
        token.username = user.username;
      }
      return token;
    },

    // Session callback
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isverified = token.isverified;
        session.user.isactive = token.isactive;
        session.user.username = token.username;
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
