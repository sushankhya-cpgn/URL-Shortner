import { nanoid } from "nanoid";
import UrlObject from "../models/url.js";
import type { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";

export async function generateShortID(req: AuthenticatedRequest, res: Response) {
    const originalURL = req?.body?.url;
    const shorturl = nanoid(8);
    // const user_id = 
    try {
        await UrlObject.create({ shortID: shorturl, redirectURL: originalURL, creator: req.user_id });
        return res.status(200).json({ message: 'Short URL CREATED', url: shorturl });
    }

    catch (error) {
        return res.status(400).json({ message: error });
    }

}

export async function getURL(req: Request, res: Response) {

    try {
        const url_given = req.params.url;
        console.log(url_given);
        const result = await UrlObject.findOneAndUpdate({ shortID: url_given },
            {
                $push: {
                    visitHistory: {
                        timeStamp: Date.now()
                    },
                }

            });
        console.log(result?.redirectURL)
        return res.status(200).redirect(result?.redirectURL || "")
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
}

export async function getmyurls(req: AuthenticatedRequest, res: Response) {

    try {
        const id = req.user_id;
        console.log(id);
        const all_urlsById = await UrlObject.find({ creator: id });
        const fields = all_urlsById.map((field) => {
            return {
                shortID: field.shortID,
                redirectURL: field.redirectURL,
                createdAt: field.createdAt,
                updatedAt: field.updatedAt
            }
        })
        console.log("All urls by id", all_urlsById)
        return res.status(200).json({ message: fields })
    }

    catch (error) {
        return res.status(400).json({ message: error })
    }

}

export async function getClicks(req: Request, res: Response) {
    try {
        const result = await UrlObject.findOne({ shortID: req.params.url })
        return res.status(200).json({ totalClicks: result?.visitHistory.length, anaytics: result?.visitHistory })
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
}

export async function deleteShortURL(req: Request, res: Response) {
    try {
        const result = await UrlObject.deleteOne({ shortID: req.params.url });
        return res.status(200).json({message:result});

    }
    catch (error) {
        return res.status(400).json({message:error})
    }
}