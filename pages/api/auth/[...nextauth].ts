import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Okta({
      clientId: process.env.OKTA_CLIENTID,
      clientSecret: process.env.OKTA_CLIENTSECRET,
      domain: process.env.OKTA_DOMAIN,
    }),
    // ...add more providers here
  ],
  database: process.env.DATABASE_URL,
};

export default (req: any, res: any) => NextAuth(req, res, options);
