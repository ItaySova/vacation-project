import { NextFunction, Request, Response } from "express";
import striptags from "striptags";

function sanitize(request: Request, response: Response, next: NextFunction) {
    try {
        next();
    }
    catch(err: any) {
        next(err);
    }
}

export default sanitize;