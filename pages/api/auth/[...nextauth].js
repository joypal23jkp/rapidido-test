import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FaceBookProvider from "next-auth/providers/facebook";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        FaceBookProvider({
            clientId: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);
