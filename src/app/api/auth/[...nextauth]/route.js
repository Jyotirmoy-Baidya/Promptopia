import nextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

import User from '@models/user'
import connectToDB from "@utils/database"

// in nextAuth we provide a options object ({}) this is the options object
const handler = nextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {

        async session({ session }) {
            //To know which user is currently using the application
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                //Serverless function
                //Lamda function : opens up only when it is called. Server not need to be run constantly
                await connectToDB();

                // check if the user exist 
                const userExists = await User.findOne({
                    email: profile.email
                });

                //If not then create a user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            } catch (error) { console.log("errror is ", error); }

        }
    }
})

export { handler as GET, handler as POST };