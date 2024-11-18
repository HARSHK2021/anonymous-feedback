import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
/// todo

export async function POST(request: Request){
    await dbConnect()
    try {
        const {username , code} = await request.json();
      const decodedUsername=  decodeURIComponent(username)
      const user= await UserModel.findOne({username: decodedUsername})
        if(!user){
          return Response.json({
            success: false,
            message: "User not found",
          },{status:500})
        }

        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date()
        if(isCodeNotExpired && isCodeValid) {
            user.isVerified=true
            await user.save()
            return Response.json({
                success: true,
                message: "User verified successfully",
            },{status: 200})

        }else if (!isCodeNotExpired){
            return Response.json({
                success: false,
                message: "Verification code expired",
            },{status: 400})
        }else{
            return Response.json({
                success: false,
                message: "Invalid Verification code",
            },{status: 400})
        }
   
       
        
    } catch (error) {
        console.log("Failed to sign up user Wrong Verify Code", error)
        return {
            status: 500,
            body: JSON.stringify({
                message: "Failed to sign up user  Wrong Verify Code",
            })
        }

        
    }
}
