import mongoose ,{Schema,Document} from "mongoose";


export interface Message extends Document{
    content:string;
    createdAt:Date
}


export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isVerified:boolean;
    isAcceptingMessage:boolean;
    messages:Message[]
}

const MessageSchema:Schema<Message> = new Schema({
    content: {
        type: String,
         required: true
        },
    createdAt: {
        type: Date,
         default: Date.now,
         required: true
        }
    
});



const UserSchema:Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "username is required"],
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
        match:[/.+\@.+\..+/,"please use a valid email address"]
       
    },
    password:{
        type: String,
        required: true
    },
    verifyCode:{
        type: String,
        required:[true, "verifyCode is required"]
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "verifyCodeExpiry is required"]
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAcceptingMessage:{
        type: Boolean,
        default: true
    },
    messages:{
        type: [MessageSchema],
        
    }
})


const UserModel = (mongoose.models.User as mongoose.Model<User>)  || (mongoose.model<User>("User", UserSchema))

export default UserModel;

