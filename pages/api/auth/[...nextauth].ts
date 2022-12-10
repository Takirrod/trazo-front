import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GoogleProvider({
      clientId:
        "164878245401-pa0hd7dban3p92pi5at97o4okrhhjhpl.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  theme: {
    colorScheme: "dark",
  },

  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      token.userRole = "admin";
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
  },

  pages: {
    // signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/user/roles", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);