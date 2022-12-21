import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FaceBookProvider from "next-auth/providers/facebook";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '333967899513-klkkpbg92983jql0mjubaseeisaa7cle.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
        }),
        FaceBookProvider({
            clientId: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);
