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
                        return user;
                    } else {
                        return { error: 'Wrong password'};
                    }
                } else {
                    return {error: 'User does not exist'};
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials}){
            if(!user.error){
                return true;
            } else {
                throw new Error(user.error);
            }
        } 
    },
    database: process.env.MONGO_URL
})

export {handler as GET, handler as POST}