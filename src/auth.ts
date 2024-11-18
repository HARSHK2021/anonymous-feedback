import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      id:"credentials",
      name:"credentials",
      credentials: {
        email:{label:"Email",type:"text"},
        password:{label:"Password",type:"password"},
      },
      authorize: async (credentials:any):Promise<any> => {
        await dbConnect();
        try {
            const user=await UserModel.findOne({
                $or:[
                    {email:credentials.email},
                    {username:credentials.username}
 
                ]
            })
            if(!user){
                throw new Error("User not found with this email")
            }
            if(!user.isVerified){
                throw new Error("User is not verified please verify before login")
            }
            const isPasswordCorrect=  await bcrypt.compare(credentials.password,user.password)
            if(isPasswordCorrect){
                return user
            }else{
                throw new Error("Invalid Password")
            }
            
        } catch (error:any) {
            throw new Error("whats happning")
            
        }
 
      },
    }),
  ],
 
  callbacks:{
    async jwt({ token, user}){
        if(user){
            token._id= user._id?.toString()
            token.isVerified=user.isVerified
            token.username=user.username
            token.isAcceptingMessages=user.isAcceptingMessages
        }
        return token
    },
    async session({ session , token}){
        if(token){
            session.user._id= token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessages = token.isAcceptingMessages;
            session.user.username = token.username;
        }
        return session;

   },
  
 
  },
  pages:{
    signIn:"/sign-in"

  },
  session:{
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET
 
})