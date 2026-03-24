import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
});

export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL,  // ← changed from AUTH_SITE_URL
      applicationID: "convex",               // ← changed from AUTH_PASSWORD_ID
    },
  ],
};