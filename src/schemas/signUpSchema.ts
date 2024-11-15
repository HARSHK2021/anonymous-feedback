import {z} from "zod"

export const usernameValidation= z.
    string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(/^[a-zA=Z0-9_]+$/, "Username can not have special characters")

    export const signUpSchema= z.object({
        username: usernameValidation,
        email: z.string()
            .email("Invalid email format"),
        password: z.string()
            .min(8, "Password must be at least 8 characters long")
            .max(15, "Password must be at most 15 characters long")
            
    })