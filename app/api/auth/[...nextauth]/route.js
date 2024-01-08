import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import bcrypt from 'bcryptjs'
import connect from "@/utils/mongo";
import User from "@/models/User";

const handler = NextAuth({
    secret: process.env.JWT_SECRET,
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
        async signIn({ user }){
            if(!user.error){
                console.log(`${user.email} logged in`)
                return true;
            } else {
                throw new Error(user.error);
            }
        },
        async jwt({token, user, trigger, session}){
            if (user) {
                return {
                    ...token,
                    username: user.username,
                    avatar: user.avatarurl,
                    bio: user.bio,
                    id: user._id,
                    friends: user.friends,
                    following: user.following,
                    followers: user.followers
                };
            }
            if(trigger == 'update'){
                return {
                    ...token,
                    username: session.username,
                    bio: session.bio,
                    avatar: session.avatar
                }
            }
            return token;
        },
        async session({session, token}){
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username,
                    avatar: token.avatar,
                    bio: token.bio,
                    id: token.id,
                    friends: token.friends,
                    following: token.following,
                    followers: token.followers
                }
            }
        }
    },
    database: process.env.MONGO_URL
})

export {handler as GET, handler as POST}