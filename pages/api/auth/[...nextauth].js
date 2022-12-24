import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";

const config = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '333967899513-9pl4bi3tb7i8esp1hbaf2l8gklrl351d.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_SECRET || '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',
        }),
        Github({
            clientId: process.env.GITHUB_ID || '3f055dde5b0afbe66c39',
            clientSecret: process.env.GITHUB_SECRET || '5432f95e691224b88d413a2b5332e8947c04342d',
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(config);