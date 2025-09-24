import jsonwebtoken from "jsonwebtoken"
import bcrypt from "bcrypt"
import user from "../models/user";
import { Request,Response } from "express";

export async function login(req:Request,res:Response){
    try{
    const {username,password} = req.body;
    console.log("Incoming username:", username);
    console.log("Incoming password:", password);
    const user_info = await user.findOne({username});
    console.log(user_info?.password)
    if(!user_info){
        return res.status(401).json({message:"Authentication Failed"});
    }

    if(password){
        const password_match = await bcrypt.compare(password,user_info?.password)
        console.log(password_match);
        if(!password_match){
            return res.status(401).json({message:"Authentication Failed: Invalid Credentials"});
        }

    
    const tokenPayload = {id:user_info._id,username:user_info.username,email:user_info.email}
        
    const jwt = jsonwebtoken.sign(tokenPayload,process.env.JWT_SECRET as string,{
        expiresIn:'1h'
    });
    return res.status(200).json({jwt})
    
    }
    else{
        return res.status(401).json({message:"Authentication Failed"});
    }

    }

    catch(error){
        return res.status(500).json({message:error});
    }
   
}

export async function register(req:Request,res:Response){

    try{
        const{username,password,email} = req.body;
        console.log(username,password,email)
        const hashed_password = await bcrypt.hash(password,10);
        const new_user = new user({username,email,password:hashed_password});
        await new_user.save();
        return res.status(201).json({message:"New User Created Succesfully"});
    }

    catch(error){
        return res.status(500).json({message:"Registration Failed",error:error});
    }

}