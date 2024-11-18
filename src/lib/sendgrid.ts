import sgMail from '@sendgrid/mail';

import VerificationEmail from "../../emails/VerificationEmail"
import { ApiResponse } from '@/types/ApiResponse';

export async function mailSender(email:string,
    username: string,
    verifyCode: string,
    
):Promise<ApiResponse> {
    try {
        // Send verification email
        await sgMail.send({
            from: "22bec049@iiitdmj.ac.in",
            to:email,
            subject: " Anormous Message :Verify your email address",
            html:VerificationEmail({username, otp:verifyCode})
            
            
        });
        console.log("verifyCode send by sendmail")

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
