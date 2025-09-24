import { NextFunction, Request, Response } from "express";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken"

interface MyJWTPayload{
    id:string,
    username:string,
    email:string

}

export interface AuthenticatedRequest extends Request{
   user_id?:string
}

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
        const header = req.header("Authorization");
        console.log(header);
        const token = header?.startsWith("Bearer") ? header.split(" ")[1] : header;
        console.log(token);
        if (!token) {
           return res.status(401).json({ message: "No token Sent" });
        }

        const decoded = jsonwebtoken.verify(token as string, process.env.JWT_SECRET as string) as MyJWTPayload;

        if (decoded) {
            console.log('decoded',decoded)
            req.user_id = decoded?.id;
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