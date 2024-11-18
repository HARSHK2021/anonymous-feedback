import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { auth } from "@/auth"
import {User} from "next-auth"
import mongoose from "mongoose";

export async function GET(request: Request){
    dbConnect();
    const session = await auth()
    console.log("session details",session)
    const user:User = session?.user as User
    
    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "User not logged in",
        },{status: 401,})
    }
    const userId = new mongoose.Types.ObjectId(user._id);

   try {
    const user = await UserModel.aggregate([
        {$match:{_id:userId}},
        
        {$unwind: '$messages'},
        {$sort:{"messages.createdAt":-1}},
        {$group:{
            _id: '$_id',
            messages:{$push:"$messages"},
        }},
    ])
    console.log("user afte aggrigatition",user)
    if(!user || user.length === 0){
        return Response.json({
            success: false,
            message: "No user found (message)",
        },{status: 400,})
    }
    console.log("response coming", user[0].messages)
    return Response.json({
        success: true,
        messages:user[0].messages,
       
    },{status: 200,})
    
   } catch (error) {
    console.error("Error fetching messages", error)
    return Response.json({
        success: false,
        message: "Error fetching messages",
    },{status: 500,})

    
    
   }

}