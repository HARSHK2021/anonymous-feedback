import {z} from "zod"

///// check it once (username | identifier)
    export const signInSchema= z.object({
        email: z.string(),
        password: z.string().min(8).max(20),
       
 
    })