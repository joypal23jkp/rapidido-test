import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import FaceBookProvider from "next-auth/providers/facebook";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FaceBookProvider({
            clientId: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin"
            return token
        },
        async session({ session, token, user }) {
            session.user.username = session.user.name
                .split(" ")
                .join("")
                .toLocaleLowerCase();

            session.user.uid = token.sub;
            return session;
        },
    },
}

export default NextAuth(authOptions);
