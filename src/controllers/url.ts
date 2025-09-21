import { nanoid } from "nanoid";
import UrlObject from "../models/url.js";
import type { Request, Response } from "express";

export async function generateShortID(req:Request,res:Response){
    const originalURL = req?.body?.url;
    const shorturl = nanoid(8);
    try{
      await UrlObject.create({shortID:shorturl,redirectURL:originalURL});
      return res.status(200).json({message:'Short URL CREATED', url: shorturl});
    }

    catch(error){
        return res.status(400).json({message:error});
    }

}

export async function getURL(req:Request,res:Response) {

    try{
        const url_given = req.params.url;
        console.log(url_given);
        const result = await UrlObject.findOneAndUpdate({shortID:url_given},
        {
            $push:{
                visitHistory: {
                    timeStamp:Date.now()
                },
            }

        });
        console.log(result?.redirectURL)
        return res.status(200).redirect(result?.redirectURL||"")
    }
    catch(error){
        return res.status(400).json({message:error});
    }
}

export async function getClicks(req:Request,res:Response) {
    try{
        const result = await UrlObject.findOne({shortID:req.params.url})
        return res.status(200).json({totalClicks:result?.visitHistory.length,anaytics:result?.visitHistory})
    }
    catch(error){
         return res.status(400).json({message:error});
    }
}