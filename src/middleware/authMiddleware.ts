import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken"
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        const header = req.header("Authorization");
        console.log(header);
        const token = header?.startsWith("Bearer") ? header.split(" ")[1] : header;
        console.log(token);
        if (!token) {
           return res.status(401).json({ message: "No token Sent" });
        }

        const decoded = jsonwebtoken.verify(token as string, process.env.JWT_SECRET as string)

        if (decoded) {
            console.log("valid")
            return next();
        }
        else{
            return res.status(401).json({ message: "Access Denied" });
        } 
    }

    catch (error) {
        res.status(401).json({message:"Invalid Token"});
    }


}