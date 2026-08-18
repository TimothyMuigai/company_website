
export default {
  providers: [
    {
      domain:
        process.env.CONVEX_SITE_URL ||
        process.env.AUTH_PASSWORD_ISSUER ||
        process.env.AUTH_SITE_URL ||
        process.env.AUTH_URL ||
        process.env.NEXT_PUBLIC_CONVEX_URL ||
        "http://localhost:3000",
      applicationID: "convex",
    },
  ],
};