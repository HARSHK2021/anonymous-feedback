import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";

const usernameQuerySchema= z.object({
    username :usernameValidation
})


export async function GET (request:Request){ 

    await dbConnect();

    try {
        const{searchParams} = new URL(request.url)
        const queryParam = {
            username : searchParams.get("username")
        }

        ///validate with zod
       const result=  usernameQuerySchema.safeParse(queryParam)
       console.log(" username verification using zod result")
       console.log(result)
        if(!result.success){
           const usernameErrors = result.error.format().username?._errors || []
           return Response.json({
            success: false,
            message: usernameErrors?.length > 0 ? usernameErrors.join(', ')
            : "INVALID query parameters",
           
           },{status:500})
        }
       const {username}= result.data;

       const existingVerifiedUser= await UserModel.findOne({
            username, isVerified:true
          
        })
       
        if(existingVerifiedUser){
            return Response.json({
                success: false,
                message: "Username already exists and is verified",
            },{status:400})
        }

        return Response.json({
            success: true,
            message: "Username is unique",
        })



        
    } catch (error) {
        console.error("error chacking username", error);
        return new Response(JSON.stringify(
            {
                success: false,
                message: "Error checking username",
            }
        ), {status: 500})
        
    }
}