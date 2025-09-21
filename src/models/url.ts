import mongoose, { Document,Types } from "mongoose";
import user from "./user";

export interface IURL{
    shortID: string,
    redirectURL: string,
    visitHistory: {timeStamp:number}[],
    creator: Types.ObjectId
}

export interface IURLDocument extends IURL,Document{}

const urlSchema = new mongoose.Schema<IURLDocument>({
    shortID:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory: [{timeStamp:{type: Number}}],
    creator:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
},{timestamps:true});

const UrlObject = mongoose.model('URLOBJECT',urlSchema);

export default UrlObject