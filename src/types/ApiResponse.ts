import { Message } from "@/model/User"

export interface ApiResponse{
    success?: boolean;
    message?: string;
    isAcceptingMessage?: boolean;
    mmessages?:Array<Message>

    
}