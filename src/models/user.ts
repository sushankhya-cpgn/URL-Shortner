import mongoose, { Document, ValidatorProps } from "mongoose";


export interface IUser{
    email:string;
    username: string;
    password: string;
}


export interface IUserDocument extends IUser,Document{}

const userSchema =  new mongoose.Schema<IUserDocument>({
    username:{
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:{
            validator:function(v:string){
                 return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            },
            message: (props:ValidatorProps)=>`${props.value} is not a valid email address`
        }
    },

    password:{
        type:String,
        required:true
    }
})

const user = mongoose.model("User",userSchema)

export default user;