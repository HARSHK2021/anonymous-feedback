import { resend } from "@/lib/Resend";
import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from "@/types/ApiResponse"

export async function sendVerificationEmail(email:string,
    username: string,
    verifyCode: number,
    
):Promise<ApiResponse> {
    try {
        // Send verification email
        await resend.emails.send({
            from: "onboarding@resend.dev ",
            to:email,
            subject: " Anormous Message :Verify your email address",
            react:VerificationEmail({username, otp:verifyCode})
            
            
        });

        return {
            success: true,
            message: "Verification email sent",
        }
    
        
    } catch (error) {
        console.log("email not send",error)
        console.error("Verification email not send")
        return {
            success: false,
            message: "Failed to send verification email",
        }
        
    }

}

