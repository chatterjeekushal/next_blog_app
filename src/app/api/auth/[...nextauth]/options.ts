
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

interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  isverified: boolean;
  isactive: boolean;
  userImage?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials | undefined): Promise<UserType | null> {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [{ username: credentials.username }, { email: credentials.username }],
          });

          if (!user) {
            throw new Error("User not found with this username or email");
          }

          if (!user.isverified) {
            throw new Error("Please verify your email before login");
          }

          const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordMatch) {
            throw new Error("Invalid password");
          }

          return {
            _id: user._id.toString(),
            username: user.username,
            email: user.email,
            password: user.password,
            isverified: user.isverified,
            isactive: user.isactive,
            userImage: user.userImage?.toString(),
          };
        } catch (error) {
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
        const userData = user as UserType;
        token._id = userData._id;
        token.isverified = userData.isverified;
        token.isactive = userData.isactive;
        token.username = userData.username;
        token.userImage = userData.userImage;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          _id: token._id,
          isverified: token.isverified,
          isactive: token.isactive,
          username: token.username,
          userImage: token.userImage,
        };
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
