import { APIROUTE } from "@/constants/api_routes";
import SITEROUTES from "@/constants/site_routes";
import { pick } from "lodash";
import { AuthOptions, CallbacksOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const callbacks: CallbacksOptions = {
  async session({ session, token, user }) {
    if (token.user) session.user = token.user as User;

    console.info("NEXTAUTH SESSION ===> fetching user data");

    const res = await fetch(APIROUTE("checkAccessToken"), {
      method: "POST",
      body: JSON.stringify({ access_token: session.user.tokens.accessToken }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok)
      throw new Error("Failed to fetch user data" + (await res.text()));

    const userData = await res.json();

    if (userData) session.user = { ...session.user, ...userData } as User;

    return session;
  },
  async signIn({ user, account, profile, email, credentials }) {
    return true;
  },
  async redirect({ url, baseUrl }) {
    return baseUrl;
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    if (user) token.user = user;
    return token;
  },
};

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "otp",
      credentials: {
        identifier: {
          label: "",
          type: "text",
        },
        otp_code: {
          label: "Code",
          type: "text",
        },
      },
      async authorize(credentials) {
        const res = await fetch(APIROUTE("verifyOtp"), {
          method: "POST",
          body: JSON.stringify(pick(credentials, ["identifier", "otp_code"])),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error((await res.json()).error?.message);

        const userTokens = (await res.json()) as User["tokens"];

        if (userTokens) return { tokens: userTokens } as User;

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // one month
    updateAge: 7 * 24 * 60 * 60, // one week
  },
  pages: {
    signIn: SITEROUTES.login,
    signOut: SITEROUTES.login,
    error: SITEROUTES.login, // Error code passed in query string as ?error=
    newUser: SITEROUTES.login,
  },
  callbacks: callbacks,
};
