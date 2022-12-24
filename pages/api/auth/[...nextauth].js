import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";

const config = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Facebook({
            clientId: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(config);