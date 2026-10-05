import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_MONGO_DB_URL as string);
const db = client.db("bangla-news-24");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
        google: { 
            clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string, 
        }, 
        github: { 
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET as string, 
        },
    },
  database: mongodbAdapter(db, { client }),
});
