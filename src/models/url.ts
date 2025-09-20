
import { timeStamp } from "console";
import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory: [{timeStamp:{type: Number,default:Date.now()}}]
},{timestamps:true});

const UrlObject = mongoose.model('URLOBJECT',urlSchema);

export default UrlObject