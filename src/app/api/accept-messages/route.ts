import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { auth } from "@/auth"
import {User} from "next-auth"
export  async function POST( request: Request){
    await dbConnect()
    const session = await auth()
    console.log("session details",session)
    const user:User = session?.user as User
    console.log("user details",user)
    if(!session || !session.user){
        return Response.json({
            success: false,
            message: "User not logged in",
        },{status: 401,})
    }
    const userId = user._id
    const {acceptMessages} = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {isAcceptingMessages:acceptMessages},{new:true})
        if(!updatedUser){
            return Response.json({
                success: false,
                message: "User not found failed to update accept messages",
            },{status: 404})
        }

        return Response.json({
            success: true,
            message: "User status updated to accept messages",
            updatedUser,
        },{status:200})

        

        
    } catch (error) {
        console.error("Error updating user", error)
        return Response.json( 
            { success: false,
             message: "Error updating user status to accept messages",  
            },{
                status: 500,
            })
        
    }


    
}


export async function GET(request: Request){
    await dbConnect()
    const session = await auth()
    console.log("session details",session)
    const user:User = session?.user as User
    console.log("user details",user)
    if(!session ||!session.user){
        return Response.json({
            success: false,
            message: "User not logged in",
        },{status: 401,})
    }
    const userId = user._id;
    try {
        const founduser= await UserModel.findById(userId)
    if(!founduser){
        return Response.json({
            success: false,
            message: "User not found",
        },{status: 404})
    }
    return Response.json({
        success: true,
        message: "User details fetched",
        isAcceptingMessage: founduser.isAcceptingMessage,
        messages:founduser.messages
    },{status:200})
    } catch (error) {
        console.error("Error fetching user", error)
        return Response.json( 
            { success: false,
             message: "Error fetching user details for accpeting messgaes",  
            },{
                status: 500,
            })
        
    }

    
}


