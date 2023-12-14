import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import bcrypt from 'bcryptjs'
import connect from "@/utils/db";
import User from "@/models/User";

const handler = NextAuth({
    secret: process.env.SECRET,
    providers: [
        Credentials({
            id: 'credentials',
            name: 'Credentials',
            async authorize(credentials) {
                await connect();
                const user = await User.findOne({ email: credentials.email });

                if(user){
                    const passwordIsCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (passwordIsCorrect){
                        return Promise.resolve(user);
                    } else {
                        return Promise.resolve(null);
                    }
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async session(session, user){
            console.log(user)

            return session;
        }
    },
    database: process.env.MONGO_URL
})

export {handler as GET, handler as POST}